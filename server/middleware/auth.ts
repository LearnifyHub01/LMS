import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";

export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies["access_token"] as string;

    if (!access_token) {
      return next(
        new ErrorHandler("Please login to access this resource", 400)
      );
    }

    try {
      const decoded = jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN as string
      ) as JwtPayload;
     
      // Check if the session exists in Redis
      const user = await redis.get(decoded.id);
      if (!user) {
        return next(new ErrorHandler("User not found or session expired", 400));
      }

      req.user = JSON.parse(user);
      next();
    } catch (error) {
      return next(new ErrorHandler("Invalid or expired token", 400));
    }
  }
);

//validate user role

export const authorizeRoles = (...roles:string[])=>{
    return(req:Request,res:Response,next:NextFunction)=>{
        if(!roles.includes(req.user?.role || '')){
            return next(new ErrorHandler(`Role:${req.user?.role} is not allowed to access this resources`,403))
        }
        next()
    }
}