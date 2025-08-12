import express from "express";

import { getWords } from "../controller/Gemini/get-generate-word.controller";
import { checkWords } from "../controller/Gemini/post-check-word.controller";

const geminiRouter = express.Router();

geminiRouter.get("/", getWords);
geminiRouter.post("/check-words", checkWords);

export default geminiRouter;
