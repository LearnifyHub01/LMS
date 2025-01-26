import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

let redis: Redis;

try {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    throw new Error("Redis Connection Failed: REDIS_URL environment variable is missing.");
  }

  // Optional: Decode the URL if it's encoded
  const decodedRedisUrl = decodeURIComponent(redisUrl);

  console.log(`Connecting to Redis at: ${decodedRedisUrl}`);

  redis = new Redis(decodedRedisUrl);

  // Event listeners for better error handling
  redis.on("connect", () => {
    console.log("Redis connected successfully!");
  });

  redis.on("error", (err) => {
    console.error("Redis connection error:", err);
  });

} catch (error:any) {
  console.error(error.message);
  process.exit(1); // Exit the process if Redis connection fails
}

export { redis };
