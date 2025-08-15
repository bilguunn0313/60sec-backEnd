import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Plan interval enum type
type PlanInterval = |"MONTHLY" | "THREE_MONTHS" | "YEARLY" | "FREE";

export const createPlan = async (req: Request, res: Response) => {
  try {
    const { name, price, interval } = req.body;

    // Validation
    if (!name || typeof name !== "string") {
      return res.status(400).json({ message: "Plan name is required and must be a string" });
    }

    if (!price || isNaN(Number(price))) {
      return res.status(400).json({ message: "Price is required and must be a number" });
    }

    const validIntervals: PlanInterval[] = ["MONTHLY", "THREE_MONTHS", "YEARLY","FREE"];
    if (!interval || !validIntervals.includes(interval)) {
      return res.status(400).json({ message: "Invalid interval value" });
    }

    // Create plan in database
    const plan = await prisma.plan.create({
      data: {
        name: name.trim(),
        price: Number(price),
        interval,
      },
    });

    return res.status(201).json(plan);
  } catch (error) {
    console.error("Plan creation error:", error);
    return res.status(500).json({ message: "Failed to create plan", error: error instanceof Error ? error.message : error });
  }
};
