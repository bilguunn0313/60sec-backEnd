import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "../../utils/prisma";

export const getSentence = async (req: Request, res: Response) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  let sentence = "";
  const { profileId } = req.params;

  try {
    const model = await genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
1-2-р ангийн хүүхдэд зориулсан монгол хэл дээрх 20 үгтэй энгийн, ойлгомжтой өгүүлбэр бичнэ үү.
Бичсэн өгүүлбэр нь хүүхдэд уншихад амархан, энгийн үгнүүдээс бүрдэх ба 20 үгтэй бүгд жижиг байна.
Зөвхөн өгүүлбэр бичнэ үү, тайлбар бичихгүй.
`;

    const generationConfig = {
      temperature: 0.8,
      topK: 40,
      topP: 0.95,
    };

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });
    const response = await result.response;
    sentence = response.text().trim();

    const reading = await prisma.reading.create({
      data: {
        sentences: sentence,
        accuracy: "",
        profile: {
          connect: { id: Number(profileId) },
        },
      },
    });

    res.json({
      sentence,
      readingId: reading.id,
    });
  } catch (err) {
    console.error("AI генераци алдаа:", err);
    res.status(500).json({ message: "Өгүүлбэр үүсгэхэд алдаа гарлаа." });
  }
};
