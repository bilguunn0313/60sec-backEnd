import express from "express";

import { createActivity } from "../controller/activity/create-activity.controller";
import { getFindErrorStats } from "../controller/activity/get-findError-stats.controller";
import { getReadingStats } from "../controller/activity/get-reading-stats.controller";

const activityRouter = express.Router();

activityRouter.post("/stats/:userId", createActivity);
activityRouter.get("/find-error/:userId", getFindErrorStats);
activityRouter.get("/reading/:userId", getReadingStats);

export default activityRouter;
