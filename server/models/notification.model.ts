import mongoose ,{Document, Model,Schema} from "mongoose";


export interface INotifiaction extends Document {
    title:string,
    message:string,
    status:string,
    userId:string
}

const notificationSchema = new Schema<INotifiaction>({
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:'unread'
    }
},{timestamps:true})

const NotificationModel:Model<INotifiaction> = mongoose.model('notification',notificationSchema)

export default NotificationModel