import  express,{Application,Request,Response,NextFunction} from "express";
import http from "http"
import  dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import { joinUser, userLeft,getUsers} from './utils/users'
import { connectDb } from "./db";
import {router} from './routes/user'


// Load environment variables
dotenv.config({path:'./config/config.env'})

// Initialising express
const app:Application  = express();

const server = http.createServer(app)

// Connect to socket.io server
const io = new Server(server, {
  cors:{
      origin:'http://localhost:3000'
  }
  });

  // Connect to database
  connectDb()
  
  // Server-side instance
io.on("connection", (socket: Socket) => {
  // Create private chat
  socket.join("myChat")

  // 
    socket.on("handle-connection", (username:string) =>{
      if(!joinUser(socket.id, username)){
        socket.emit("username-taken")
      }else{
        socket.emit("username-submitted")
        io.to("myChat").emit("get-connected-users",getUsers())  
      }

    })

    // Broadcast message
    socket.on("message", (message: {message:string ,username:string}) =>{
       socket.broadcast.to("myChat").emit("recieve-message" , message)
    })

  // Disconnect user
   socket.on("disconnect",()=>{
      userLeft(socket.id)
   })

  });

  
//
app.use(express.json())

//
app.use('/api/users' , router)

const PORT:number = 5000 || process.env.PORT

server.listen(PORT , () => console.log(`server is running on ${PORT}`))