import  express,{Request,Response} from "express";
import {ChatModel} from '../models/Chats'


//@desc Create chat
//@route Get api/v1/list
//access Public
export const createChat = async (req: Request, res: Response) => {
    try {
       
        const chat = await ChatModel.find({ chatid:req.body.chatid,})
        
        if(chat){
            return res.status(201).json({
                success: true,
                data: chat
            })
        }else{
            const chatid = await ChatModel.create({
                chatid:req.body.chatid,
                recpt_id:req.body.reciver_id,
                sendrs_id:req.body.sender_id
            })

            return res.status(201).json({
                success: true,
                data: chatid
            })
        }
           

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}