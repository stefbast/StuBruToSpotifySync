'use strict';

var SpotifyWebApi = require('spotify-web-api-node');
var sync = require('./sync.js');


var user = 'TODO'

var spotifyApi = new SpotifyWebApi({
  clientId : 'TODO',
  clientSecret: 'TODO',
  redirectUri : 'http://www.example.com/callback'
});

console.log(sync.getAuthorizeURL(spotifyApi));

sync.getRefreshToken(spotifyApi, 'TODO');

sync.importList(spotifyApi, 'TODO', user, 'De afrekening');