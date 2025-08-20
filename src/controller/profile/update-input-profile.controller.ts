import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const { about, avatarImage, phone, location, birthDate } = req.body;

    const updatedProfile = await prisma.profile.update({
      where: { id: Number(userId) },
      data: {
        about,
        avatarImage,
        phone: phone,
        location,
        birthDate: new Date(birthDate),
      },
    });

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
