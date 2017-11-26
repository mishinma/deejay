// server.js
// where your node app starts

// init project
const express = require('express');
const fetch = require("node-fetch");
const db = require('./db');
const cors = require('cors');
const smn = require('./sameness');


var app = express();
app.use(cors());


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function(length) {
  var text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const createRoomShareableUrl = (roomURL) => {
    return `${process.env.NODE_APP_FRONTEND_URL}/?room=${roomURL}`;
};

app.use(express.static(__dirname + '/'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});


// Initialize Spotify API wrapper
var SpotifyWebApi = require('spotify-web-api-node');
spotifyApi = new SpotifyWebApi();


const getTopArtists = (token) => {
  return fetch(`https://api.spotify.com/v1/me/top/artists`, {
    method: 'get',
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(response => {
    return response.json();
  })
};


const getTopTracks = (token) => {
  return fetch(`https://api.spotify.com/v1/me/top/tracks`, {
    method: 'get',
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(response => {
    return response.json();
  })
};


const getRoomAllTopArtists = (roomId) => {
    const selectStm = `SELECT
                asdf
    `

}


//-------------------------------------------------------------//
//------------------------- API CALLS -------------------------//
//-------------------------------------------------------------//




// Get all rooms
app.get("/room", (request, result, next) => {
    db.query('SELECT * FROM rooms', [])
        .then(res => {
            console.log(res);
            result.json(res.rows);
        })
        .catch(e => console.error(e.stack))
});


// Get all users
app.get("/user", (request, result, next) => {
    db.query('SELECT * FROM users', [])
        .then(res => {
            console.log(res);
            result.json(res.rows);
        })
        .catch(e => console.error(e.stack))
});


app.get("/room/:id")
    // generate share link
    // query room seed_genres
    // call to getRecommendations(roomSeedGenres)


app.get("/room/:id/refresh")
    // generate share link
    // query room seed_genres
    // call to getRecommendations(roomSeedGenres)


app.get("/room/join", (request, result, next) => {

    const token = request.query.token;
    const roomUrl = request.query.room;
    // console.log(token);
    // console.log(roomUrl);

    const selectRoomStm = 'SELECT id FROM rooms WHERE url = $1::text'
    const insertUserStm = 'INSERT INTO users (roomid, top_artists, top_tracks) VALUES ($1,  $2::json, $3::json)';

    const roomIdPromise = db.query(selectRoomStm, [roomUrl])
    .then(res => {
        return res.rows[0].id;
    });

    const promises = [
        roomIdPromise,
        getTopArtists(token),
        getTopTracks(token)
    ];

    Promise.all(promises).then(data => {
        const roomId = data[0];
        const topArtists = data[1];
        const topTracks = data[2];
        db.query(insertUserStm, [roomId, topArtists, topTracks])
        .then(res => {
            result.status(200).send()
        });
    });

});


app.get("/room/create", (request, result, next) => {

    const token = request.query.token;

    spotifyApi.setAccessToken(request.query.token);
    // console.log(token);
    const roomUrl = generateRandomString(50);
    const roomShareableUrl = createRoomShareableUrl(roomUrl);
    console.log(roomShareableUrl);

    const insertUserStm = 'INSERT INTO users (roomid, top_artists, top_tracks) VALUES ($1,  $2::json, $3::json)';
    const insertRoomStm = 'INSERT INTO rooms (url) VALUES ($1::text) RETURNING id';


    const roomIdPromise = db.query(insertRoomStm, [roomUrl])
    .then(res => {
            return res.rows[0].id;
    });

    const promises = [
        roomIdPromise,
        getTopArtists(token),
        getTopTracks(token)
    ];

    Promise.all(promises).then(data => {
        const roomId = data[0];
        const topArtists = data[1];
        const topTracks = data[2];
        db.query(insertUserStm, [roomId, topArtists, topTracks])
        .then(res => {
            console.log(res);
            result.json({
                'roomShareableUrl': roomShareableUrl,
                'seedArtists': topArtists
        });
    });
        // result.redirect(`https://f12f4b9a.ngrok.io?token=${token}`)
        // redirect to /room/13asdfas452
    }).catch(err => {
        console.error(err);
    })
});


app.get("{unique_room_url}/join", function (request, response) {
	// join the room

  response.sendFile(__dirname + '/index.html');
});


//------------------------ WEB SERVER -------------------------//

// Listen for requests to our app
// We make these requests from client.js
// process.env.PORT
var listener = app.listen(8000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
