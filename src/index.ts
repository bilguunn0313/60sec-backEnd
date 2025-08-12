import express, { Request, Response } from "express";
import cors from "cors";
import userRouter from "./router/user.router";
import geminiRouter from "./router/gemini.router";
import speechRouter from "./router/speech.router";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = 4001;

app.use(express.json());

app.use(cors());

app.use("/users", userRouter);
app.use("/gemini", geminiRouter);
app.use("/speech", speechRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
