import { Request, Response, NextFunction } from "express";
import userModel, { IUser,ISession } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "./../middleware/catchAsyncErrors";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
require("dotenv").config();
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import { redis } from "../utils/redis";
import sendSessionMail from "../utils/sendSessionMail";
import {
  sendToken,
  accessTokenOptions,
  refreshTokenOptions,
} from "../utils/jwt";
import { getUserbyId } from "../services/user.service";
import cloudinary from "cloudinary";
import { Session } from "inspector/promises";
import os from 'os'
const uaParser = require("ua-parser-js");



//register user

interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registrationUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      console.log({ name, email, password });

      // Check if email already exists
      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email already exists", 400));
      }

      const user: IRegistrationBody = {
        name,
        email,
        password,
      };

      // Generate activation token
      const activationToken = createActivationToken(user);
      const activationCode = activationToken.activationCode;

      const data = { user: { name: user.name }, activationCode };

      // Send activation email
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data
      );

      await sendMail({
        email: user.email,
        subject: "Activate your account",
        templet: "activation-mail.ejs",
        data,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account.`,
        activationToken: activationToken.token,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (
  user: IRegistrationBody
): IActivationToken => {
  const { name, email, password } = user;

  // Validate user fields
  if (!name || !email || !password) {
    throw new Error("Missing required user information for activation token.");
  }

  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    { expiresIn: "15m" }
  );

  return { token, activationCode };
};

//activate user

interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

export const activateUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequest;

      // Verify the activation token
      const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      ) as { user: IUser; activationCode: string };

      // Check activation code
      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("Invalid activation code", 400));
      }

      const { name, email, password } = newUser.user;

      // Validate user fields from token
      if (!name || !email || !password) {
        return next(
          new ErrorHandler("Incomplete user information in token.", 400)
        );
      }

      // Check if the user already exists
      const existUser = await userModel.findOne({ email });
      if (existUser) {
        return next(new ErrorHandler("User already exists.", 400));
      }

      // Create the user in the database
      const user = await userModel.create({
        name,
        email,
        password,
      });

      res.status(201).json({
        success: true,
        message: "User activated successfully.",
      });
    } catch (error: any) {
      console.error("Error activating user:", error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//login User

interface ILoginRequest {
  email: string;
  password: string;
  
}

export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;
      if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
      }
      const user = await userModel.findOne({ email }).select("+password");
      console.log(user);

      if (!user) {
        return next(new ErrorHandler("User is not exists.", 400));
      }

      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return next(
          new ErrorHandler(
            "Invalid Password please enter correct password",
            400
          )
        );
      }
      
      const userAgent = uaParser(req.headers["user-agent"]);
      const ipAddress = req.ip || req.socket.remoteAddress || "Unknown IP";
      sendToken(user, 200, res,userAgent,ipAddress);
      const data = { 
        user: { name: user.name }, 
        userAgent, 
        ipAddress, 
        loginTime: new Date() 
      };

      await sendSessionMail({
        email: user.email,
        subject: "New Session Detected",
        data,  // No need to include `templet`
      });

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//logout one user

export const logoutUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get the refresh token and session ID from cookies
      const refreshToken = req.cookies.refresh_token;
      const sessionId = req.cookies.session_id;

      if (!refreshToken || !sessionId) {
        return next(new ErrorHandler("Refresh token or session ID missing", 400));
      }

      // Clear cookies
      res.clearCookie("access_token", {
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(0),
        secure: process.env.NODE_ENV === 'production',
      });
      res.clearCookie("refresh_token", {
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(0),
        secure: process.env.NODE_ENV === 'production',
      });
      res.clearCookie("session_id", {
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(0),
        secure: process.env.NODE_ENV === 'production',
      });

     
      const userId = req.user?._id;

      if (!userId) {
        return next(new ErrorHandler("User not authenticated", 401));
      }

      // Get the user and remove their session
      const user = await userModel.findById(userId);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      // Build the session key based on session ID
      const sessionKey = `session:${userId}:${sessionId}`;

      // Delete the session from Redis
      await redis.del(sessionKey); // Remove session from Redis using sessionKey

      // Remove the session from the user's session array
      user.sessions = user.sessions.filter(
        (session: any) => session.refreshToken !== refreshToken
      );
      await user.save();

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


//get session information
export const getSessionInfo = CatchAsyncError(
  async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const userId = req.user?._id;
      if(!userId){
        return next(new ErrorHandler("User not authenticated", 401));
      }
      const user = await userModel.findById(userId);
      if(!user){
        return next(new ErrorHandler("User not found", 404));
      }
      const sessionInfo = user.sessions
      res.status(200).json({
        success:true,
        sessionInfo
      })

    } catch (error : any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
)

//log out from all device

export const logoutFromAllDevice = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;

      if (!userId) {
        return next(new ErrorHandler("User not authenticated", 401));
      }

      const user = await userModel.findById(userId);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      // Clear all sessions for the user from Redis
      const keys = await redis.keys(`session:${userId}:*`);  // Get all session keys for this user
      if (keys.length > 0) {
        await redis.del(...keys);  // Delete all sessions from Redis
      }

      // Clear cookies
      res.clearCookie("access_token", {
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(0),
        secure: process.env.NODE_ENV === 'production',
      });
      res.clearCookie("refresh_token", {
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(0),
        secure: process.env.NODE_ENV === 'production',
      });
      res.clearCookie("session_id", {
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(0),
        secure: process.env.NODE_ENV === 'production',
      });
      user.sessions = []
      
      
      await user.save()
      res.status(200).json({ 
        success:true,
        message: "Logged out from all devices" });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update new access token

// export const updateAccessToken = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const refresh_token = req.cookies.refresh_token as string;
  

//       // Debugging: Log received refresh token
//       console.log("Received refresh_token:", refresh_token);

//       if (!refresh_token) {
//         return next(new ErrorHandler("JWT must be provided", 400));
//       }

//       let decoded;
//       try {
//         decoded = jwt.verify(
//           refresh_token,
//           process.env.REFRESH_TOKEN as string
//         ) as JwtPayload;
//         console.log("Decoded refresh token:", decoded);
//       } catch (err) {
//         console.error("Error verifying refresh token:", err);
//         return next(new ErrorHandler("Invalid or expired refresh token", 400));
//       }

//       const session = await redis.get(decoded.id as string);

//       // Debugging: Log session from Redis
//       console.log("Session data from Redis:", session);

//       if (!session) {
//         return next(new ErrorHandler("Session not found or expired", 400));
//       }
//       const user = await userModel.findById(decoded.id)
//       if (!user) {
//         return next(new ErrorHandler("User not found", 404));
//       }

      

//       const accessToken = jwt.sign(
//         { id: user._id },
//         process.env.ACCESS_TOKEN as string,
//         { expiresIn: "1d" }
//       );

//       const newRefreshToken = jwt.sign(
//         { id: user._id },
//         process.env.REFRESH_TOKEN as string,
//         { expiresIn: "10d" }
//       );
//       req.user = user;
     
//       res.cookie("access_token", accessToken, accessTokenOptions);
//       res.cookie("refresh_token", newRefreshToken, refreshTokenOptions);

//       user.sessions = user.sessions.filter((session:any) => session.refreshToken !== refresh_token);

//       const userAgent = uaParser(req.headers["user-agent"]);
//       const ipAddress = req.ip || req.socket.remoteAddress || "Unknown IP";
//       user.sessions.push({
//         refreshToken : newRefreshToken,
//         ipAddress : ipAddress,
//         device: userAgent.ua,
//         loginTime: new Date(),
//     } as ISession);
//     await user.save();
//       await user.save();

//       res.status(200).json({
//         status: "success",
//         accessToken,
//       });
//     } catch (error: any) {
//       console.error("Error during token refresh:", error);
//       return next(new ErrorHandler(error.message, 400));
//     }
//   }
// );

export const updateAccessToken = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;
      const sessionId = req.cookies.session_id; // Get session ID from cookie

      if (!refresh_token || !sessionId) {
        return next(new ErrorHandler("JWT and Session ID must be provided", 400));
      }

      console.log("Received refresh_token:", refresh_token);

      // Decode the refresh token to get the user ID
      let decoded: any;
      try {
        decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string) as JwtPayload;
        console.log("Decoded refresh token:", decoded);
      } catch (err) {
        console.error("Error verifying refresh token:", err);
        return next(new ErrorHandler("Invalid or expired refresh token", 400));
      }

      const userId = decoded.id;
      const user = await userModel.findById(userId);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

     
      const sessionKey = `session:${userId}:${sessionId}`;
      const sessionJson = await redis.get(sessionKey);

      console.log("Session data from Redis:", sessionJson);

      if (!sessionJson) {
        return next(new ErrorHandler("Session not found or expired", 400));
      }

      const sessionData = JSON.parse(sessionJson);

      // 2️⃣ Check if refresh token matches the stored session
      if (sessionData.refreshToken !== refresh_token) {
        return next(new ErrorHandler("Invalid refresh token", 400));
      }

      console.log("Valid session found:", sessionData);

      // 3️⃣ Generate new tokens
      const accessToken = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN as string, { expiresIn: "1d" });
      const newRefreshToken = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN as string, { expiresIn: "10d" });

      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", newRefreshToken, refreshTokenOptions);

      // 4️⃣ Remove old refresh token from user's sessions
      user.sessions = user.sessions.filter((session: any) => session.refreshToken !== refresh_token);

      // 5️⃣ Update session in Redis with the new refresh token
      sessionData.refreshToken = newRefreshToken;
      await redis.set(sessionKey, JSON.stringify(sessionData));

      // 6️⃣ Save the new session in MongoDB
      const userAgent = uaParser(req.headers["user-agent"]);
      const ipAddress = req.ip || req.socket.remoteAddress || "Unknown IP";
      user.sessions.push({
        sessionKey: sessionId, 
        refreshToken: newRefreshToken,
        ipAddress: ipAddress,
        device: userAgent.ua,
        loginTime: new Date(),
        cpu: os.cpus()[0]?.model || "Unknown",
        os: os.platform(), 
        browser: userAgent.browser.name || "Unknown",
      } as ISession)
      await user.save();

      res.status(200).json({
        status: "success",
        accessToken,
      });

    } catch (error: any) {
      console.error("Error during token refresh:", error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//getcurrent cookie
export const getCurrentCookie = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get cookies from request
      const cookies = req.cookies;

      // Extract specific cookies (example: session_id, access_token)
      const sessionId = cookies.session_id || null;
      const accessToken = cookies.access_token || null;
      const refreshToken = cookies.refresh_token || null;

      // Check if cookies exist
      if (!sessionId) {
        return next(new ErrorHandler("Session ID not found", 404));
      }

      // Send cookies back in response
      res.status(200).json({
        success: true,
        message: "Cookies retrieved successfully",
        sessionId,
        accessToken,
        refreshToken,
      });

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


// get user info
export const getUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id || "";
      if (!userId) {
        return next(new ErrorHandler("User ID not found", 404));
      }
      const user = await userModel.findById(userId);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      res.status(200).json({ user });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);



//social authentication
interface ISocialAuthBody {
  email: string;
  name: string;
  avatar: string;
}
export const socialAuth = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, avatar } = req.body as ISocialAuthBody;
      //console.log(avatar)

      const avatarObject = {
        public_id: "defaultPublicId",
        url: avatar,
      };
      const userAgent = uaParser(req.headers["user-agent"]);
      const ipAddress = req.ip || req.socket.remoteAddress || "Unknown IP";
      
      const user = await userModel.findOne({ email });
      if (!user) {
        const newUser = await userModel.create({
          email,
          name,
          avatar: avatarObject,
        });
        sendToken(newUser, 200, res,userAgent,ipAddress);
        
      } else {
        sendToken(user, 200, res,userAgent,ipAddress);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update user info

interface IUpdateUserInfo {
  name?: string;
  email?: string;
}

export const UpdateUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body as IUpdateUserInfo;
      const userId = req.user?._id;
      const user = await userModel.findById(userId);

      if (name && user) {
        user.name = name;
      }

      await user?.save();
      await redis.set(userId as any, JSON.stringify(user));

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// update user password

interface IUpdateUserPassword {
  oldPassword?: string;
  newPassword?: string;
}

export const updatePassword = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IUpdateUserPassword;

      if (!oldPassword || !newPassword) {
        return next(new ErrorHandler("Please enter old and new password", 400));
      }
      const user = await userModel.findById(req.user?._id).select("+password");

      // when user login with social authentication it haven't any password
      if (user?.password === undefined) {
        return next(new ErrorHandler("Invalid user", 400));
      }
      const isPasswordMatch = await user?.comparePassword(
        oldPassword as string
      );
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid old password", 400));
      }

      user.password = newPassword as string;
      await user.save();
      await redis.set(req.user?._id as any, JSON.stringify(user));
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update profile picture
interface IUpdateProfilePicture {
  avatar: string;
}
export const updateProfilePicture = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body;

      const userId = req.user?._id;
      const user = await userModel.findById(userId);

      if (user && avatar) {
        //if user have one avatar then call this if
        if (user?.avatar?.public_id) {
          await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            
  quality: 100,
  
          });
          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } else {
          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",

            quality: 100,
          });
          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }
      await user?.save();
      await redis.set(userId as any, JSON.stringify(user));

      res.status(200).json({
        success: "true",
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
