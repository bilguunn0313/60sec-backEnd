import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "../../utils/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export const getLevelTwo = async (req: Request, res: Response) => {
  const { profileId } = req.params;

  try {
    const sentence = await generateSentence();

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
      sentence: sentence,
      readingId: reading.id,
    });
  } catch (err) {
    console.error("AI генераци алдаа:", err);
    res.status(500).json({ message: "Өгүүлбэр үүсгэхэд алдаа гарлаа." });
  }
};

const generateSentence = async () => {
  const prompt = `
3-4-р ангийн монгол хүүхэд уншихад тохирох, ойлгомжтой, хялбар үгтэй нэг өгүүлбэр зохио. 
Өгүүлбэр дор хаяж 18-22 үгтэй байх ёстой. 
Бүх үг жижиг үсгээр бичигдэж, өгүүлбэрийн төгсгөлд зөвхөн нэг цэг тавигдсан байх ёстой. 
Зөвхөн өгүүлбэрийг бич, ямар ч тайлбар, дугаар, нэмэлт текст битгий нэм.`;

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

  return response.text().trim();
};
