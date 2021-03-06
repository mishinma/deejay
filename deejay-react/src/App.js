import React, { Component } from 'react';
import './App.css';
import Room from './components/Room';
import Home from './components/Home';

import Join from './components/Join';
import background from './background.png'
import spo from './Spotify_Icon_RGB_Green.png'

import { Image } from 'react-bootstrap';
import logo from './junction_spotify_logo.png';


class App extends Component {

  render() {

    let content;
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const guestScopes = ['user-read-private', 'user-read-email', 'user-read-birthdate', 'user-top-read'];


    // If there is no token, redirect to Spotify authorization
    if (this.props.roomUrl) {
        const scopes = guestScopes;
        console.log(this.props.roomUrl);
        content = <Join  authEndpoint={authEndpoint} token={this.props.token}
        roomUrl={this.props.roomUrl} scopes={scopes} callback={process.env.REACT_APP_CALLBACK_URL} />
    } else if (this.props.token) {
      content = <Room token={this.props.token} />
    } else {
      const scopes = guestScopes.concat(['streaming', 'user-modify-playback-state']);
      content = <Home authEndpoint={authEndpoint} scopes={scopes} callback={process.env.REACT_APP_CALLBACK_URL} />
    }

    return (
  
      <div className="App" style={{backgroundImage: `url(${background})`}}>
        <header>
          <p id="empty"></p>
          <span><Image src={logo} style={{ width: '240px', height: '240px'}}/></span>
        </header>
        {content}
      </div>
    );
  }
}

export default App;
