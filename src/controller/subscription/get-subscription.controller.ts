import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const getUserSubscriptions = async (req: Request, res: Response) => {
  const profileId = Number(req.params.profileId);

  try {
    const subscriptions = await prisma.subscription.findMany({
      where: { profileId },
      include: { plan: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(subscriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get subscriptions" });
  }
};