import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const createActivity = async (req: Request, res: Response) => {
  const { duration, gameType } = req.body;
  const { userId } = req.params;

  try {
    const activity = await prisma.activity.create({
      data: {
        gameType,
        duration,
        userId: Number(userId),
      },
    });
    res.status(200).json({ activity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Activity хадгалахад алдаа гарлаа" });
  }
};
