import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const getReadingStats = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  try {
    const reading = await prisma.activity.aggregate({
      _sum: { duration: true },
      where: {
        userId: Number(userId),
        gameType: "READING",
        createdAt: { gte: sevenDaysAgo },
      },
    });

    res.status(200).json({ readingDuration: reading._sum.duration || 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Статистик гаргахад алдаа гарлаа" });
  }
};
