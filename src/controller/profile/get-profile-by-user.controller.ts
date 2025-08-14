import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";
 
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
 
    if (!username) {
      res.status(400).json({ message: "Username oruulna uu" });
      return;
    }
 
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

 
    if (!user) {
      res.status(400).json({ message: "User not found." });
      return;
    }
 
    if (!user?.profileId) {
      res.status(400).json({ message: "User profile not found." });
      return;
    }
 
    const userProfile = await prisma.profile.findUnique({
      where: {
        id: Number(user?.profileId),
      },
    });
 
    res.status(200).json({ userProfile: userProfile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}; 