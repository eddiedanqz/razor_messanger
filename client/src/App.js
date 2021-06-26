import React, {useEffect,useRef ,useState } from "react";
import './App.css';
import io from 'socket.io-client'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'


function App() {
  const [connected, setConnected] = useState(false)
  const [username, setUsername] = useState('')
  const [connectedUsers, setConnectedUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  
  // Creating a ref object using useRef hook
  const socketClient = useRef()

 //
  useEffect(() => {
  socketClient.current = io.connect("http://localhost:5000")

  if(socketClient.current){
    socketClient.current.on("username-taken", () =>{
      console.log("Username Taken")
    })
  }

  socketClient.current.on("username-submitted", () =>{
    setConnected(true)
  })

  //
  socketClient.current.on("get-connected-users", (users) => {
     setConnectedUsers(users.filter(user => user.username !== username))
  })

  // 
  socketClient.current.on("recieve-message", (message) => {
    setMessages(prev => [...prev,message])
  })

  return () => {
    if(socketClient.current){
      socketClient.current.disconnect()
      socketClient.current = undefined
   }
  }

  },[username])
 
  //
  const handleConnection = () => {
    if(socketClient.current){
       socketClient.current.emit("handle-connection",username)
    }
  }

  //
const handleSendMessage = () =>{
  if(socketClient.current){
    setMessages(prev => [...prev, {message, username}])
    socketClient.current.emit("message",{message,username})
    setMessage("")
 }
}

  return (
    <div className="App">
     {
       !connected && 
       <form className="" onSubmit={e => {
         e.preventDefault()
         handleConnection()
       }}>
         <input value={username} type="text" onChange={e => setUsername(e.target.value)} 
         required={true} />
         <button type="submit">Submit</button>
       </form>
     }
     {
       connected  && 
      <div className="app">
         <div className="app-body">
          <Sidebar connectedUsers= {connectedUsers}/>
          <Chat message={message} setMessage={setMessage} messages={messages} username={username}
           handleSendMessage={handleSendMessage}/>
         </div>
      </div>
     }
    </div>
  );
}

export default App;
