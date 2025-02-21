require("dotenv").config();
import { Response } from "express";
import userModel, { IUser, ISession } from "../models/user.model";
import { redis } from "./redis";
import { v4 as uuidv4 } from "uuid";
import { io } from "../server";
import si from "systeminformation";
import useragent from "express-useragent";
import os from "os";


interface ITokenOptions {
  expire: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}
//parse env var. to integret with fallback values
export const accessTokenExpire = parseInt(
  process.env.ACCESS_TOKEN_EXPIRE || "300",
  10
);
export const refreshTokenExpire = parseInt(
  process.env.REFRESH_TOKEN_EXPIRE || "1200",
  10
);

export const accessTokenOptions: ITokenOptions = {
  expire: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
  maxAge: accessTokenExpire * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

export const refreshTokenOptions: ITokenOptions = {
  expire: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

export const sendToken = async (
  user: IUser,
  statusCode: number,
  res: Response,
  userAgent: any,
  ipAddress: any,
  loginTime: Date
) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  const parser = useragent.parse(userAgent);
  // upload session to redis

  const sessionId = uuidv4(); // Generate unique session ID
  const sessionKey = `session:${user._id}:${sessionId}`;
  const SESSION_EXPIRATION = Number(process.env.SESSION_EXPIRATION) || 3600;

  const systemInfo = await si
    .system()
    .catch(() => ({ manufacturer: "Unknown Device" }));
  const osInfo = await si.osInfo().catch(() => ({ hostname: "Unknown Host" }));
  const deviceName = systemInfo.manufacturer || "Unknown Device";
  const hostName = osInfo.hostname || os.hostname() || "Unknown Host";

  // Create session data
  const sessionData = {
    sessionUser: {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      isVerified: user.isVerified,
      avatar: user.avatar,
      courses:user.courses
    },
    refreshToken,
    ipAddress,
    deviceName,
    hostName,
    device: parser.isMobile ? "Mobile" : parser.isTablet ? "Tablet" : "Desktop",
    browser: `${parser.browser} ${parser.version}` || "Unknown Browser",
    sessionKey: sessionKey,
    os: parser.os,
    loginTime,
  };

  // Store session in Redis using the session key format `session:{userId}:{sessionId}`
  await redis.set(
    sessionKey,
    JSON.stringify(sessionData),
    "EX",
    7 * 24 * 60 * 60 * 1000
  );

  res.cookie("session_id", sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production", // Set to true in production for secure cookies
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Cookie settings for secure cookies in production
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
  }
  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  user.sessions.push({
    refreshToken,
    ipAddress,
    deviceName,
    hostName,
    device: parser.isMobile ? "Mobile" : parser.isTablet ? "Tablet" : "Desktop",
    browser: `${parser.browser} ${parser.version}` || "Unknown Browser",
    sessionKey: sessionKey,
    os: parser.os,
    loginTime,
  } as ISession);

   await user.save();
  // When new session is created
  

  io.emit("updateDevices", user.sessions); // Send to all connected clients
  res.status(statusCode).json({
    secure: true,
    user,
    accessToken,
  });
};
