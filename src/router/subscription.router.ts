import express from "express";
import { getUserSubscriptions } from "../controller/subscription/get-subscription.controller";
import { cancelSubscription } from "../controller/subscription/put.subscription.controller";
import { createSubscription } from "../controller/subscription/post-sub.controller";

const SubscriptionRouter = express.Router();

SubscriptionRouter.post("/creatsub", createSubscription);

SubscriptionRouter.get("/user/:userId", getUserSubscriptions);

SubscriptionRouter.put("/:id/cancel", cancelSubscription);

export default SubscriptionRouter;
