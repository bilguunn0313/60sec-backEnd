import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const getUserSubscriptions = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  try {
    const subscriptions = await prisma.subscription.findMany({
      where: { userId },
      include: { plan: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(subscriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get subscriptions" });
  }
};