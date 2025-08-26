import express from "express";
import { getLeaderboard } from "../controller/score/get-leaderboard.controller";

const leaderboardRouter = express.Router();

leaderboardRouter.get("/", getLeaderboard);

export default leaderboardRouter;
