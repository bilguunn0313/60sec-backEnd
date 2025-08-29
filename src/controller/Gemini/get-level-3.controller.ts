import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "../../utils/prisma";

export const getLevelThree = async (req: Request, res: Response) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  let sentence = "";
  const { profileId } = req.params;

  try {
    const model = await genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
5-р ангийн монгол хэлний сурах бичигт байдаг шиг энгийн, ойлгомжтой 3 өгүүлбэр зохио. 
Өгүүлбэрүүд нь өдөр тутмын амьдрал, байгаль эсвэл сургуулийн сэдэвтэй байг. 
Өгүүлбэр бүр ойролцоогоор 12-15 үгтэй, бүх үсэг жижигээр бичигдсэн байх. 
Зөвхөн өгүүлбэрүүдийг бич, өөр тайлбар, дугаар, нэмэлт текст бүү нэм.

`;

    const generationConfig = {
      temperature: 1.0,
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
