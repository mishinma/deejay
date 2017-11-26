import React from 'react';
import User from './User';
import Refresh from './Refresh';

const UserList = (props) => {
    return (
        <div style={{ paddingTop: '10px' }}>
            {props.users.map(user => {
                return <User key={user.id} user={user} />
            })}
            <Refresh refreshUsers={props.refreshUsers} />
        </div>
    );
}

export default UserList;
