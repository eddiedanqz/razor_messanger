import  express from "express";
import {getMessages,addMessage} from '../controllers/messageController'
export const messageRouter = express.Router();

messageRouter.route('/send').post(addMessage)
messageRouter.route('/chat/:id').get(getMessages)

