import express from "express";
import { createProfile } from "../controller/profile/create-profile.controller";

import { getUserProfile } from "../controller/profile/get-profile-by-user.controller";
// import { updateProfile } from "../controller/profile/update-profile.controller";
import { authenticateToken } from "../middleware/jw-verify";
import { currentUser } from "../controller/profile/get-profile-current-user.controller";
import { updateProfile } from "../controller/profile/update-profile.controller";

const profileRouter = express.Router();

profileRouter.post("/create/:userId", createProfile);

profileRouter.get("/get/:user", getUserProfile);

profileRouter.put("/update:userId", updateProfile);

profileRouter.get("/current-user", authenticateToken, currentUser);


export default profileRouter;
