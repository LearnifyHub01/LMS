import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";

// export const isAuthenticated = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const access_token = req.cookies["access_token"] as string;

//     if (!access_token) {
//       return next(
//         new ErrorHandler("Please login to access this resource", 400)
//       );
//     }

//     try {
//       const decoded = jwt.verify(
//         access_token,
//         process.env.ACCESS_TOKEN as string
//       ) as JwtPayload;
     
//       console.log("d",decoded)
//       // Check if the session exists in Redis
//       const user = await redis.get(decoded.id);
//       if (!user) {
//         return next(new ErrorHandler("User not found or session expired", 400));
//       }

//       req.user = JSON.parse(user);
//       next();
//     } catch (error) {
//       return next(new ErrorHandler("Invalid or expired token", 400));
//     }
//   }
// );


export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.cookies;
    const sessionId = req.cookies.session_id; // Get session_id from cookie 

    if (!access_token || !sessionId) {
      return next(new ErrorHandler("User not authenticated", 401));
    }

    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as { id: string };

    if (!decoded?.id) {
      return next(new ErrorHandler("Invalid token", 401));
    }

    // Fetch session from Redis using correct session key
    const sessionKey = `session:${decoded.id}:${sessionId}`;
    const sessionData = await redis.get(sessionKey);

    if (!sessionData) {
      return next(new ErrorHandler("Session expired or invalid", 401));
    }
    
    req.user = JSON.parse(sessionData).sessionUser; 
    
    next(); 
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
};

export const authorizeRoles = (...roles:string[])=>{
    return(req:Request,res:Response,next:NextFunction)=>{
        if(!roles.includes(req.user?.role || '')){
          console.log(req.user?.role)
          console.log(req.user?.email)
            return next(new ErrorHandler(`Role:${req.user?.role} is not allowed to access this resources`,403))
        }
        next()
    }
}