import React from "react";
import "../css/Sidebar.css";
import "../css/OnlineUsers.css";
import ConnectedUsers from "./ConnectedUsers";

const Sidebar = ({ connectedUsers, joinChat, email, blockUser }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">{email}</div>
      <div className="side-body">
        <h3 className="empty-message"> Online {connectedUsers.length}</h3>
        <hr />
        <ConnectedUsers
          connectedUsers={connectedUsers}
          joinChat={joinChat}
          blockUser={blockUser}
        />
      </div>
    </div>
  );
};

export default Sidebar;
