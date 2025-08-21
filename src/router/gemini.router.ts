import express from "express";
import { getSentence } from "../controller/gemini/get-generate-word.controller";
import { finishReading } from "../controller/gemini/finish-reading.controller";
import { checkWords } from "../controller/gemini/post-check-word.controller";
import { getReadingCount } from "../controller/gemini/get-reading-count.controller";

const geminiRouter = express.Router();

geminiRouter.post("/:profileId", getSentence);
geminiRouter.put("/finish/:readingId", finishReading);
geminiRouter.post("/check-words", checkWords);
geminiRouter.get("/stats/:profileId", getReadingCount);

export default geminiRouter;
