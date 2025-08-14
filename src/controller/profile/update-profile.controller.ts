import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";
 
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const {
      name,
      about,
      avatarImage,
    //   socialMediaURL,
    //   backgroundImage,
    //   successMessage,
    } = req.body;
 
    const { profileId } = req.params;
 
    const profile = await prisma.profile.update({
      where: {
        id: Number(profileId),
      },
      data: {
        name,
        about,
        avatarImage,
      
      },
    });
 
    res.status(200).json({ profile });
 
    
  } catch (error) {
    res.status(500).json({ error });
  }
};