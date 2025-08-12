import express from "express";

import { getWords } from "../controller/Gemini/get-generate-word.controller";

const geminiRouter = express.Router();

geminiRouter.get("/", getWords);

export default geminiRouter;
