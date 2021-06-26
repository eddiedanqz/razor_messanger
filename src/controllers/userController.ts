import  express,{Request,Response} from "express";
import {UserModel} from '../models/User'

//@desc Get all movies
//@route Get api/v1/list
//access Public
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find()

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

//@desc Get all movies
//@route Get api/v1/list
//access Public
export const addUser = async (req: Request, res: Response) => {
    try {
     
     const user = await UserModel.create(req.body)

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