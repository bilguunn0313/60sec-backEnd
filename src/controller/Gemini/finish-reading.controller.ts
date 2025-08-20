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
    });

    res.json({ updated });
  } catch (err) {
    console.error("Reading дуусгах алдаа:", err);
    res.status(500).json({ message: "Reading дуусгах үед алдаа гарлаа" });
  }
};
