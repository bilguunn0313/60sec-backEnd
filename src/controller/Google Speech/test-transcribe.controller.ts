import { transcribeAudio } from "./audio.controller";
import { Request, Response } from "express";

const testTranscribe = async () => {
  const mockReq = {
    body: { audioFilePath: "voip.wav" },
  } as Request;

  const mockRes = {
    status: function (code: number) {
      (this as any).statusCode = code;
      return this;
    },
    json: function (data: any) {
      console.log("Response:", data);
      return data;
    },
    statusCode: 200,
  } as unknown as Response;

  await transcribeAudio(mockReq, mockRes);
};

testTranscribe();
