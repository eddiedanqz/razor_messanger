import mongoose from 'mongoose'

export const connectDb = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect('mongodb+srv://traversyUser:traversyUser123@cluster0.detcp.mongodb.net/razor_chatdb?retryWrites=true&w=majority', ({
            useNewUrlParser:true,
            useUnifiedTopology:true
        }))

        console.log(`DB connected ${conn.connection.host}`)

    } catch (error) {
        console.log(`Error : ${error.message}`)
        process.exit(1)
    }
}
