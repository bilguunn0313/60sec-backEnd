import express from "express";

import { getUsers } from "../controller/user/get-users.controller";
import { UpdateUser } from "../controller/user/update-user.controller";
import { SignIn } from "../controller/user/sign-in.controller";
import { createUser } from "../controller/user/create-user.controller";

const userRouter = express.Router();

userRouter.post("/create-user", createUser);
userRouter.get("/", getUsers);
userRouter.put("/update-user/:id", UpdateUser);
userRouter.post("/sign-in", SignIn);

export default userRouter;
