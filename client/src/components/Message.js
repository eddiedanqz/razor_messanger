import React from 'react'

const Message = ({message,username}) => {
    //const messageReceived =  message.username !== username

    return (
                <div >
                   <p className={`chat__message ${username === message.username && 'sender__myself'}`}>{message.message}</p>
                   <span className="chat__name"> {message.username} </span>
                 </div>
       
    )
}

export default Message
