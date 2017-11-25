import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const playSound = (url) => {
    const a = new Audio(url);
    a.play();
}

const Track = (props) => {
    const artist_name = props.artists.length > 0 
        ? props.artists[0].name
        : "Unkown artist"
    return (
        <ListGroupItem
            href="#"
            header={props.name}
            onClick={() => playSound(props.preview_url)}
        >
            {artist_name}
        </ListGroupItem>
    );
}

export default Track;