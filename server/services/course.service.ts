import { Response, NextFunction } from "express";
import CourseModel from "../models/course.model";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { io } from "../server";
import { redis } from "../utils/redis";
import axios from "axios";

export const getAllCoursesService = async (req:any,res: Response) => {
  const userId =req.user._id;
  const courses = await CourseModel.find({ publisher: userId }).sort({ createdAt: -1 });
  console.log(courses)
  res.status(201).json({
    success: true,
    courses,
  });
};

export const  getVideoLength= async(videoId: string): Promise<number>=> {
  try {
    const response = await axios.get(
      `https://dev.vdocipher.com/api/videos/${videoId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Apisecret dC5iMpNu7SqoXMaEgSRy62bNhctYnkFJSZVMlHO5tRPVUdYmsL1syKSUJJOJsEow`, // Your API key
        },
      }
    );
    return response.data.length;
  } catch (error: any) {
    throw new Error(
      `Failed to fetch length for video ${videoId}: ${error.message}`
    );
  }
}

interface VideoData {
  videoUrl: string;
  videoLength: number;
  [key: string]: any;
}

interface CourseData {
  courseData: VideoData[];
  [key: string]: any;
}

export const createCourse = CatchAsyncError(
  async (data: CourseData, res: Response, next: NextFunction) => {
    const updatedCourseData = await Promise.all(
      data.courseData.map(async (video: VideoData) => {
        const videoId = video.videoUrl;
        const length = await getVideoLength(videoId);
        return { ...video, videoLength: length };
      })
    );

    data.courseData = updatedCourseData;

    const course = await CourseModel.create(data);

    const redisCourses = await CourseModel.find().select(
      "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
    );
    await redis.set("allCourses", JSON.stringify(redisCourses));

    io.emit("new-course", course);
    console.log("emitted");

    res.status(201).json({
      success: true,
      course,
    });
  }
);


