# StuBruToSpotifySync
Fetch "De Afrekening" list from stubru and create playlist in spotify.

How to use
----------
1. Fill out 'TODO' strings in app.js and run to get authorization url.
Browse to this url and authenticate if needed. 

2. Copy the code query argument from the url you are redirected to once authenticated and paste it as argument (instead of 'TODO') for the getRefreshToken function.
Run this method to get the refresh token.

3. Copy the refresh token and past it as argument for the importList function (instead of 'TODO'). Run this method to import.
