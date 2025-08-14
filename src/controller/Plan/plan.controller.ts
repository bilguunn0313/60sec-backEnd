import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPlan = async (req: Request, res: Response) => {
  try {
    const { name, price, interval } = req.body;

    const validIntervals = ["MONTHLY", "THREE_MONTHS", "YEARLY"];
    if (!validIntervals.includes(interval)) {
      return res.status(400).json({ message: "Invalid interval value" });
    }

    const plan = await prisma.plan.create({
      data: {
        name,
        price: Number(price),
        interval,
      },
    });

    return res.status(201).json(plan);
  } catch (error) {
    console.error("Plan creation error:", error);
    return res.status(500).json({ message: "Failed to create plan" });
  }
};
