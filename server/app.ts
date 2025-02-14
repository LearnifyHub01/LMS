import { ErrorMiddleware } from "./middleware/error";
require("dotenv").config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Request, Response, NextFunction } from "express"
import userRouter from './routes/user.route'
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.rout";
import compression, { filter } from 'compression';
export const app = express();

app.use(compression({
  level:6,
  threshold:0,
  filter:(req,res)=>{
    if(req.headers['x-no-compression']){
      return false
    }
    return compression.filter(req,res)
  }
}
))

app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//routes
app.use('/api/v1',userRouter,courseRouter,orderRouter,notificationRouter)


app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Api is working",
  });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err); 
});

app.use(ErrorMiddleware);
