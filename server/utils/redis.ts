// import { Redis } from "ioredis";
// import dotenv from "dotenv";

// dotenv.config();

// let redis: Redis;

// try {
//   const redisUrl = process.env.REDIS_URL;

//   if (!redisUrl) {
//     throw new Error("Redis Connection Failed: REDIS_URL environment variable is missing.");
//   }

//   // Optional: Decode the URL if it's encoded
//   const decodedRedisUrl = decodeURIComponent(redisUrl);

//   console.log(`Connecting to Redis at: ${decodedRedisUrl}`);

//   redis = new Redis(decodedRedisUrl);

//   // Event listeners for better error handling
//   redis.on("connect", () => {
//     console.log("Redis connected successfully!");
//   });

//   redis.on("error", (err) => {
//     console.error("Redis connection error:", err);
//   });

// } catch (error:any) {
//   console.error(error.message);
//   console.log("error")
//   process.exit(1); // Exit the process if Redis connection fails
// }

// export { redis };
// import { Redis } from "ioredis";
// import dotenv from "dotenv";

// dotenv.config();

// const redisUrl = process.env.REDIS_URL;

// if (!redisUrl) {
//   throw new Error("REDIS_URL is missing from environment variables.");
// }


// const redis = new Redis(redisUrl, {
//   tls: {
//     rejectUnauthorized: false, // Allow insecure SSL connections for testing
//   },
//   connectTimeout: 15000, // Increase timeout
//   maxRetriesPerRequest: 3, // Limit retries
// });

// redis.on("connect", () => console.log(" Redis connected successfully!"));
// redis.on("error", (err) => console.error(" Redis connection error:", err));

// export { redis };
// import { Redis } from "ioredis";
// import dotenv from "dotenv";

// dotenv.config();

// const redisUrl = process.env.REDIS_URL;

// if (!redisUrl) {
//   throw new Error("REDIS_URL is missing from environment variables.");
// }

// const redis = new Redis(redisUrl, {
//   maxRetriesPerRequest: null,
// });

// redis.on("connect", () => console.log("✅ Redis connected successfully!"));
// redis.on("error", (err) => console.error("❌ Redis connection error:", err));

// export { redis };

import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("❌ REDIS_URL is missing from environment variables.");
}

const redis = new Redis(redisUrl, {
  retryStrategy: (times) => Math.min(times * 50, 2000), // Exponential backoff
  maxRetriesPerRequest: 5, // Limit retries to prevent endless loops
});

redis.on("connect", () => console.log("✅ Redis connected successfully!"));
redis.on("error", (err) => console.error("❌ Redis connection error:", err));

export { redis };
