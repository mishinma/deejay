import { transferPlayback } from './spotify';

export const getQueryString = (params = {}) => {
    const esc = encodeURIComponent;
    return Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
}

export const registerPlayer = (token, spotifyApi, player) => {
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