import express from "express";
import { createPlan } from "../controller/Plan/plan.controller";
const PlanRouter = express.Router();
PlanRouter.post("/", createPlan);
export default PlanRouter;
