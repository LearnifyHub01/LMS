import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
require('dotenv').config()
import jwt from 'jsonwebtoken';
import { Session } from "inspector/promises";

const emailRegexPattern: RegExp =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  export interface ISession extends Document {
    refreshToken:string,
    ipAddress:string,
    device:string,
    deviceName:string
    hostName:string
    browser:string,
    os:string,
    sessionKey:string
    loginTime:Date,
  }
  
  const SessionSchema : Schema<ISession> =new mongoose.Schema({
    refreshToken: { type: String, required: true },
    ipAddress: { type: String, required: true },
    device: { type: String, required: true },
    browser:{type: String, required: true },
    deviceName: { type: String, required: true, default: "Unknown Device" },  // ✅ Default value
    hostName: { type: String, required: true, default: "Unknown Host" },
    os:{type: String, required: true },
    sessionKey:{type: String, required: true},
    loginTime: { type: Date, default: Date.now,expires:'7d' }
  })
export interface IUser extends Document {
  _id:string
  name: string;
  email: string;
  password: string;
  refreshToken:string
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  sessions: ISession[]
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: ()=>string;
  SignRefreshToken:()=>string
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "Please enter a valid Email",
      },
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, "Password Must be 6 Characters"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    sessions: [SessionSchema],
    courses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    
  }]
  },
  { timestamps: true }
);




//Hash Password before saving
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
//sign access token
userSchema.methods.SignAccessToken = function (){
 return jwt.sign({id:this._id},process.env.ACCESS_TOKEN || '',
  {
    expiresIn: "1d",  // Expiry time set to 5 minutes
  }
 )
}

//sign refresh token
userSchema.methods.SignRefreshToken = function (){
  return jwt.sign({id:this._id},process.env.REFRESH_TOKEN || '',
    {
      expiresIn: "3d", // Expiry time set to 3 days
    }
  )
 }


//compare password
userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<IUser> = mongoose.model("user", userSchema);
export default userModel;



// import mongoose, { Document, Model, Schema } from "mongoose";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// require('dotenv').config();

// const emailRegexPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// // Session Interface and Schema
// export interface ISession extends Document {
//   refreshToken: string;
//   ipAddress: string;
//   device: string;
//   deviceName: string;
//   hostName: string;
//   browser: string;
//   os: string;
//   sessionKey: string;
//   loginTime: Date;
// }

// const SessionSchema: Schema<ISession> = new mongoose.Schema({
//   refreshToken: { type: String, required: true },
//   ipAddress: { type: String, required: true },
//   device: { type: String, required: true },
//   browser: { type: String, required: true },
//   deviceName: { type: String, default: "Unknown Device" },
//   hostName: { type: String, default: "Unknown Host" },
//   os: { type: String, required: true },
//   sessionKey: { type: String, required: true },
//   loginTime: { 
//     type: Date, 
//     default: Date.now,
//     expires: '7d' // Automatically remove after 7 days
//   }
// }, { timestamps: true });

// // User Interface
// export interface IUser extends Document {
//   _id: string;
//   name: string;
//   email: string;
//   password: string;
//   avatar: {
//     public_id: string;
//     url: string;
//   };
//   role: "user" | "admin"; // Type safety with union type
//   isVerified: boolean;
//   courses: Array<{ courseId: mongoose.Types.ObjectId }>;
//   sessions: ISession[];
//   comparePassword: (password: string) => Promise<boolean>;
//   signAccessToken: () => string;
//   signRefreshToken: () => string;
// }

// const userSchema: Schema<IUser> = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Please Enter Your Name"],
//       trim: true
//     },
//     email: {
//       type: String,
//       required: [true, "Please Enter Your Email"],
//       validate: {
//         validator: (value: string) => emailRegexPattern.test(value),
//         message: "Please enter a valid Email",
//       },
//       unique: true,
//       lowercase: true,
//       trim: true
//     },
//     password: {
//       type: String,
//       required: [true, "Please Enter Your Password"],
//       minlength: [6, "Password must be at least 6 characters"],
//       select: false
//     },
//     avatar: {
//       public_id: {
//         type: String,
//         default: ""
//       },
//       url: {
//         type: String,
//         default: ""
//       }
//     },
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user"
//     },
//     isVerified: {
//       type: Boolean,
//       default: false
//     },
//     sessions: [SessionSchema],
    // courses: [{
     
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Course"
      
    // }]
//   },
//   { 
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
//   }
// );

// // Hash Password before saving
// userSchema.pre<IUser>("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   try {
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
//   } catch (error: any) {
//     next(error);
//   }
// });

// // Sign Access Token
// userSchema.methods.signAccessToken = function (): string {
//   return jwt.sign(
//     { id: this._id },
//     process.env.ACCESS_TOKEN || "",
//     { expiresIn: "1d" }
//   );
// };

// // Sign Refresh Token
// userSchema.methods.signRefreshToken = function (): string {
//   return jwt.sign(
//     { id: this._id },
//     process.env.REFRESH_TOKEN || "",
//     { expiresIn: "3d" }
//   );
// };

// // Compare Password
// userSchema.methods.comparePassword = async function (
//   enteredPassword: string
// ): Promise<boolean> {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // Create and export model
// const userModel: Model<IUser> = mongoose.model("User", userSchema);
// export default userModel;
