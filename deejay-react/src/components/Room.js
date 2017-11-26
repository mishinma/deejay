import React, { Component } from 'react';
import { getRecommendations, getCurrentUserProfile } from '../helpers/spotify';
import { registerPlayer, createRoom, getAllRoomUsers } from '../helpers/utils'
import TrackList from './TrackList';
import UserList from './UserList';
import './Home.css';

// const SpotifyWebApi = require('spotify-web-api-node');

class Room extends Component {

  constructor(props) {
    super(props);

    let player;

    this.state = {
      artists_seed: [],
      genres_seed: [],
      recommendations: [],
      users: [],
      id: null,
      link: '',
      player,
    }
  }

  refreshUsers = () => {

      const stateUsers = this.state.users;
      const stateUsersNames = stateUsers.map(x => x.display_name);

      getAllRoomUsers(this.state.id)
      .then( allUsers => {

          const allUsersNames = allUsers.map(x => x.display_name);
          const newUsersNames = allUsersNames.filter(x => stateUsersNames.indexOf(x) < 0);
          const newUsers = allUsers.filter(x => newUsersNames.includes(x.display_name));

          this.setState((prevState) => ({
        	users: [...prevState.users, ...newUsers]
          }));
      });
  };


  refreshSeeds = () => {
      this.setState({
          artists_seed: ['1YZEoYFXx4AxVv13OiOPvZ','6olE6TJLqED3rqDCT0FyPh','0L8ExT028jH3ddEcZwqJJ5','6FXMGgJwohJLUSr5nVlf9X','165ZgPlLkK7bf5bDoFc6Sb'],
          genres_seed: ['rock','alternative rock','modern rock','indie pop','permanent wave']
      });
  }

  refreshEverything = () => {
      this.refreshUsers();
      this.refreshSeeds();
      getRecommendations({
          seed_artists: this.state.artists_seed
      }, this.props.token)
      .then(tracks => {
        this.setState({
            ...this.state,
            recommendations: tracks,
        })});
    }

  // All { seed_artists: ‘1YZEoYFXx4AxVv13OiOPvZ,6olE6TJLqED3rqDCT0FyPh,0L8ExT028jH3ddEcZwqJJ5,6FXMGgJwohJLUSr5nVlf9X,165ZgPlLkK7bf5bDoFc6Sb’,
  //  seed_genres: ‘rock,alternative rock,modern rock,indie pop,permanent wave’ }
  //
  // Dicle { seed_artists: ‘1sSUBGud3QgpkiaQ27XDIm,2Gt8bzahH9RSMrH6heY2vF,3WTWOrIS77vY3hkCFqTyIw,1kS52jCnMYq4n46ZX9zqw7,4UXJsSlnKd7ltsrHebV79Q’,
  //  seed_genres: ‘deep indie r&b,indie r&b,escape room,tropical house,nu jazz’ }

  componentDidMount() {
    createRoom(this.props.token)
      .then(json => {
          console.log(json);
          getRecommendations({
              seed_artists: json.seedArtists
          }, this.props.token)
          .then(tracks => {
            this.setState({
                ...this.state,
                recommendations: tracks,
                artists_seed: json.seedArtists,
                genres_seed:  ['deep indie r&b','indie r&b','escape room','tropical house','nu jazz'],
                link: json.roomShareableUrl,
                id: json.roomId
            });
        })
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

    registerPlayer(this.props.token, this.state.spotifyApi, this.state.player);
  }

  render() {
    return (
        <div>
            <p id="empty"></p>
            <p id="empty"></p>
            <UserList users={this.state.users} refreshUsers={this.refreshEverything} />
            <p id="empty"></p>
            <p id="empty"></p>
            <TrackList tracks={this.state.recommendations} token={this.props.token} />

        </div>
    );
  }
}

export default Room;
