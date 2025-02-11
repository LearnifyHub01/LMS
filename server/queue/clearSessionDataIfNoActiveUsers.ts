import { redis } from "../utils/redis";

async function clearSessionDataIfNoActiveUsers() {
  const sessionKeys = await redis.keys("session:*");
  
  if (sessionKeys.length === 0) {
    console.log("No active user sessions. Clearing session-related data...");
    const keysToDelete = await redis.keys("bull:session-expiry:*"); // Get BullMQ session-related keys
    if (keysToDelete.length > 0) {
      await redis.del(...keysToDelete);
      console.log("Cleared session-related BullMQ data.");
    }
  }
}

export default clearSessionDataIfNoActiveUsers