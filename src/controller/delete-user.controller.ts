import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });
    res.status(200).json({ message: `this user ${user} has been deleted` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
