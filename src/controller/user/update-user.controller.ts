import { Response, Request } from "express";

import bcrypt from "bcrypt";
import { prisma } from "../../utils/prisma";

export const UpdateUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    if (!user) {
      res.status(400).json({ success: "User not found" });
      return;
    }

    console.log("user update:", user.email);

    const htmlMessage = `
  <div style="font-family: sans-serif; line-height: 1.6;">
    <h2>Hello ${user.username},</h2>
    <p>We wanted to let you know that your profile information was successfully updated.</p>
    <p>If you did not make this change, please contact our support team immediately.</p>
    <hr />
    <p>Thank you for using Buy Me Coffee.</p>
    <strong>— Buy Me Coffee Team</strong>
  </div>
`;

    // await sendEmail(user.email, htmlMessage);

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
