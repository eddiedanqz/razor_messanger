import React from 'react'
import User from './User'
import '../css/StartChatModal.css';

const connectedUsers = ({connectedUsers}) => {
    console.log(connectedUsers)
    return (
        <div className="user__select">
               { connectedUsers.map((user) => 
                  <User key= {user.id} user={user} /> 
               ) 
             
                 }
        </div>
    )
}

export default connectedUsers
