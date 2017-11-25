import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import dotenv from 'dotenv';
dotenv.config();

const hash = window.location.hash
.substring(1)
.split('&')
.reduce(function (initial, item) {
  if (item) {
    var parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});
window.location.hash = '';

// Set token
let _token = hash.access_token;

const authEndpoint = 'https://accounts.spotify.com/authorize';
const scopes = ['streaming', 'user-modify-playback-state', 'user-read-birthdate', 'user-read-email', 'user-read-private', 'user-top-read'];
console.log(process.env.REACT_APP_CALLBACK_URL);
console.log(process.env.REACT_APP_CLIENT_ID);
// If there is no token, redirect to Spotify authorization
if (!_token) {
    window.location = `${authEndpoint}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_CALLBACK_URL}&scope=${scopes.join('%20')}&response_type=token`;
}

console.log(_token);

ReactDOM.render(<App token={_token} />, document.getElementById('root'));
registerServiceWorker();
