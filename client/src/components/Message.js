import React from "react";

const Message = ({ message, username }) => {
  //const messageReceived =  message.username !== username

  return (
    <div className={`message-bubble ${username === message.username && "message-bubble-sender"}`}>
      <div className={`chat__name ${username === message.username && "sender"}`}> {message.username}</div>
      <p
        className={`chat__message ${username === message.username && "sender__myself"}`}
      >
        {message.message}
      </p>
    </div>
  );
};

export default Message;
