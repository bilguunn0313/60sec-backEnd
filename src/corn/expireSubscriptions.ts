
import { prisma } from "../utils/prisma";
import cron from "node-cron";
export const expireSubscriptions = async () => {
  const now = new Date();

  try {
    const expiredSubs = await prisma.subscription.updateMany({
      where: {
        status: "ACTIVE",
        endDate: { lte: now },
      },
      data: {
        status: "EXPIRED",
      },
    });

    console.log(`Expired subscriptions updated: ${expiredSubs.count}`);
  } catch (error) {
    console.error("Failed to expire subscriptions:", error);
  }
};

export const startExpireCron = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("🔔 Running daily subscription expiry check...");
    await expireSubscriptions();
  });
};
