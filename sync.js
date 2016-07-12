var rest = require('./rest.js')

var options = {
    host: 'hitlijst.stubru.be',
    port: 443,
    path: '/api.php?func=hitlist_countdown&instance_id=15',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

 rest.getJSON(options,
        function(statusCode, result)
        {
            console.log('check');
            console.log(statusCode);
            console.log(result);            
        });