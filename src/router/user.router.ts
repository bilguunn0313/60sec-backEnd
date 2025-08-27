import express from "express";

import { getUsers } from "../controller/user/get-users.controller";
import { signIn } from "../controller/user/sign-in.controller";
import { createUser } from "../controller/user/create-user.controller";
import { UpdateUser } from "../controller/user/update-user.controller";
import { authenticateToken } from "../middleware/jw-verify";
import { validateToken } from "../controller/user/validate-user.controller";

const userRouter = express.Router();

userRouter.post("/create-user", createUser);

userRouter.get("/", getUsers);

userRouter.put("/update-user/:id", UpdateUser);

userRouter.post("/login", signIn);

userRouter.get("/validate", authenticateToken, validateToken);

export default userRouter;
