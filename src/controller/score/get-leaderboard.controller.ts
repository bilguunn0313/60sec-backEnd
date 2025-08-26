import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const leaderboard = await prisma.profile.findMany({
      select: {
        id: true,
        username: true,
        avatarImage: true,
        score: {
          select: { score: true },
        },
      },
    });

    const result = leaderboard.map((profile) => {
      const totalScore = profile.score.reduce(
        (sum, curr) => sum + curr.score,
        0
      );
      return {
        id: profile.id,
        username: profile.username,
        avatarImage: profile.avatarImage,
        totalScore,
      };
    });

    result.sort((a, b) => b.totalScore - a.totalScore);

    res.status(200).json({ result });
  } catch (error) {}
};
