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
    const { name, avatarImage, age } = req.body;

    const updatedProfile = await prisma.profile.update({
      where: { userId: Number(user.id) },
      data: {
        name,
        avatarImage,
        age: age ?? 0, // age өгөгдөөгүй бол 0 гэж default
      },
    });

    // Хэрэглэгчийн context-д хэрэгтэй бол user object-д profile update хийнэ
    return res.status(200).json({ success: true, profile: updatedProfile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update profile" });
  }
};
