'use strict';

var rest = require('./rest.js')
var SpotifyWebApi = require('spotify-web-api-node');

exports.getAuthorizeURL = function(spotifyApi)
{
    var scopes = ['playlist-modify-public'];
    var state = 'some-state-of-my-choice';

    return spotifyApi.createAuthorizeURL(scopes, state);
}

exports.getRefreshToken = function(spotifyApi, code){    
    return spotifyApi.authorizationCodeGrant(code)
    .then(function(data) {    
        return data.body['refresh_token'];
    }, function(err) {
        console.log('Something went wrong!', err);
    });
}

exports.importList = function(spotifyApi, refreshToken, user, listName){
    spotifyApi.setRefreshToken(refreshToken);

    Promise.all([getPlaylist(spotifyApi, user, listName), getSongs(spotifyApi)])
    .then(function(result) {
        var playlistId = result[0];
        var songIds = result[1].map(function(songId){
            return 'spotify:track:' + songId;
        })
        return spotifyApi.replaceTracksInPlaylist(user, playlistId, songIds);    
    })
    .then(function(result){
        console.log("Sync succeeded");
    })    
    .catch( function(err) {
        console.log('An error occured', err);
    });
}



function getPlaylist(spotifyApi, user, listName){
    return spotifyApi.refreshAccessToken()
        .then(function(data) {
            console.log('The access token has been refreshed!');    
            spotifyApi.setAccessToken(data.body['access_token']);
            return spotifyApi.getUserPlaylists(user);    

        })
        .then(function(playlists){
            var afrekeningPlaylists = playlists.body.items.filter(item => item.name == listName);
            if(afrekeningPlaylists.length === 0){
                return spotifyApi.createPlaylist(user, listName, { 'public' : true })          
            } else {        
                return {body: { id: afrekeningPlaylists[0].id}}; 
            }    
        })
        .then(function(playlistId){
            return playlistId.body.id;
        })
        .catch(function(error){
            console.log("Could not get playlist", error);
            throw error;
        });
} 

function getSongs(spotifyApi){
    var options = {
        host: 'hitlijst.stubru.be',
        port: 443,
        path: '/api.php?func=hitlist_countdown&instance_id=15',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    return rest.getJSON(options)
    .then(function(data){
        var sequence = Promise.resolve();
        var songIds = [];
        data.songs.forEach(function(song) {
            var sanitizedSongTitle = sanitizeSongTitle(song.title);
            var sanitizedArtistName = sanitizeArtistName(song.artist);

                 sequence = sequence.then(function(){
                     return spotifyApi.searchTracks('track:' +  sanitizedSongTitle + ' artist:'+ sanitizedArtistName);
                 }).then(function(data){
                     if(data.body.tracks.items.length === 0){                                                  
                         console.log("Could not find track: " + sanitizedSongTitle + " artists: "+ sanitizedArtistName)
                     } else {
                        songIds.push(data.body.tracks.items[0].id);
                        return songIds;
                     }
                 })
        });
        return sequence;
    })
    .catch(function(error){
        console.log("Could not get playlist", error);
        throw error;
    });    
}

function sanitizeArtistName(artistName){
    artistName = trim(artistName, "feat");
    artistName = trim(artistName, "ft.");

    return artistName;
}

function trim(text, tailMarker){
    if(text.indexOf(tailMarker) !== -1){
        var sanitizedText = text.split(tailMarker)[0]
        console.log("Changed from: " + text + " to: " + sanitizedText)
        return sanitizedText;
    }

    return text;
}

function sanitizeSongTitle(songTitle){
    var hasParenthessesRegex = / *\([^)]*\) */g;
    if(hasParenthessesRegex.test(songTitle)){
        var sanitizedTitle = songTitle.replace(/ *\([^)]*\) */g, "");
        console.log("Changed song title from: " + songTitle + " to: " + sanitizedTitle)
        return sanitizedTitle;
    }

    return songTitle;
}
