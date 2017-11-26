import React, { Component } from 'react';
import {Button} from 'react-bootstrap'

class CreateRoom extends Component {

  

  render() {
    return (
      <div className="CreateRoom">
        
        <Button bsStyle="primary" bsSize="large" onClick={alert("hi!")}>Create A Room</Button>
        

      </div>
    );
  }
}



export default CreateRoom;
