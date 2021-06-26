import  express from "express";
import {getUsers,addUser} from '../controllers/userController'
export const router = express.Router();

router.route('/').get(getUsers).post(addUser)

