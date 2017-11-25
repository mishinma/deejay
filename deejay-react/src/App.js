import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import dotenv from 'dotenv';
import 'whatwg-fetch';
dotenv.config();

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artists: []
    }
  }

  getTopArtists() {
    return fetch(`https://api.spotify.com/v1/me/top/artists`, {
      method: 'get',
      headers: { 'Authorization': `Bearer ${process.env.REACT_APP_MY_TOKEN}` }
    })
    .then(response => {
      return response.json();
    })
    .then(json => {

      return json.items 
        ? json.items.map(artist => {
        return <li key={ artist.uri }><a href={ artist.uri }>{ artist.name }</a></li>;
        })
        : []
    })
    .catch(err => {
      console.error(err);
    });
  }

  componentDidMount() {
    this.getTopArtists()
      .then(res => {
        this.setState({
          ...this.state,
          artists: res
        });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          My favourite artists are:
        </p>
        <ul>{ this.state.artists }</ul>
      </div>
    );
  }
}

export default App;
