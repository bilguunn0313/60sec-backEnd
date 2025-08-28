import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const getLeaderboard = async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    const profiles = await prisma.profile.findMany({
      select: {
        id: true,
        username: true,
        avatarImage: true,
        score: {
          select: { score: true },
        },
      },
    });

    const leaderboard = profiles.map((profile) => {
      return {
        ...profile,
        isCurrentUser: profile.id === Number(userId),
      };
    });

    const result = leaderboard.map((profile) => {
      const totalScore = profile.score.reduce(
        (sum, curr) => sum + curr.score,
        0
      );

      return {
        ...profile,
        totalScore,
      };
    });

    result.sort((a, b) => b.totalScore - a.totalScore);

    res.status(200).json({ result });
  } catch (error) {}
};
