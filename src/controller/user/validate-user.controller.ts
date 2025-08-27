import { Response } from "express";
import { GetUserAuthInfoRequest } from "../../middleware/jw-verify";

// Controller to handle GET /validate
export const validateToken = (req: GetUserAuthInfoRequest, res: Response) => {
  res.json({
    valid: true,
    user: req.user, // decoded token payload from middleware
  });
};
