import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // profile id
    console.log("req.params:", req.params);


    const { phone, location, birthDate } = req.body;

    const updatedProfile = await prisma.profile.update({
      where: { id: Number(id) },
      data: {
        phone: phone || undefined,
        location,
        birthDate: birthDate ? new Date(birthDate) : null,
      },
    });

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("❌ Profile update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
