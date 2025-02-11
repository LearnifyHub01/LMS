import { Worker } from "bullmq";
import { redis } from "../utils/redis";
import userModel from "../models/user.model";

const sessionWorker = new Worker(
  "session-expiration-queue",
  async (job) => {
    const { sessionId } = job.data;
    console.log(`🚀 Processing expired session: ${sessionId}`);

    await userModel.deleteOne({ sessionId });
    console.log(`✅ Session ${sessionId} removed from MongoDB`);
  },
  { connection: redis }
);

sessionWorker.on("completed", (job) => console.log(`🎉 Job completed: ${job.id}`));
sessionWorker.on("failed", (job, err) => console.error(`❌ Job failed: ${err.message}`));
