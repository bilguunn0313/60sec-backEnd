import { Request, Response } from "express";

import path from "path";

import speech, { protos } from "@google-cloud/speech";
import fs from "fs";

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(
  "./secrets/google-credential.json"
);

export const transcribeAudio = async (req: Request, res: Response) => {
  const client = new speech.SpeechClient();
  const { audioFilePath } = req.body;

  if (!audioFilePath) {
    return res.status(400).json({ error: "audioFilePath шаардлагатай" });
  }

  try {
    const file = fs.readFileSync(audioFilePath);
    const audioBytes = file.toString("base64");

    const audio = {
      content: audioBytes,
    };

    const config: protos.google.cloud.speech.v1.IRecognitionConfig = {
      encoding:
        protos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.LINEAR16,
      sampleRateHertz: 16000,
      languageCode: "en-US",
    };

    const request: protos.google.cloud.speech.v1.IRecognizeRequest = {
      audio: audio,
      config: config,
    };

    const responseTuple = await client.recognize(request);
    const response = responseTuple[0];

    if (!response.results) {
      return res.status(200).json({ transcript: "" });
    }

    const transcript = response.results
      .map((result: protos.google.cloud.speech.v1.ISpeechRecognitionResult) =>
        result.alternatives && result.alternatives.length > 0
          ? result.alternatives[0].transcript
          : ""
      )
      .join("\n");

    res.json({ transcript });
  } catch (err) {
    console.error("Транскрипцийн алдаа:", err);
    res
      .status(500)
      .json({ error: "Аудио файлыг транскрипц хийхэд алдаа гарлаа" });
  }
};

// const testTranscribe = async () => {
//   const mockReq = {
//     body: { audioFilePath: "voip.wav" },
//   } as Request;

//   const mockRes = {
//     status: function (code: number) {
//       (this as any).statusCode = code;
//       return this;
//     },
//     json: function (data: any) {
//       console.log("Response:", data);
//       return data;
//     },
//     statusCode: 200,
//   } as unknown as Response;

//   await transcribeAudio(mockReq, mockRes);
//   console.log()
// };

// testTranscribe();
