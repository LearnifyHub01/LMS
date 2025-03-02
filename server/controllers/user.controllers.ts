import { Request, Response, NextFunction } from "express";
import userModel, { IUser, ISession } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
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
import cloudinary from "cloudinary";
import { Session } from "inspector/promises";
import { io } from "../server";

import {
  getAllUsersService,
  updateUserRoleService,
} from "../services/user.service";
import bcrypt from "bcryptjs";
import { log } from "console";
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
      io.emit("new-user", user);

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
      const loginTime = new Date();

      const userAgent = req.headers["user-agent"] || "";
      const ipAddress = req.ip || req.socket.remoteAddress || "Unknown IP";

      // Create session object
      const data = {
        user: { name: user.name },
        userAgent,
        ipAddress,
        loginTime,
      };

      // Send session mail (already implemented)
      await sendSessionMail({
        email: user.email,
        subject: "New Session Detected",
        data,
      });
      // Send token
      sendToken(user, 200, res, userAgent, ipAddress, loginTime);
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
        return next(
          new ErrorHandler("Refresh token or session ID missing", 400)
        );
      }

      // Clear cookies
      res.clearCookie("access_token", {
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(0),
        secure: process.env.NODE_ENV === "production",
      });
      res.clearCookie("refresh_token", {
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(0),
        secure: process.env.NODE_ENV === "production",
      });
      res.clearCookie("session_id", {
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(0),
        secure: process.env.NODE_ENV === "production",
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
      io.emit("updateDevices", user.sessions);
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
      const sessionInfo = user.sessions;
      res.status(200).json({
        success: true,
        sessionInfo,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

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
      const keys = await redis.keys(`session:${userId}:*`); // Get all session keys for this user
      if (keys.length > 0) {
        await redis.del(...keys); // Delete all sessions from Redis
      }

      // Clear cookies
      res.clearCookie("access_token", {
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(0),
        secure: process.env.NODE_ENV === "production",
      });
      res.clearCookie("refresh_token", {
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(0),
        secure: process.env.NODE_ENV === "production",
      });
      res.clearCookie("session_id", {
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(0),
        secure: process.env.NODE_ENV === "production",
      });
      user.sessions = [];
      await user.save();

      io.emit("logoutAllDevices", { userId });
      res.status(200).json({
        success: true,
        message: "Logged out from all devices",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// export const updateAccessToken = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const refresh_token = req.cookies.refresh_token as string;
//       const sessionId = req.cookies.session_id; // Get session ID from cookie

//       if (!refresh_token || !sessionId) {
//         return next(new ErrorHandler("JWT and Session ID must be provided", 400));
//       }

//       let decoded: any;
//       try {
//         decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string) as JwtPayload;
//       } catch (err) {
//         console.error("Error verifying refresh token:", err);
//         return next(new ErrorHandler("Invalid or expired refresh token", 400));
//       }

//       const userId = decoded.id;
//       const user = await userModel.findById(userId);

//       if (!user) {
//         return next(new ErrorHandler("User not found", 404));
//       }

//       const sessionKey = `session:${userId}:${sessionId}`;
//       const sessionJson = await redis.get(sessionKey);

//       if (!sessionJson) {
//         return next(new ErrorHandler("Session not found or expired", 400));
//       }

//       const sessionData = JSON.parse(sessionJson);

//       // 2️⃣ Check if refresh token matches the stored session
//       if (sessionData.refreshToken !== refresh_token) {
//         return next(new ErrorHandler("Invalid refresh token", 400));
//       }

//       console.log("Valid session found:", sessionData);

//       // 3️⃣ Generate new tokens
//       const accessToken = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN as string, { expiresIn: "1d" });
//       const newRefreshToken = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN as string, { expiresIn: "10d" });

//       res.cookie("access_token", accessToken, accessTokenOptions);
//       res.cookie("refresh_token", newRefreshToken, refreshTokenOptions);

//       // 4️⃣ Update only the refresh token in all existing user sessions
//       user.sessions = user.sessions.map((session: any) => {
//         if (session.sessionKey === sessionId) {
//           return { ...session, refreshToken: newRefreshToken };
//         }
//         return session;
//       });

//       // 5️⃣ Update session in Redis with the new refresh token
//       sessionData.refreshToken = newRefreshToken;

//       await redis.set(sessionKey, JSON.stringify(sessionData),"EX", 7 * 24 * 60 * 60);

//       // 6️⃣ Save the updated session in MongoDB
//       await user.save();
//       console.log(sessionData.refresh_token)

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

//getcurrent cookie
export const updateAccessToken = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;
      const sessionId = req.cookies.session_id; // Get session ID from cookie

      if (!refresh_token || !sessionId) {
        return next(
          new ErrorHandler("JWT and Session ID must be provided", 400)
        );
      }

      let decoded: any;
      try {
        decoded = jwt.verify(
          refresh_token,
          process.env.REFRESH_TOKEN as string
        ) as JwtPayload;
      } catch (err) {
        console.error("Error verifying refresh token:", err);
        return next(new ErrorHandler("Invalid or expired refresh token", 400));
      }

      const userId = decoded.id;
      const user = await userModel.findById(userId);

      if (!user) {
        return next(
          new ErrorHandler("please login for access this resource", 400)
        );
      }

      const sessionKey = `session:${userId}:${sessionId}`;
      const sessionJson = await redis.get(sessionKey);

      if (!sessionJson) {
        return next(new ErrorHandler("Session not found or expired", 400));
      }

      const sessionData = JSON.parse(sessionJson);

      // 2️⃣ Check if refresh token matches the stored session
      if (sessionData.refreshToken !== refresh_token) {
        return next(new ErrorHandler("Invalid refresh token", 400));
      }

      // 3️⃣ Generate new tokens
      const accessToken = jwt.sign(
        { id: userId },
        process.env.ACCESS_TOKEN as string,
        { expiresIn: "1d" }
      );
      const newRefreshToken = jwt.sign(
        { id: userId },
        process.env.REFRESH_TOKEN as string,
        { expiresIn: "10d" }
      );

      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", newRefreshToken, refreshTokenOptions);

      // 4️⃣ Update refresh token in MongoDB for the correct session

      const sessionIndex = user.sessions.findIndex((session: any) => {
        const extractedSessionId = session.sessionKey.split(":").pop(); // Extract last part
        return extractedSessionId === sessionId;
      });
      if (sessionIndex !== -1) {
        user.sessions[sessionIndex].refreshToken = newRefreshToken;
      }

      // 5️⃣ Update session in Redis with the new refresh token
      sessionData.refreshToken = newRefreshToken;
      await redis.set(
        sessionKey,
        JSON.stringify(sessionData),
        "EX",
        7 * 24 * 60 * 60
      );

      // 6️⃣ Save the updated session in MongoDB
      await user.save(); // Ensure this executes successfully

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
      const userAgent = req.headers["user-agent"] || "";
      const ipAddress = req.ip || req.socket.remoteAddress || "Unknown IP";
      const loginTime = new Date();
      const user = await userModel.findOne({ email });
      if (!user) {
        const newUser = await userModel.create({
          email,
          name,
          avatar: avatarObject,
        });
        sendToken(newUser, 200, res, userAgent, ipAddress, loginTime);
      } else {
        sendToken(user, 200, res, userAgent, ipAddress, loginTime);
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
      const sessionKeys = await redis.keys(`session:${userId}:*`);
      for (const key of sessionKeys) {
        const existingSession = await redis.get(key);
        if (existingSession) {
          const sessionData = JSON.parse(existingSession);
          sessionData.sessionUser.name = user?.name;
          await redis.set(
            key,
            JSON.stringify(sessionData),
            "EX",
            7 * 24 * 60 * 60
          );
        }
      }

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
      const userId = req.user?._id;
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
      const sessionKeys = await redis.keys(`session:${userId}:*`);
      for (const key of sessionKeys) {
        const existingSession = await redis.get(key);
        if (existingSession) {
          const sessionData = JSON.parse(existingSession);
          sessionData.sessionUser.password = user?.password;
          await redis.set(
            key,
            JSON.stringify(sessionData),
            "EX",
            7 * 24 * 60 * 60
          );
        }
      }
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
      const sessionKeys = await redis.keys(`session:${userId}:*`);
      for (const key of sessionKeys) {
        const existingSession = await redis.get(key);
        if (existingSession) {
          const sessionData = JSON.parse(existingSession);
          sessionData.sessionUser.avatar = user?.avatar;
          await redis.set(
            key,
            JSON.stringify(sessionData),
            "EX",
            7 * 24 * 60 * 60
          );
        }
      }

      res.status(200).json({
        success: "true",
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get all user  --- only admin
export const getAllUsers = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUsersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update use role - only for admin
export const updateUserRole = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, role } = req.body;
      const userId = req.user?._id;

      // Update role in the database
      await updateUserRoleService(res, id, role);

      // Fetch the updated user from the database
      const updatedUser = await userModel.findById(userId);

      // Get all session keys for this user
      const sessionKeys = await redis.keys(`session:${userId}:*`);

      for (const key of sessionKeys) {
        const existingSession = await redis.get(key);
        if (existingSession) {
          const sessionData = JSON.parse(existingSession);

          // Update session with new role
          sessionData.sessionUser.role = updatedUser?.role;

          // Save updated session back to Redis
          await redis.set(
            key,
            JSON.stringify(sessionData),
            "EX",
            7 * 24 * 60 * 60
          );
        }
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//Delete user - only for admin
export const deleteUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);
      if (!user) {
        return next(new ErrorHandler("user not exists", 400));
      }
      await user.deleteOne({ id });
      await redis.del(id);
      res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
interface IForgotToken {
  token: string;
}
export const createForgotPasswordToken = (
  user: IRegistrationBody
): IForgotToken => {
  if (!user) {
    throw new Error("Missing required user information for activation token.");
  }
  const token = jwt.sign(
    {
      user,
    },
    process.env.ACTIVATION_SECRET as Secret,
    { expiresIn: "15m" }
  );
  console.log('token generated',token)

  return { token };
};

export const forgotPassword = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      console.log(email);
      const user = await userModel.findOne({ email: email });
      if (!user) {
        return next(new ErrorHandler("User not exists", 400));
      }
      const token = createForgotPasswordToken(email);
      console.log(token.token);
      res.status(200).json({
        status: true,
        token: token.token,
      });
      const data = {
        user: { name: user.name },
        text: `http://localhost:3000/auth/forgot-password/${user._id}/${token.token}`,
      };
      console.log(`email recived ${email}`)
      await sendMail({
        email: user.email,
        subject: "Forgot Your Password",
        templet: "forgot-password-mail.ejs",
        data,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);


export const resetPassword = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.params;
      const { password } = req.body;
      console.log('reset pasword call')
      // ✅ Decode the reset token to extract user email
      const decoded = jwt.verify(token, process.env.ACTIVATION_SECRET as Secret) as JwtPayload;
      if (!decoded || !decoded.user) {
        return next(new ErrorHandler("Invalid or expired token", 400));
      }

      // ✅ Find the user by email
      const user = await userModel.findOne({ email: decoded.user });
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      console.log(user)
      console.log('user password',user.password)
      // ✅ Hash the new password
      console.log('new password',password)
      const newPassword= await bcrypt.hash(password, 10);
      await userModel.updateOne(
        { _id: user._id },
        { password: newPassword }
      );

      // ✅ Logout user from all devices after password change
      await logoutFromAllOnPasswordChange(user._id.toString());

      // ✅ Emit WebSocket event to notify other sessions
      io.emit("logoutAllDevices", { userId: user._id.toString() });

      res.status(200).json({
        success: true,
        message: "Password changed successfully. Logged out from all devices.",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);


export const logoutFromAllOnPasswordChange = async (userId: string) => {
  try {
    // ✅ Find the user
    const user = await userModel.findById(userId);
    if (!user) throw new Error("User not found");

    // ✅ Clear all Redis sessions
    const keys = await redis.keys(`session:${userId}:*`);
    if (keys.length > 0) {
      await redis.del(...keys);
    }

    // ✅ Remove stored sessions from database
    user.sessions = [];
    await user.save();

    // ✅ Emit event to logout all active sessions
    io.emit("logoutAllDevices", { userId });

    //console.log(`🔒 User ${userId} logged out from all devices`);
  } catch (error: any) {
    console.error("Logout error:", error.message);
  }
};
