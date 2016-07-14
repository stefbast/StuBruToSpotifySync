var sync = require('../sync.js');
var SpotifyWebApi = require('spotify-web-api-node');

module.exports = function (context, myTimer) {
    
    var timeStamp = new Date().toISOString();

    context.log('Start syncing !', timeStamp);

    var user = 'TODO'

    var spotifyApi = new SpotifyWebApi({
    clientId : 'TODO',
    clientSecret: 'TODO',
    redirectUri : 'http://www.example.com/callback'
    });

    sync.importList(spotifyApi, 'TODO', user, 'De afrekening');

    context.done();
};