import { app } from "./app"
import connectDB from "./utils/ds";
import {v2 as cloudinary} from 'cloudinary'
require("dotenv").config();

//cloudnary config
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_SECRET_KEY

})

app.listen(process.env.PORT, () => {
    console.log(`server is connected with port ${process.env.PORT}`);
    connectDB();
    console.log('db connected')
})