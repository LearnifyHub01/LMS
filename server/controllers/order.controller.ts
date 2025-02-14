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

//create order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, paymentInfo } = req.body as IOrder;

      const user = await userModel.findById(req?.user?._id);

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
        paymentInfo,
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

      await user?.save();
      //notification for admin
      const notification = await NotificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `you have a new order from ${course?.name}`,
      });

      if (course) {
        await CourseModel.findByIdAndUpdate(
          courseId,
          { $inc: { purchased: 1 } },
          { new: true }
        );
      }

      await course.save();

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

  
  