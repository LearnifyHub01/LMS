import { Request, Response, NextFunction } from "express";
import { redis } from "../utils/";

const RATE_LIMIT_WINDOW = 60; // 1-minute window
const MAX_REQUESTS = 5; // Limit per window

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ip = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const key = `rate-limit:${ip}`;

    // Atomic INCR and TTL check
    const requests = await redis.incr(key);
    if (requests === 1) {
      await redis.expire(key, RATE_LIMIT_WINDOW);
    }

    if (requests > MAX_REQUESTS) {
      return res.status(429).json({ message: "Too many requests. Please try again later." });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default rateLimiter;
