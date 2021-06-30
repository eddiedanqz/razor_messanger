import express, { Application } from "express";
import http from "http"
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import { joinUser, userLeft, getUsers } from './utils/users'
import { connectDb } from "./db";
import { router } from './routes/chats'
import { messageRouter } from './routes/messages'
import { userRouter } from './routes/user'

// Load environment variables
dotenv.config({ path: './config/config.env' })

// Initialising express
const app: Application = express();

const server = http.createServer(app)

// Connect to socket.io server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

// Connect to database
connectDb()

//
app.use(express.json())

// Register routes
app.use('/api/message', messageRouter)
app.use('/api/chat', router)
app.use('/api/user', userRouter)

// Server-side instance
io.on("connection", (socket: Socket) => {

  // 
  socket.on("handle-connection", (data) => {
    joinUser(socket.id, data.id, data.username, data.email)
    // socket.emit("username-submitted")
    socket.emit("get-connected-users", getUsers())

  })

  // Create private chat
  socket.on("joinChat", (chatid) => {
    // Open chat
    socket.join(chatid)
    //  saveChat(chatid)
  })

  /*
  socket.on("get-messages", (data:{chatid:string,message:string}) => { 
    
    socket.broadcast.to(data.chatid).emit("recieve-message" ,data)
    
    })
  */


  // Broadcast message
  socket.on("message", (message: { chatId: string, message: string, username: string }) => {

    io.to(message.chatId).emit("recieve-message", message)
  })

  // Disconnect user
  socket.on("disconnect", () => {
    userLeft(socket.id)
  })

});


const PORT: number = 5000 || process.env.PORT

server.listen(PORT, () => console.log(`server is running on ${PORT}`))