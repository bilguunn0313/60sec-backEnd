import express from "express";
import { getUserSubscriptions } from "../controller/subscription/get-subscription.controller";
import { createSubscription } from "../controller/subscription/post-subscription.controller";
import { cancelSubscription } from "../controller/subscription/put-sub.controller";

const SubscriptionRouter = express.Router();

SubscriptionRouter.post("/", createSubscription);

SubscriptionRouter.get("/user/:userId", getUserSubscriptions);

SubscriptionRouter.put("/:id/cancel", cancelSubscription);

export default SubscriptionRouter;