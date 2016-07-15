module.exports = function (context, myTimer) {

    console.log = function(message, error){
        if(error){
            context.log(message, error);
        }else{
            context.log(message);
        }            
    };

    var sync = require('../sync.js');
    var SpotifyWebApi = require('spotify-web-api-node');

    var timeStamp = new Date().toISOString();
    
    context.log('Start syncing !', timeStamp);

    var user = 'TODO';

    var spotifyApi = new SpotifyWebApi({
    clientId : 'TODO',
    clientSecret: 'TODO',
    redirectUri : 'http://www.example.com/callback'
    });

    sync.importList(spotifyApi, 'TODO', user, 'De afrekening');

    context.done();
};