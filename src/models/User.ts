import { Schema, model } from 'mongoose';

// 
interface User {
    email: string;
    username: string;
  }

  // 
const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true }
  });

//
export const UserModel = model<User>('User', UserSchema);