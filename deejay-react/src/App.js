import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Room from './components/Room';
import Home from './components/Home';
import background from './background.png'
import spo from './Spotify_Icon_RGB_Green.png'



class App extends Component {
  
  render() {
    
    let content;
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const scopes = ['streaming', 'user-modify-playback-state', 'user-read-birthdate', 'user-read-email', 'user-read-private', 'user-top-read'];

    // If there is no token, redirect to Spotify authorization
    if (this.props.token) {
      content = <Room token={this.props.token} />
    } else {
      content = <Home authEndpoint={authEndpoint} scopes={scopes} callback={process.env.REACT_APP_CALLBACK_URL} />
    }

    return (
  
      <div className="App" style={{backgroundImage: `url(${background})`}}>

        {content}
      </div>
    );
  }
}

export default App;
