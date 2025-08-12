import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const checkWords = async (req: Request, res: Response) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const { targetWord, transcript } = req.body as {
    targetWord: string;
    transcript: string;
  };

  if (!targetWord || !transcript) {
    return res
      .status(400)
      .json({ error: "targetWord болон transcript шаардлагатай" });
  }

  try {
    const model = await genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // GPT-д асуух prompt
    const prompt = `
Та хэлний туслах асистент байна.
Бага ангийн хүүхэд дараах үгийг уншжээ: "${transcript}"
Зорилтот үг нь: "${targetWord}"
Хүүхэд үгийг зөв уншсан уу? Тийм эсвэл Үгүй гэж хариулаарай.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text().trim().toLowerCase();

    const correct = answer.startsWith("тийм") || answer.startsWith("yes");

    res.json({ targetWord, transcript, correct, answer });
  } catch (err) {
    console.error("Gemini шалгалтын алдаа:", err);
    res.status(500).json({ error: "AI шалгалт амжилтгүй боллоо" });
  }
};
