import  express from "express";
import {checkBlocked,blockUser} from '../controllers/userController'
export const userRouter = express.Router();

userRouter.route('/block/:id').get(checkBlocked)
userRouter.route('/block').post(blockUser)



