import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Room from './components/Room';
import Home from './components/Home';
<<<<<<< 5290746130d760b83d8aaa99bc2a7f9dccd96e8a
import background from './background.png'
import spo from './Spotify_Icon_RGB_Green.png'

=======
import Join from './components/Join';
>>>>>>> can join


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

        {content}
      </div>
    );
  }
}

export default App;
