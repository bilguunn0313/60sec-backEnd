import { profile } from "console";
import express from "express";
import { createProfile } from "../controller/profile/create-profile.controller";
import { get } from "http";
import { getUserProfile } from "../controller/profile/get-profile-by-user.controller";
import { updateProfile } from "../controller/profile/update-profile.controller";
// import { deleteProfile } from "../controller/profile/delete-profile.controller";
const profileRouter = express.Router();

profileRouter.post("/create/:userId", createProfile);
profileRouter.get("/:user",getUserProfile);
profileRouter.get("/update",updateProfile);

// profileRouter.delete("/delete",deleteProfile);
export default profileRouter;