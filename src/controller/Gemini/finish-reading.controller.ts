import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const finishReading = async (req: Request, res: Response) => {
  try {
    const { accuracy, startTime, stopTime, audioUrl } = req.body;
    const { readingId } = req.params;

    const updated = await prisma.reading.update({
      where: { id: Number(readingId) },
      data: {
        audio: audioUrl,
        accuracy,
        startTime,
        endTime: stopTime,
      },
      include: {
        profile: true,
      },
    });

    let scoreValue = 0;
    if (accuracy >= 20) scoreValue = 5;
    if (accuracy >= 50) scoreValue = 10;
    if (accuracy >= 70) scoreValue = 15;

    const score = await prisma.score.create({
      data: {
        profileId: updated.profileId,
        score: scoreValue,
      },
    });

    res.json({ updated, score });
  } catch (err) {
    console.error("Reading дуусгах алдаа:", err);
    res.status(500).json({ message: "Reading дуусгах үед алдаа гарлаа" });
  }
};
