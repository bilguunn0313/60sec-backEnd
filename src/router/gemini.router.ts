import express from "express";

import { getWords } from "../controller/gemini/get-generate-word.controller";
import { checkWords } from "../controller/gemini/post-check-word.controller";

const geminiRouter = express.Router();

geminiRouter.get("/", getWords);
geminiRouter.post("/check-words", checkWords);

export default geminiRouter;
