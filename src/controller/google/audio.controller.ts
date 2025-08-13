import { Request, Response } from "express";

import fs from "fs";
import speech, { protos } from "@google-cloud/speech";

process.env.GOOGLE_APPLICATION_CREDENTIALS = "codingwithado.json";

export const transcribeAudio = async (
  req: Request,
  res: Response
): Promise<void> => {
  const client = new speech.SpeechClient();

  try {
    const file = fs.readFileSync("voice.wav");
    const audioBytes = file.toString("base64");

    const audio = {
      content: audioBytes,
    };

    const config: protos.google.cloud.speech.v1.IRecognitionConfig = {
      encoding:
        protos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.LINEAR16,
      sampleRateHertz: 48000,
      languageCode: "mn-MN",
    };

    const request: protos.google.cloud.speech.v1.IRecognizeRequest = {
      audio,
      config,
    };

    const [response] = await client.recognize(request);

    if (!response.results || response.results.length === 0) {
      res.status(200).json({ transcript: "" });
      return;
    }

    const transcript = response.results
      .map((result) => result.alternatives?.[0]?.transcript ?? "")
      .join("\n");

    res.json({ transcript });
  } catch (error) {
    console.error("Транскрипцийн алдаа:", error);
    res
      .status(500)
      .json({ error: "Аудио файлыг транскрипц хийхэд алдаа гарлаа" });
  }
};
