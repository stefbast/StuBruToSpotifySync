module.exports = function (context, myTimer) {

    var logfile = "D:/home/site/wwwroot/log.txt";
    var newLine = "\r\n"    
    var fs = require('fs');
    fs.writeFileSync(logfile, "Sync from:" + new Date().toISOString() + newLine);

    console.log = function(message, error){
        if(error){
            context.log(message, error);
            fs.appendFileSync(logfile, message + error + newLine)
        }else{
            context.log(message);
            fs.appendFileSync(logfile, message + newLine)
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
