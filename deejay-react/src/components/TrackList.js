import React from 'react';
import Track from './Track';
import { ListGroup } from 'react-bootstrap';
import { playSongs } from '../helpers/spotify';


const TrackList = (props) => {
    return (
        <ListGroup>
            {props.tracks.map(track => {
                return <Track
                    preview_url={track.preview_url}
                    name={track.name}
                    key={track.id}
                    artists={track.artists}
                    onClick={() => {
                        console.log(track.uri);
                        playSongs(props.token, {
                            uris: [track.uri]
                        });
                    }} />
            })}
        </ListGroup>
    );
};

export default TrackList;