import express from "express";

import { transcribeAudio } from "../controller/Google Speech/audio.controller";

const speechRouter = express.Router();

speechRouter.post("/transcribe", transcribeAudio);

export default speechRouter;
