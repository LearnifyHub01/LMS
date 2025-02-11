import { Queue, Worker } from "bullmq";
import { redis } from "../utils/redis";  // ✅ Use single Redis connection
import userModel from "../models/user.model";
import { io } from "../server";

const sessionQueue = new Queue("session-expiry", { connection: redis });  // ✅ Use existing Redis connection

// Worker to process expired sessions
const sessionWorker = new Worker(
  "session-expiry",
  async (job) => {
    try {
      console.log(`🔄 Processing job: ${job.id}`);

      const { userId, sessionKey } = job.data;
      
      const result = await userModel.updateOne(
        { _id: userId },
        { $pull: { sessions: { sessionKey } } }
      );

      console.log(`🔥 Session expired and removed: ${sessionKey}`, result);
      io.emit("logoutSpecificDevice", { sessionKey });

    } catch (err:any) {
      console.error(`❌ Failed to remove session: ${err.message}`);
    }
  },
  { connection: redis }
);

// Listen for errors in the worker
sessionWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err);
});

export { sessionQueue };
