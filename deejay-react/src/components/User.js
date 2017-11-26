import React from 'react';
import { Image } from 'react-bootstrap';
import default_image from '../Spotify_Icon_RGB_Green.png';

const User = (props) => {
    const user = props.user;
    const src = user.images && user.images.length > 0
        ? user.images[0].url
        : default_image
    const name = user.display_name
        ? user.display_name
        : user.id;
    return (
        <div  style={{display: 'inline-block'}}>
            <Image src={src} style={{ width: '75px' }} responsive circle />
            <h4>{name}</h4>
        </div>
    );
}

export default User;
