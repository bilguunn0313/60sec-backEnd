import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";
function calculateEndDate(startDate: Date, interval: string): Date {
  const endDate = new Date(startDate);

  switch (interval) {
    case "MONTHLY":
      endDate.setMonth(endDate.getMonth() + 1);
      break;
    case "THREE_MONTHS":
      endDate.setMonth(endDate.getMonth() + 3);
      break;
    case "YEARLY":
      endDate.setFullYear(endDate.getFullYear() + 1);
      break;
    default:
      throw new Error("Unknown plan interval");
  }

  return endDate;
}

export const createSubscription = async (req: Request, res: Response) => {
  let { userId, planId } = req.body;

  try {
    userId = Number(userId);
    planId = Number(planId);

    if (isNaN(userId) || isNaN(planId)) {
      return res.status(400).json({ message: "userId and planId must be numbers" });
    }

    const activeSub = await prisma.subscription.findFirst({
      where: { userId, status: "ACTIVE" },
    });

    if (activeSub) {
      return res.status(400).json({ message: "User already has an active subscription" });
    }

    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const startDate = new Date();
    const endDate = calculateEndDate(startDate, plan.interval);

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        planId,
        status: "ACTIVE",
        startDate,
        endDate,
      },
      include: { plan: true },
    });

    return res.status(201).json(subscription);
  } catch (error) {
    console.error("Subscription creation error:", error);
    return res.status(500).json({ message: "Subscription creation failed" });
  }
};
