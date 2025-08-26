import { Response } from "express";
import { prisma } from "../../utils/prisma";
import { GetUserAuthInfoRequest } from "../../middleware/jw-verify";

export const updateProfile = async (
  req: GetUserAuthInfoRequest,
  res: Response
) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const { username, avatarImage, age } = req.body;

    const updatedProfile = await prisma.profile.update({
      where: { userId: Number(userId) },
      data: {
        username,
        avatarImage,
        age,
      },
    });

    return res.status(200).json({ success: true, profile: updatedProfile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update profile" });
  }
};

