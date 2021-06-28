import { Schema, model } from 'mongoose';

// 
interface Message {
    chatid: string;
    message: string;
    sendrs_id:string;
    sendrs_username:string;
  }


// Set up schema using mongoose schema method
const MessageSchema = new Schema<Message>({
    chatid:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true
    },
    sendrs_username:{
        type: String,
        required: true
    },
    sendrs_id:{
        type: String,
        required: false
    },
    timestamp:{
        type: Date,
        default: Date.now
    }

});

//declare module exports and create collection
export const  MessageModel = model<Message>('Message', MessageSchema);