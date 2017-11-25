import React from 'react';
import { Button } from 'react-bootstrap';

const Home = (props) => {
    return (
        <div style={{paddingTop: '30px'}}>
            <Button
                bsSize="large"
                bsStyle="success"
                onClick={() => {
                    window.location = `${props.authEndpoint}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${props.callback}&scope=${props.scopes.join('%20')}&response_type=token`;
                }}>
                Create Room
            </Button>
        </div>
    )
}

export default Home;