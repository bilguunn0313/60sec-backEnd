import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const finishReading = async (req: Request, res: Response) => {
  try {
    const { readingId, accuracy } = req.body;

    const updated = await prisma.reading.update({
      where: { id: readingId },
      data: {
        endTime: new Date(),
        accuracy,
      },
    });

    res.json({ updated });
  } catch (err) {
    console.error("Reading дуусгах алдаа:", err);
    res.status(500).json({ message: "Reading дуусгах үед алдаа гарлаа" });
  }
};
