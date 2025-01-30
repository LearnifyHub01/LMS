import { Response, NextFunction } from "express";
import CourseModel from "../models/course.mode";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";

export const createCourse = CatchAsyncError(
  async (data: any, res: Response) => {
    const course = await CourseModel.create(data);
    res.status(201).json({
      success: true,
      course,
    });
  }
);
