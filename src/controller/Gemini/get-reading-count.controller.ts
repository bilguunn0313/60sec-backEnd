import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const getReadingCount = async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;

    const { startOfWeek, endOfWeek } = getStartAndEnd();

    const readings = await prisma.reading.findMany({
      where: {
        profileId: Number(profileId),
        NOT: {
          endTime: null,
        },
        endTime: {
          gte: startOfWeek,
          lte: endOfWeek,
        },
      },
    });

    const totalDurationMs = readings.reduce((sum, reading) => {
      if (reading.startTime && reading.endTime) {
        return (
          sum +
          (new Date(reading.endTime).getTime() -
            new Date(reading.startTime).getTime())
        );
      }
      return sum;
    }, 0);

    const totalDurationMinutes = totalDurationMs / 1000 / 60;

    const averageAccuracy = readings.reduce(
      (acc, curr) => acc + Number(curr.accuracy),
      0
    );

    res.json({
      count: readings?.length,
      averageDuration: totalDurationMinutes.toFixed(2),
      averageAccuracy,
    });
  } catch (err) {
    console.error("Reading тоо авах алдаа:", err);
    res.status(500).json({ message: "Reading тоо авах үед алдаа гарлаа" });
  }
};

const getStartAndEnd = () => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return {
    startOfWeek,
    endOfWeek,
  };
};
