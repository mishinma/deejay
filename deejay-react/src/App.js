import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Room from './components/Room';
import Home from './components/Home';
import Join from './components/Join';


class App extends Component {

  render() {

    let content;
    const authEndpoint = 'https://accounts.spotify.com/authorize';


    // If there is no token, redirect to Spotify authorization
    if (this.props.roomUrl) {
        const scopes = ['user-top-read'];
        console.log(this.props.roomUrl);
        content = <Join  authEndpoint={authEndpoint} token={this.props.token}
        roomUrl={this.props.roomUrl} scopes={scopes} callback={process.env.REACT_APP_CALLBACK_URL} />
    } else if (this.props.token) {
      content = <Room token={this.props.token} />
    } else {
      const scopes = ['streaming', 'user-modify-playback-state', 'user-read-birthdate', 'user-read-email', 'user-read-private', 'user-top-read'];
      content = <Home authEndpoint={authEndpoint} scopes={scopes} callback={process.env.REACT_APP_CALLBACK_URL} />
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
