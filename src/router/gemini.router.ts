import express from "express";

import { getWords } from "../controller/gemini/get-generate-word.controller";
import { checkWords } from "../controller/gemini/post-check-word.controller";
import { finishReading } from "../controller/gemini/finish-reading.controller";
import { getReadingCount } from "../controller/gemini/get-reading-count.controller";

const geminiRouter = express.Router();

geminiRouter.post("/:profileId", getWords);
geminiRouter.put("/finish/:readingId", finishReading);
geminiRouter.post("/check-words", checkWords);
geminiRouter.get("/count/:profileId", getReadingCount);

export default geminiRouter;
