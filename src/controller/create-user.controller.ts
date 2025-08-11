import { Response, Request } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { prisma } from "../utils/prisma";

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(req.body);

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      res.status(400).json({ message: "User profile already created" });
      return;
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const data = {
      userId: user?.id,
      email: user?.email,
      username: user?.username,
    };

    const secret = process.env.SECRET!;
    const sixHour = Math.floor(Date.now() / 1000) * 6 * 60 * 60;

    const signUpUserAccessToken = jwt.sign({ exp: sixHour, data }, secret);

    res.status(200).json({ signUpUserAccessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
