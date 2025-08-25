import express from "express";
import { createSubscription } from "../controller/subscription/post-subscription.controller";
import { getUserSubscriptions } from "../controller/subscription/get-subscription.controller";
import { getAllSubscriptions } from "../controller/subscription/getAll-subscription.controller";
import { cancelSubscription } from "../controller/subscription/put-sub.controller";
import { authenticateToken } from "../middleware/jw-verify";

const SubscriptionRouter = express.Router();

SubscriptionRouter.post("/create", authenticateToken,createSubscription);

SubscriptionRouter.get("/user/:userId", getUserSubscriptions);

SubscriptionRouter.get("/all", getAllSubscriptions);

SubscriptionRouter.put("/:id/cancel", cancelSubscription);

export default SubscriptionRouter;
