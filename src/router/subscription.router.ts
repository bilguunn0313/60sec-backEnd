import express from "express";
import { getUserSubscriptions } from "../controller/Subscription/get-subscription.controller";
import { createSubscription } from "../controller/Subscription/post-subscription.controller";
import { cancelSubscription } from "../controller/Subscription/put-sub.controller";

const SubscriptionRouter = express.Router();

SubscriptionRouter.post("/", createSubscription);

SubscriptionRouter.get("/user/:userId", getUserSubscriptions);

SubscriptionRouter.put("/:id/cancel", cancelSubscription);

export default SubscriptionRouter;