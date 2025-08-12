import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createSubscription = async (req: Request, res: Response) => {
  const { userId, planId } = req.body;

  try {
    const activeSub = await prisma.subscription.findFirst({
      where: { userId, status: "ACTIVE" },
    });

    if (activeSub) {
      return res.status(400).json({ message: "User already has an active subscription" });
    }

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        planId,
        status: "ACTIVE",
        startDate: new Date(),
      },
      include: { plan: true },
    });

    res.status(201).json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Subscription creation failed" });
  }
};