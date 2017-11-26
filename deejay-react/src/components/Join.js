import React from 'react';
import { joinRoom } from '../helpers/utils'

const Join = (props) => {

	if (!props.token) {
		const redirectUri = `${props.callback}/?joined=true`;
		// console.log(redirectUri);
  		window.location = `${props.authEndpoint}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${props.scopes.join('%20')}&response_type=token`;
	}
	else {
		// console.log(`joining room ${props.token} ${props.roomUrl}`)
		joinRoom(props.token, props.roomUrl);
		return (
	        <div style={{paddingTop: '30px'}}>
	            Great, you have joined!
	        </div>
	    );
	}

}

export default Join;
