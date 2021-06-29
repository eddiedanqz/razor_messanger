import React from "react";
import Message from "./Message";
import "../css/Chat.css";
import "../css/Sidebar.css";

import AuthNav from "./AuthNav";

const Chat = ({
  messages,
  username,
  handleSendMessage,
  setMessage,
  message,
}) => {
  return (
    <div className="chat">
      <div className="chat__header">
        <div className="headerRight">
          <AuthNav />
        </div>
      </div>
      <div className="chat__body">
        <div className="message__container">
          {messages.map((message, i) => (
            <Message key={i} message={message} username={username} />
          ))}
        </div>
      </div>
      <div className="chat__footer">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            value={message}
            type="text"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="btn-default">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
