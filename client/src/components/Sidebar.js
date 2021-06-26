import React from 'react'
import '../css/Sidebar.css';
import '../css/SidebarChat.css'
import ConnectedUsers from './ConnectedUsers'

const Sidebar = ({connectedUsers}) => {
    return (
        <div className="sidebar">
             <div className="sidebar__header">
                 Users
             </div>
             <div className="modal__body">
                 <ConnectedUsers connectedUsers={connectedUsers}/>
             </div>
        </div>
    )
}

export default Sidebar
