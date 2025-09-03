import express from "express";
import cors from "cors";
import userRouter from "./router/user.router";
import geminiRouter from "./router/gemini.router";

import profileRouter from "./router/profile.router";

import speechRouter from "./router/speech.router";
import dotenv from "dotenv";
import SubscriptionRouter from "./router/subscription.router";
import PlanRouter from "./router/plan.router";
import { startExpireCron } from "./corn/expireSubscriptions";
import wrongWordRouter from "./router/wrongWord.router";
import leaderboardRouter from "./router/leaderboard.router";

dotenv.config();

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000", // Frontend URL
};

const app = express();
app.use(cors(corsOptions));

const PORT = 4001;

app.use(express.json());

app.use("/auth", userRouter);

app.use("/gemini", geminiRouter);

app.use("/profile", profileRouter);

app.use("/speech", speechRouter);

app.use("/subscriptions", SubscriptionRouter);

app.use("/wrong", wrongWordRouter);

app.use("/plan", PlanRouter);

app.use("/leaderboard", leaderboardRouter);
startExpireCron();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
