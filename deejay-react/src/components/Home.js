import React from 'react';
import { Button } from 'react-bootstrap';
import './Home.css';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';


bootstrapUtils.addStyle(Button, 'custom');


const Home = (props) => {
    return (
        <div style={{paddingTop: '30px'}}>

            
            <p id="empty"></p>
            <h1 id="title">Welcome to DeeJay!</h1>
            <p id="empty"></p>
        
            <h3>Create a room for you and your friends.</h3>
            <p id="empty"></p>
            <p id="empty"></p>

            <style type="text/css">{`
            .btn-custom {
                color: white;
                background-color: #c2154c ;
                width: 449px;
                height: 86px;
                font-family: HelveticaNeue;
                font-size: 37px;
                font-weight: 100;
                letter-spacing: 2.9px;
                text-align: center;            
            }
            `}</style>
            <Button
                bsSize="large"
                bsStyle="custom"
                onClick={() => {
                    window.location = `${props.authEndpoint}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${props.callback}&scope=${props.scopes.join('%20')}&response_type=token`;
                }}>
                CREATE A ROOM
            </Button>
        </div>
    )
}

export default Home;