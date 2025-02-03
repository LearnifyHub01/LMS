require('dotenv').config()
import {Response} from 'express'
import userModel, { IUser,ISession } from '../models/user.model'
import {redis} from './redis'
import { v4 as uuidv4 } from 'uuid';



interface ITokenOptions{
    expire:Date,
    maxAge:number,
    httpOnly:boolean,
    sameSite:'lax' | 'strict' | 'none' | undefined
    secure?:boolean
}
//parse env var. to integret with fallback values
export const accessTokenExpire =parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300',10)
export const refreshTokenExpire =parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200',10)

export const accessTokenOptions : ITokenOptions ={
    expire : new Date(Date.now()+ accessTokenExpire*60*60 *1000),
    maxAge:accessTokenExpire *60*60*1000,
    httpOnly:true,
    sameSite:'lax'
}

export const refreshTokenOptions : ITokenOptions ={
    expire : new Date(Date.now()+ refreshTokenExpire *24*60*60*1000),
    maxAge:refreshTokenExpire *24*60*60*1000,
    httpOnly:true,
    sameSite:'lax'
}
// export const sendToken = async (user:IUser,statusCode:number,res:Response,userAgent:any,ipAddress:string) =>{
//     const accessToken =user.SignAccessToken()
//     const refreshToken = user.SignRefreshToken()
    
//     // upload session to redis

//     const sessionId = uuidv4();  // Generate unique session ID

//     // Create session data
//     const sessionData = {
//       sessionUser: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         isVerified: user.isVerified,
//       },
//       refreshToken,
//       ipAddress,
//       device: userAgent.ua,
//       loginTime: new Date(),
//     };
    
//     // Store session in Redis using the session key format `session:{userId}:{sessionId}`
//     await redis.set(`session:${user._id}:${sessionId}`, JSON.stringify(sessionData));

  
//       // Cookie settings for secure cookies in production
//       if (process.env.NODE_ENV === 'production') {
//         accessTokenOptions.secure = true;
//       }

    

//     res.cookie("access_token",accessToken,accessTokenOptions)
//     res.cookie('refresh_token',refreshToken,refreshTokenOptions)

    
//     user.sessions.push({
//         refreshToken,
//         ipAddress,
//         device: userAgent.ua,
//         loginTime: new Date(),
//     } as ISession);
//     await user.save();

//     res.status(statusCode).json({
//         secure:true,
//         user,
//         accessToken
//     })

// }

export const sendToken = async (user:IUser,statusCode:number,res:Response,userAgent:any,ipAddress:string) =>{
    const accessToken =user.SignAccessToken()
    const refreshToken = user.SignRefreshToken()
    
    // upload session to redis

    const sessionId = uuidv4();  // Generate unique session ID

    // Create session data
    const sessionData = {
      sessionUser: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
      refreshToken,
      ipAddress,
      device: userAgent.ua,
      loginTime: new Date(),
    };
    
    // Store session in Redis using the session key format `session:{userId}:{sessionId}`
    await redis.set(`session:${user._id}:${sessionId}`, JSON.stringify(sessionData));
    res.cookie('session_id', sessionId, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production', // Set to true in production for secure cookies
      });
  
      // Cookie settings for secure cookies in production
      if (process.env.NODE_ENV === 'production') {
        accessTokenOptions.secure = true;
      }

    

    res.cookie("access_token",accessToken,accessTokenOptions)
    res.cookie('refresh_token',refreshToken,refreshTokenOptions)

    
    user.sessions.push({
        refreshToken,
        ipAddress,
        device: userAgent.ua,
        loginTime: new Date(),
    } as ISession);
    await user.save();

    res.status(statusCode).json({
        secure:true,
        user,
        accessToken
    })

}