import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type DecodedUser = {
  exp: number; // Token expiration

  id: number; // User ID as number
  email: string; // User email

  iat: number; // Token issued at
};

export type GetUserAuthInfoRequest = Request & {
  user?: DecodedUser;
};

export const authenticateToken = (
  req: GetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"] as string;

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    const decoded = verify(token, process.env.SECRET!) as DecodedUser;

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
