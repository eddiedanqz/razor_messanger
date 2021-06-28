import React from 'react'
import User from './User'
import '../css/StartChatModal.css';

const connectedUsers = ({connectedUsers,joinChat,blockUser}) => {
    //console.log(connectedUsers)
    return (
        <div className="user__select">
               { connectedUsers.map((user) => 
                  <User key= {user.id} user={user} joinChat={joinChat}blockUser={blockUser} /> 
               ) 
             
                 }
        </div>
    )
}

export default connectedUsers
