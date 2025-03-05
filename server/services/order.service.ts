import { Response, NextFunction } from "express";
import CourseModel from "../models/course.model";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import OrderModel from "../models/order.model";


export const newOrder = CatchAsyncError(
    async (data: any, res: Response, next: NextFunction) => {
        const order = await OrderModel.create(data);
        res.status(201).json({  // ✅ Fixed: `res.send(201).json(...)` -> `res.status(201).json(...)`
            success: true,
            order,
            message:'course purchased'
        });
    }
);


//get all order

export const getAllOrdersService = async(res:Response)=>{
    const orders = await OrderModel.find().sort({createdAt:-1})
  res.status(201).json({
    success:true,
    orders
  })
  
  }
  


