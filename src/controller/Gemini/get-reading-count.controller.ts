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

    console.log("totalDurationMs");

    const totalDurationMs = readings.reduce((sum, reading) => {
      console.log("=====>", reading.startTime, reading.endTime);

      if (reading.startTime && reading.endTime) {
        return (
          sum +
          (new Date(reading.endTime).getTime() -
            new Date(reading.startTime).getTime())
        );
      }
      return sum;
    }, 0);

    const totalDurationMinutes = Math.floor(totalDurationMs / 1000);

    //accuracy
    const averageAccuracy =
      readings.length > 0
        ? (
            readings.reduce((acc, curr) => acc + Number(curr.accuracy), 0) /
            readings.length
          ).toFixed(2)
        : "0.00";

    res.json({
      count: readings?.length,
      averageDuration: totalDurationMinutes,
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
