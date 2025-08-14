import express from "express";

import { getWords } from "../controller/gemini/get-generate-word.controller";
import { checkWords } from "../controller/gemini/post-check-word.controller";
import { finishReading } from "../controller/gemini/finish-reading.controller";

const geminiRouter = express.Router();

geminiRouter.post("/", getWords);
geminiRouter.post("/finish", finishReading);
geminiRouter.post("/check-words", checkWords);

export default geminiRouter;
