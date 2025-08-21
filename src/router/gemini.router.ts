import express from "express";
import { getSentence } from "../controller/Gemini/get-generate-word.controller";
import { finishReading } from "../controller/Gemini/finish-reading.controller";
import { checkWords } from "../controller/Gemini/post-check-word.controller";
import { getReadingCount } from "../controller/Gemini/get-reading-count.controller";
import { getWords } from "../controller/wrongWords/get-words.controller";

const geminiRouter = express.Router();

geminiRouter.get("/", getWords);

geminiRouter.post("/:profileId", getSentence);
geminiRouter.put("/finish/:readingId", finishReading);

geminiRouter.post("/check-words", checkWords);

geminiRouter.get("/stats/:profileId", getReadingCount);

export default geminiRouter;
