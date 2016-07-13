'use strict';

//http://stackoverflow.com/questions/9577611/http-get-request-in-node-js-express

var http = require("http");
var https = require("https");

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
exports.getJSON = function(options)
{
    return new Promise(function (fulfill, reject){

        console.log("rest::getJSON");

        var protocol = options.port == 443 ? https : http;
        var req = protocol.request(options, function(res)
        {
            var output = '';
            console.log(options.host + ':' + res.statusCode);
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                output += chunk;
            });

            res.on('end', function() {
                var obj = JSON.parse(output);
                fulfill(obj);
            });
        });

        req.on('error', function(err) {
            reject(Error(err));
        });

        req.end();

    });  
};