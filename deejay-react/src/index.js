import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './components/Home';
import { createCookie, readCookie, eraseCookie } from './helpers/utils';
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

// To join
let params = (new URL(document.location)).searchParams;
let roomUrl = params.get("room");
let joined = params.get("joined");

const roomUrlCookie = 'roomUrl';

if (roomUrl && !joined) {
    createCookie(roomUrlCookie, roomUrl);
} else if (joined === 'true') {
    roomUrl = readCookie(roomUrlCookie);
    eraseCookie(roomUrlCookie);
}

// console.log(roomUrl);

// Set token
let _token = hash.access_token;


ReactDOM.render(<App token={_token} roomUrl={roomUrl}/>, document.getElementById('root'));

registerServiceWorker();
