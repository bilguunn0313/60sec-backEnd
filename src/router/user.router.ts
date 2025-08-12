import express from "express";

import { getUsers } from "../controller/get-users.controller";
import { UpdateUser } from "../controller/update-user.controller";
import { createUser } from "../controller/create-user.controller";
import { signIn } from "../controller/sign-in.controller";

const userRouter = express.Router();

userRouter.post("/create-user", createUser);

userRouter.get("/", getUsers);

userRouter.put("/update-user/:id", UpdateUser);

userRouter.post("/sign-in", signIn);

export default userRouter;
