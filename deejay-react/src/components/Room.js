import React, { Component } from 'react';
import { getRecommendations, getCurrentUserProfile } from '../helpers/spotify';
import { registerPlayer, createRoom, getAllRoomUsers } from '../helpers/utils'
import TrackList from './TrackList';
import UserList from './UserList';
// const SpotifyWebApi = require('spotify-web-api-node');

class Room extends Component {

  constructor(props) {
    super(props);

    let player;

    this.state = {
      artists_seed: [],
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

  componentDidMount() {
    createRoom(this.props.token)
      .then(json => {
        //   console.log(json);
          getRecommendations({
              seed_artists: json.seedArtists.items.map(artist => artist.id).slice(0,5)
          }, this.props.token)
          .then(tracks => {
            this.setState({
                ...this.state,
                recommendations: tracks,
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
            <UserList users={this.state.users} refreshUsers={this.refreshUsers} />
            <TrackList tracks={this.state.recommendations} token={this.props.token} />
        </div>
    );
  }
}

export default Room;
