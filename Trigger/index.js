module.exports = function (context, myTimer) {

    //redirect console.log to context.log
    console.log = function(message){
            context.log(message)
        };

    var sync = require('../sync.js');
    var SpotifyWebApi = require('spotify-web-api-node');

    var timeStamp = new Date().toISOString();
    
    context.log('Start syncing !', timeStamp);

    var user = 'TODO'

    var spotifyApi = new SpotifyWebApi({
    clientId : 'TODO',
    clientSecret: 'TODO',
    redirectUri : 'http://www.example.com/callback'
    });
    console.log('test');
    sync.importList(spotifyApi, 'TODO', user, 'De afrekening');

    context.done();
};