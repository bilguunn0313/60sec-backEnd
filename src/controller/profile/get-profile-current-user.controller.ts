import { Response, Request } from "express";
import { GetUserAuthInfoRequest } from "../../middleware/jw-verify";
import { prisma } from "../../utils/prisma";

export const getCurrentProfile = async (req: GetUserAuthInfoRequest, res: Response) => {
  
  try {
    const headerUser = req.user;
    
    if(!headerUser){
      res.status(400).json({message:"Error"});
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: headerUser?.userId },
    });

    if (!user) {
      res.status(400).json({ message: "No user info in request" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};