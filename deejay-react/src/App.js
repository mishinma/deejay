import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Room from './components/Room';
import Home from './components/Home';


class App extends Component {
  
  render() {
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const scopes = ['streaming', 'user-modify-playback-state', 'user-read-birthdate', 'user-read-email', 'user-read-private', 'user-top-read'];
    
    let content;
    
    // If there is no token, redirect to Spotify authorization
    if (this.props.token) {
      content = <Room token={this.props.token} />
    } else {
      content = <Home authEndpoint={authEndpoint} scopes={scopes} />
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to DeeJay</h1>
        </header>
        {content}
      </div>
    );
  }
}

export default App;
