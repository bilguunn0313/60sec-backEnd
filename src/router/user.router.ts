import express from "express";

import { getUsers } from "../controller/get-users.controller";
import { UpdateUser } from "../controller/update-user.controller";
import { SignIn } from "../controller/sign-in.controller";
import { createUser } from "../controller/create-user.controller";

const userRouter = express.Router();

userRouter.post("/create-user", createUser);
userRouter.get("/get-users", getUsers);
userRouter.put("/update-user/:id", UpdateUser);
userRouter.post("/sign-in", SignIn);

export default userRouter;
