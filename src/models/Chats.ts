import { Schema, model } from 'mongoose';

// 
interface Chat {
    chatid:string;
    recpt_id: string;
    sendrs_id:string;
  }

  // 
const ChatSchema = new Schema<Chat>({
    chatid:{
        type: String,
        required: true,
        unique: true

    },
    recpt_id:{
        type: String,
        required: true,
        unique: true

    },
    sendrs_id:{
        type: String,
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now
    }
  });

//
export const ChatModel = model<Chat>('Chat', ChatSchema);