import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getRecommendedTracks, getCurrentUserProfile } from './helpers/spotify';
import TrackList from './components/TrackList';
import UserList from './components/UserList';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artists_seed: [],
      recommendations: [],
      users: []
    }
  }

  componentDidMount() {
    getRecommendedTracks({}, this.props.token)
      .then(tracks => {
        this.setState({
          ...this.state,
          recommendations: tracks
        });
      })
      .catch(err => {
        console.error(err);
      });
    
    getCurrentUserProfile(this.props.token)
      .then(user => {
        this.setState({
          ...this.state,
          users: [...this.state.users, user]
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <UserList users={this.state.users} />
        <TrackList tracks={this.state.recommendations} />
      </div>
    );
  }
}

export default App;
