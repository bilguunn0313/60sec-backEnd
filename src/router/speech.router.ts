import express from "express";
import { transcribeAudio } from "../controller/google/audio.controller";

const speechRouter = express.Router();

speechRouter.post("/transcribe", transcribeAudio);

export default speechRouter;
