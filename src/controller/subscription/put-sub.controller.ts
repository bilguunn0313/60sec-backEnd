import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const cancelSubscription = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const subscription = await prisma.subscription.update({
      where: { id },
      data: {
        status: "CANCELED",
        endDate: new Date(),
      },
    });

    res.json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to cancel subscription" });
  }
};