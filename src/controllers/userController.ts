import  express,{Request,Response} from "express";
import {BlockModel} from '../models/Blocked'

//@desc Get all users
//@route Get api/v1/list
//access Public
export const checkBlocked = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const blockList = await BlockModel.find({blockee_id:id})

        return res.status(200).json({
            success: true,
            count: blockList.length,
            data: blockList
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
export const blockUser = async (req: Request, res: Response) => {
    try {
     const user = await BlockModel.create(req.body)

     return res.status(201).json({
        success: true,
        data: user
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