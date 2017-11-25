import 'whatwg-fetch';
import { getQueryString } from './utils';

export const getTopArtists = (token) => {
  return fetch(`https://api.spotify.com/v1/me/top/artists`, {
    method: 'get',
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(response => {
    return response.json();
  })
  .then(json => {
    return json.items 
      ? json.items.map(artist => artist.id).slice(0, 5)
      : []
  })
}

export const getRecommendations = (params = {}, token) => {
  return fetch(`https://api.spotify.com/v1/recommendations?${getQueryString(params)}`, {
      method: 'get',
      headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(res => {
    return res.json();
  })
  .then(json => {
    return json.tracks 
      ? json.tracks
      : []
  })
}

export const getRecommendedTracks = (params = {}, token) => {
  return getTopArtists(token)
  .then(ids => {
    return  {
      seed_artists: ids.join()
    };
  })
  .then(seeds => {
    const seeded_params = {
      ...params,
      ...seeds
    };
    return getRecommendations(seeded_params, token);
  });
}

export const getCurrentUserProfile = (token) => {
  return fetch(`https://api.spotify.com/v1/me`, {
    method: 'get',
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(res => {
    return res.json();
  })
  .then(json => {
    return json;
  })
};

export const playSongs = (token, options = {}) => {
  return fetch(`https://api.spotify.com/v1/me/player/play`, {
    method: 'put',
    headers: { 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({
      ...options
    })
  }).then(res => {
    console.log('play', res);
    return res.text();
  })
}

export const transferPlayback = (token, options={}) => {
  return fetch(`https://api.spotify.com/v1/me/player`, {
    method: 'put',
    headers: { 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({
      ...options
    })
  }).then(res => {
    console.log('transfer', res);
    return res.text();
  })
}