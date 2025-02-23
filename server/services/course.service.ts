import { Response, NextFunction } from "express";
import CourseModel from "../models/course.model";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { io } from "../server";

export const createCourse = CatchAsyncError(
  async (data: any, res: Response,) => {
    const course = await CourseModel.create(data);
    console.log(course)
    io.emit("new-course", course);
    console.log('emitted')
    res.status(201).json({

      success: true,
      course,
    });
  }
);


//get all courses

export const getAllCoursesService = async(res:Response)=>{
  const courses = await CourseModel.find().sort({createdAt:-1})
res.status(201).json({
  success:true,
  courses
})

}
