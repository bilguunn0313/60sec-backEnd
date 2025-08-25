import { Response } from "express";
import { prisma } from "../../utils/prisma";
import { GetUserAuthInfoRequest } from "../../middleware/jw-verify";

export const updateProfile = async (
  req: GetUserAuthInfoRequest,
  res: Response
) => {
  const user = req.user;

  if (!user || !user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { username, avatarImage, age } = req.body;

    const updatedProfile = await prisma.profile.update({
      where: { userId: Number(user.id) },
      data: {
        username,
        avatarImage,
        age
      },
    });

    // Хэрэглэгчийн context-д хэрэгтэй бол user object-д profile update хийнэ
    return res.status(200).json({ success: true, profile: updatedProfile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update profile" });
  }
};
