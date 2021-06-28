import React, {useEffect,useRef ,useState } from "react";
import './App.css';
import io from 'socket.io-client'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import axios from  'axios'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from './components/Loading';

function App() {
  //const [connected, setConnected] = useState(false)
  const [username, setUsername] = useState('')
  const [connectedUsers, setConnectedUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [chatId, setId] = useState('')

  //
  const { user } = useAuth0();
  const { name, email,sub } = user;
 const userId = sub.split('|')[1];
  
  // Creating a ref object using useRef hook
  const socketClient = useRef()

 //
  useEffect(() => {
  socketClient.current = io.connect("http://localhost:5000")

  if(user){
    //setConnected()
    setUsername(name)
  }

  // Display online users
  socketClient.current.on("get-connected-users", (users) => {
    
     let onlineUsers = users.filter(user => user.username !== username)
     // Check blocked user
      axios.get(`api/user/block/${userId}`).then((res) => {
        (res.data.data.length > 0) ?
          // Remove blocker from list
             setConnectedUsers(onlineUsers.filter((user,i) => user.username !== res.data.data[i].blocker_name))
        :  
             setConnectedUsers(onlineUsers)

     })
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

  },[username,user])
 
  // Get all users
  const handleConnection = () => {
    const id = userId
    let data = {username,email,id}
    if(socketClient.current){
       socketClient.current.emit("handle-connection",data)
     
    }
  }

if(socketClient.current){
  handleConnection()
}

  //
const handleSendMessage = () =>{
    let data = {chatId,message,senderid:userId,username}
    //
    axios.post('/api/message/send',data).then((res) =>{
     setMessages(prev => [...prev, {message, username,chatId}])
      socketClient.current.emit("message",{message,username,chatId})
      console.log(res)
    })
    setMessage("")
}

// 
const joinChat = (id) => {
    // Set messages to null
    setMessages([])
 // handleConnection()

   const reciver_id = id
   const  sender_id = userId
   const chatid = parseInt(reciver_id) + parseInt(sender_id)
   let data = {chatid,reciver_id,sender_id}
     // Set chat id 
     setId(chatid)

    // Create chat
    axios.post('/api/chat/',data).then(() =>{
      socketClient.current.emit("joinChat",chatid)
      unlockMessages(chatid)
    })
    console.log(chatid)

}

//
const unlockMessages = (id) => {
  axios.get(`/api/message/chat/${id}`).then((res) =>{
    // eslint-disable-next-line
     res.data.data.map((ele) => {
      let data = {chatid:id, message: ele.message,username:ele.sendrs_username}
      socketClient.current.emit("get-messages",data)
    })
    console.log(res.data.data)
  })
}

//
const blockUser = (user) => {
  const data = {
    blocker_id: userId, blocker_name: username,
    blockee_id: user.id, blockee_name: user.username
  }
console.log(user)
  axios.post('api/user/block/',data).then((res)=>{
    handleConnection()
    console.log(res)
  })
}

  return (
    <div className="App">
     {
      /* !connected && 
       <form className="" onSubmit={e => {
         e.preventDefault()
         handleConnection()
       }}>
         <input value={username} type="text" onChange={e => setUsername(e.target.value)} 
         required={true} />
         <button type="submit">Submit</button>
       </form>*/
     }
     {
      // connected  && 
      <div className="app">
         <div className="app-body">
          <Sidebar connectedUsers= {connectedUsers} joinChat = {joinChat} email={email} blockUser={blockUser}/>
          <Chat message={message} setMessage={setMessage} messages={messages} username={username}
           handleSendMessage={handleSendMessage}/>
         </div>
      </div>
     }
    </div>
  );
}

export default withAuthenticationRequired(App, {
  onRedirecting: () => <Loading />,
});