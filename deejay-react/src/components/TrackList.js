import React from 'react';
import Track from './Track';
import { ListGroup } from 'react-bootstrap';


const TrackList = (props) => {
    return (
        <ListGroup>
            {props.tracks.map(track => {
                return <Track
                    preview_url={track.preview_url}
                    name={track.name}
                    key={track.id}
                    artists={track.artists} />
            })}
        </ListGroup>
    );
};

export default TrackList;