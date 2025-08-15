import express from "express";
import { getWords } from "../controller/Gemini/get-generate-word.controller";
import { finishReading } from "../controller/Gemini/finish-reading.controller";
import { checkWords } from "../controller/Gemini/post-check-word.controller";
import { getReadingCount } from "../controller/Gemini/get-reading-count.controller";


const geminiRouter = express.Router();

geminiRouter.post("/:profileId", getWords);
geminiRouter.put("/finish/:readingId", finishReading);
geminiRouter.post("/check-words", checkWords);
geminiRouter.get("/count/:profileId", getReadingCount);

export default geminiRouter;
