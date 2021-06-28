import { Schema, model } from 'mongoose';

interface Blocked {
    blocker_id:string;
    blocker_name: string;
    blockee_id:string;
    blockee_name:string;
  }


//set up schema using mongoose schema method
const BlockedSchema = new Schema<Blocked>({
    blocker_id:{
        type: String,
        required: true,
        unique: true
    },
    blocker_name:{
        type: String,
        required: true
    },
    blockee_id:{
        type: String,
        required: true,
    },
    blockee_name:{
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

//declare module exports and create collection
export const BlockModel = model<Blocked>('Blocked', BlockedSchema);