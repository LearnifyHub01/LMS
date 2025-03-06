import ErrorHandler from "../utils/ErrorHandler";
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./../middleware/catchAsyncErrors";
import CourseModel from "../models/course.model";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import userModel from "../models/user.model";
import OrderModel, { IOrder } from "../models/order.model";
import { getAllOrdersService, newOrder } from "../services/order.service";
import { ICourse } from "../models/course.model";
import { tryCatch } from "bullmq";
import Razorpay from "razorpay";
import { redis } from "../utils/redis";
import { json } from "stream/consumers";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,       
  key_secret: process.env.RAZORPAY_KEY_SECRET  
});

//create order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_Info } = req.body as IOrder;
      if (payment_Info) {
        if ("id" in payment_Info) {
          const paymentId = payment_Info.id as any;
          try {
            const paymentDetails = await razorpay.payments.fetch(paymentId);
      
            if (paymentDetails.status !== "captured") {
              return next(new ErrorHandler("payment not authorized",400))
            }
          } catch (error) {
            console.error("Error fetching payment details:", error);
          }
        }
      }
      const user = await userModel.findById(req?.user?._id);
      console.log(user)
      const courseExistInUser = user?.courses?.some(
        (item: any) => item._id.toString() === courseId
      );
      if (courseExistInUser) {
        return next(
          new ErrorHandler("You have already purchased this course", 400)
        );
      }
      const course = await CourseModel.findById(courseId);
      console.log(course?.purchased);
      if (!course) {
        return next(new ErrorHandler("Course not Found", 400));
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
        payment_Info,
      };

      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        { order: mailData }
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order-Confirmation",
            templet: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      user?.courses?.push(course?.id);
      //update redis updation for user is pendig


      await user?.save();
      //notification for admin
      const notification = await NotificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `you have a new order from ${course?.name}`,
      });

    
      const updatedCourse =  await CourseModel.findByIdAndUpdate(
          courseId,
          { $inc: { purchased: 1 } },
          { new: true }
        ); 
      

      await course.save();
      console.log(updatedCourse)
      await redis.set(courseId,JSON.stringify(updatedCourse), "EX", 604800)
    
      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get all order for admin
export const getAllOrders = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        getAllOrdersService(res);
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    }
  );





export const newPayment = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {amount} = req.body
      if (!amount || isNaN(amount)) {
        return res.status(400).json({
            success: false,
            error: 'Amount is required and must be a number'
        });
    }
    const options = {
      amount:amount*100,
      currency:'INR',
      payment_capture: 1
    }
    
    const order = await razorpay.orders.create(options)
    res.status(200).json({
      success:true,
      order_id: order.id,
      status: order.status
    })
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 500));
    }
  })