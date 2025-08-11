import express, { Request, Response } from "express";
import cors from "cors";
import userRouter from "./router/user.router";

const app = express();
const PORT = 4001;
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
