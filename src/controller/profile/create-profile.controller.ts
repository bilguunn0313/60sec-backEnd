import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";

export const createProfile = async (req: Request, res: Response) => {
  const { name, about, avatarImage } = req.body;

  const { userId } = req.params;

  try {
    if (!avatarImage || !about || !name) {
      res.status(400).json({ error: "Missing fields" });
      return;
    }

    const userProfile = await prisma.profile.create({
      data: {
        name,
        about,
        avatarImage,

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
