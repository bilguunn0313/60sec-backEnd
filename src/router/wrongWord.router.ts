import express from "express";
import { getWords } from "../controller/wrongWords/get-words.controller";

const wrongWordRouter = express.Router();

wrongWordRouter.post("/:profileId", getWords);

export default wrongWordRouter;
