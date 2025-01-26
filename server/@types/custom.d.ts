import { IUser } from "../models/user.model"; // Adjust path as necessary

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Add the user property to the Request interface
    }
  }
}

export {};