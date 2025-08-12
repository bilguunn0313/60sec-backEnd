import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../utils/prisma";

export const createUser = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const checkUserName = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (checkUserName) {
      res.status(500).json({ message: "Username has been taken" });
      return;
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    const isMatch = bcrypt.compare(password, user.password ?? "");

    if (await isMatch) {
      const data = { userId: user.id, email: user.email };

      const secret = process.env.SECRET!;

      const hour = Math.floor(Date.now() / 1000) + 60 * 60;

      const accessToken = jwt.sign({ exp: hour, data }, secret as string);

      return res.status(200).json({ success: true, accessToken });
    } else {
      return res.status(400).json({ message: "Password mismatch" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};
