var sync = require('../sync.js');

module.exports = function (context, myTimer) {
    
    var timeStamp = new Date().toISOString();

    context.log('Start syncing !', timeStamp);

    sync.importList(spotifyApi, 'TODO', user, 'De afrekening');

    context.done();
};