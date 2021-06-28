import  express,{Request,Response} from "express";
import {MessageModel} from '../models/Message'

//@desc Get all for a chat
export const getMessages = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const messages = await MessageModel.find({chatid:id})

        return res.status(200).json({
            success: true,
            count: messages.length,
            data: messages
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

//@desc Get all user
//@route Get api/v1/list
//access Public
export const addMessage = async (req: Request, res: Response) => {
    try {
      console.log(req.body)
     const message = await MessageModel.create({
        chatid:req.body.chatId,
        message:req.body.message,
        sendrs_id:req.body.senderid,
        sendrs_username:req.body.username
    })

     return res.status(201).json({
        success: true,
        data: message
    })

    } catch (error) {
        if (error.name === "ValidationError") {
         // const messages  = Object.values(error.errors).map((val) => val.message)
         const messages = error.errors
          return res.status(400).json({
            success: false,
            error: messages
          })
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server errror'
            })
        }
    }

}