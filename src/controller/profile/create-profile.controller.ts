import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";

export const createProfile = async (req: Request, res: Response) => {
  const { username, avatarImage, age } = req.body;
  const { userId } = req.params;

  try {
    // 🧠 Утга шалгах
    if (username === undefined || username === null || username.trim() === "") {
      return res.status(400).json({ error: "Username is required" });
    }

    if (age === undefined || age === null || isNaN(Number(age))) {
      return res.status(400).json({ error: "Age is required and must be a number" });
    }

    const userProfile = await prisma.profile.create({
      data: {
        username,
        avatarImage,
        age: Number(age),
        userId: Number(userId),
      },
    });

    const { id } = userProfile;

    await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        profileId: id,
      },
    });

    res.status(200).json({ userProfile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User profile already created", error });
  }
};
