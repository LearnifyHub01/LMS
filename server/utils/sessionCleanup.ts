import cron from "node-cron";
import UserModel from "../models/user.model";
import { io } from "../server";

// Session expiration time (1 minute for testing)
const SESSION_EXPIRATION_MS =  7 * 24 * 60 * 60 * 1000;

// Run the cron job every minute
cron.schedule("* * * * *", async () => {
 // console.log("🔄 Running session cleanup cron job...");

  const now = Date.now(); // Get current timestamp in milliseconds

  // Find users with expired sessions
  const users = await UserModel.find({ "sessions.loginTime": { $exists: true } });

  for (const user of users) {
    const expiredSessions = user.sessions.filter((session) => {
      const sessionExpiryTime = new Date(session.loginTime).getTime() + SESSION_EXPIRATION_MS;
      return sessionExpiryTime < now; // Check if session is expired
    });

    if (expiredSessions.length > 0) {
     // console.log(`🚨 Expired sessions found for user: ${user._id}`);

      // Remove expired sessions from DB using `$pull`
      await UserModel.updateOne(
        { _id: user._id },
        { $pull: { sessions: { loginTime: { $lt: new Date(now - SESSION_EXPIRATION_MS) } } } }
      );

      // Emit logout event for each expired session
      expiredSessions.forEach((session) => {
        io.emit("logoutSpecificDevice", { sessionKey: session.sessionKey });
       // console.log(`📡 Auto-logout emitted for session: ${session.sessionKey}`);
      });
    }
  }

  //console.log("✅ Session cleanup completed.");
});
