import React from 'react';
import { Image } from 'react-bootstrap';
import refresh_image from '../refresh.png';

const Refresh = (props) => {

    return (
        <div  style={{display: 'inline-block'}}>
            <Image src={refresh_image}
			style={{ width: '75px' }} responsive circle
			onClick={ props.refreshUsers }/>
            <h4>Refresh</h4>
        </div>
    );
}

export default Refresh;
