import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const getReadingCount = async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;
    const count = await prisma.reading.count({
      where: { profileId: Number(profileId) },
    });
    res.json({ count });
  } catch (err) {
    console.error("Reading тоо авах алдаа:", err);
    res.status(500).json({ message: "Reading тоо авах үед алдаа гарлаа" });
  }
};
