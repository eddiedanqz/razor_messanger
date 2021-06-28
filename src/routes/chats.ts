import  express from "express";
import {createChat} from '../controllers/chatController'
export const router = express.Router();

router.route('/').post(createChat)

