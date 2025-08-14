import express, { Request, Response } from "express";
import cors from "cors";
import userRouter from "./router/user.router";
import geminiRouter from "./router/gemini.router";

import profileRouter from "./router/profile.router";

import speechRouter from "./router/speech.router";
import dotenv from "dotenv";
import SubscriptionRouter from "./router/subscription.router";
import PlanRouter from "./router/plan.router";
import activityRouter from "./router/activity.router";

dotenv.config();

const app = express();

const PORT = 4001;

app.use(express.json());

app.use(cors());

app.use("/users", userRouter);
app.use("/gemini", geminiRouter);

app.use("/profile",profileRouter);

app.use("/speech", speechRouter);
app.use("/subscriptions", SubscriptionRouter);
app.use("/plan", PlanRouter);
app.use("/activity", activityRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
