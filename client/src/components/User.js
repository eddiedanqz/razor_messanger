import React from 'react'
import BlockIcon from '@material-ui/icons/Block';

const User = ({user,joinChat,blockUser}) => {
    return (
      <div className="sidebarChat">
        <div className="sidebarChat__info" onClick = { () => joinChat(user.id)}>
          {user.username}
            </div>
          <div className="sidebarChat__right">
             <span className="chat__block"> <BlockIcon onClick={() => blockUser(user)} /> </span>
            </div> 
       </div>
    )
}

export default User
