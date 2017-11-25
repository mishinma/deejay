import React from 'react';
import User from './User';

const UserList = (props) => {
    return (
        <div style={{display: 'inline-block', paddingTop: '10px'}}>
            {props.users.map(user => {
                return <User user={user} />
            })}
        </div>
    );
}

export default UserList;