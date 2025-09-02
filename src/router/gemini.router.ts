import express from "express";

import { getWords } from "../controller/wrongWords/get-words.controller";

import { getReadingCount } from "../controller/Gemini/get-reading-count.controller";
import { getSentence } from "../controller/Gemini/get-generate-word.controller";
import { finishReading } from "../controller/Gemini/finish-reading.controller";
import { checkWords } from "../controller/Gemini/post-check-word.controller";
import { getLevelTwo } from "../controller/Gemini/get-level-2.controller";
import { getLevelThree } from "../controller/Gemini/get-level-3.controller";

const geminiRouter = express.Router();

geminiRouter.get("/", getWords);

geminiRouter.post("/:profileId", getSentence);
geminiRouter.put("/finish/:readingId", finishReading);

geminiRouter.post("/check-words", checkWords);

geminiRouter.get("/stats/:profileId", getReadingCount);

geminiRouter.post("/levelTwo/:profileId", getLevelTwo);

geminiRouter.post("/levelThree/:profileId", getLevelThree);

export default geminiRouter;
