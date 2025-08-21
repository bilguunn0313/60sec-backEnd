import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const getAllSubscriptions = async (req: Request, res: Response) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      include: { 
        user: { select: { id: true, username: true, email: true } },
        plan: true 
      },
      orderBy: { createdAt: "desc" }
    });

    const countByUser = subscriptions.reduce((acc, sub) => {
      const userId = sub.userId;
      if (!acc[userId]) acc[userId] = 0;
      acc[userId]++;
      return acc;
    }, {} as Record<number, number>);

    res.json({ subscriptions, countByUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get all subscriptions" });
  }
};
