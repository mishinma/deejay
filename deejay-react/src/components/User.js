import React from 'react';
import { Image } from 'react-bootstrap';
import default_image from '../Spotify_Icon_RGB_Green.png';

const User = (props) => {
    const src = props.user.images.length > 0
        ? props.user.images[0].url
        : default_image;
    const name = props.user.display_name
        ? props.user.display_name
        : props.user.id;
    console.log(props.user);
    return (
        <div>
            <Image src={src} style={{ width: '75px' }} responsive circle />
            <h4>{name}</h4>
        </div>
    );
}

export default User;