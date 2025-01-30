import ErrorHandler from "../utils/ErrorHandler";
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./../middleware/catchAsyncErrors";
import cloudinary from "cloudinary";
import { createCourse } from "../services/course.service";



// export const UploadCourse = CatchAsyncError(
//     async(req:Request,res:Response,next:NextFunction)=>{
//         try {
            
//         } catch (error : any) {
//             return next(new ErrorHandler(error.message,500))
//         }
//     }
// )
//upload course
export const uploadCourse = CatchAsyncError(
    async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const data = req.body
            const thumbnail = data.thumbnail

            if(thumbnail){
                const myCloud = await cloudinary.v2.uploader.upload(thumbnail,{
                    folder:'courses'
                });
                
                data.thumbnail = {
                    public_id:myCloud.public_id,
                    url:myCloud.url
                }
            }
            createCourse(data,res,next)  // from services 
        } catch (error : any) {
            return next(new ErrorHandler(error.message,500))
        }
    }
)

