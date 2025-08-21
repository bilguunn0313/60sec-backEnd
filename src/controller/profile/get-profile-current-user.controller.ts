// controller/profile/get-profile-current-user.controller.ts
import { Response } from "express";
import { prisma } from "../../utils/prisma";
import { GetUserAuthInfoRequest } from "../../middleware/jw-verify";

export const currentUser = async (
  req: GetUserAuthInfoRequest,
  res: Response
) => {
  const user = req.user;
  console.log(user);
  // Check if user exists from middleware

  // Now checks for the nested structure
  if (!user || !user.id || !user.email) {
    return res.status(401).json({
      message: "Unauthorized: User not authenticated",
    });
  }

  try {
    const foundedUser = await prisma.user.findFirst({
      where: { id: Number(user.id) },
      select: {
        id: true,
        email: true,
        profile: true,
        profileId: true,
        // role: true,
        // Add other fields you want to return, exclude sensitive data like password
        // createdAt: true,
        // updatedAt: true,
      },
    });

    if (!foundedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user: foundedUser,
    });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};
