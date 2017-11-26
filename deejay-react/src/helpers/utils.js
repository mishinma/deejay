import { transferPlayback } from './spotify';
import 'whatwg-fetch';

export const getQueryString = (params = {}) => {
    const esc = encodeURIComponent;
    return Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
}

export const createRoom = (token) => {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/room/create?token=${token}`)
    .then(res => {
      return res.json();
    });
}

export const joinRoom = (token, roomUrl) => {

  return fetch(`${process.env.REACT_APP_BACKEND_URL}/room/join?token=${token}&room=${roomUrl}`)
    .then(res => {
      return res;
    });
}

export const registerPlayer = (token, spotifyApi, player) => {
  // eslint-disable-next-line
  window.onSpotifyPlayerAPIReady = () => {
    // eslint-disable-next-line
    player = new Spotify.Player({
      name: 'DeeJay',
      getOAuthToken: function (callback) { callback(token); }
    });

    // Error handling
    player.on('initialization_error', e => console.error(e));
    player.on('authentication_error', e => console.error(e));
    player.on('account_error', e => console.error(e));
    player.on('playback_error', e => console.error(e));

    // Playback status updates
    player.on('player_state_changed', state => {
      console.log(state);
    });

    // Ready
    player.on('ready', data => {
      transferPlayback(token, { device_ids: [data.device_id] })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.error(err);
      })
    });

    // Connect to the player!
    player.connect();
  }
}


export const createCookie = (name,value) => {
    var expires = "";
    var date = new Date();
    date.setTime(date.getTime() + 60*1000);
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
}

export const readCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

export const eraseCookie = (name) => {
    createCookie(name,"",-1);
}
