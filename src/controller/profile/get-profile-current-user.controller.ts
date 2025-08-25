
import { Response } from "express";
import { prisma } from "../../utils/prisma";
import { GetUserAuthInfoRequest } from "../../middleware/jw-verify";

export const currentUser = async (req: GetUserAuthInfoRequest, res: Response) => {
  const user = req.user;

  if (!user || !user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const foundedUser = await prisma.user.findUnique({
      where: { id: Number(user.id) },
      select: {
        id: true,
        email: true,
        username:true,
        profile: true,  // avatarImage, age, name
      },
    });

    if (!foundedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ success: true, user: foundedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
