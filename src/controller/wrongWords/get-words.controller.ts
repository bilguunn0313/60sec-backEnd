import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "../../utils/prisma";

export const getWords = async (req: Request, res: Response) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  let word = "";
  const { profileId } = req.params;

  try {
    const model = await genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
1–2-р ангийн хүүхдэд тохирох, ойлгомжтой монгол өгүүлбэр зохио.
Шаардлагууд:
- Өгүүлбэр нь зайгаар тусгаарлагдсан 4–8 үгтэй байх.
- Зөвхөн НЭГ үгийн үсгийг санаатайгаар буруу бич. Буруу бичилт нь зөв үгнээс яг 1 тэмдэгтийн өөрчлөлттэй байх (нэг үсэг НЭМЭХ эсвэл ХАСАХ эсвэл СОЛИХ эсвэл хоёр хөрш тэмдэгтийг СОЛИХ).
- Бусад бүх үг зөв бичигдсэн байх.
- Буруу бичсэн үг өгүүлбэрт яг 1 удаа орно.
- Зөв бичвэр (correctWord) нь буруу үгийн зөв хэлбэр бөгөөд өгүүлбэрт ОРОХ ЁСГҮЙ.
- wrongWord ≠ correctWord, мөн wrongWord нь sentence-д байна, correctWord нь sentence-д байхгүй.
- Жижиг үсгээр бич (uppercase ашиглахгүй), тусгай тэмдэг, emoji бүү ашигла.
- Өмнөх жишээнүүдийг ДАВТАХГҮЙ, шинэ өгүүлбэр зохио.

{
  "sentence": "...",
  "words": ["...", "..."],
  "wrongWord": "...",
  "correctWord": "..."
}
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
    word = response.text().trim();

    const match = word.match(/{[\s\S]+}/);
    if (!match) {
      throw new Error("AI JSON format алга");
    }

    const json = JSON.parse(match[0]);

    const wrongWords = await prisma.wrongWord.create({
      data: {
        words: word,
        isCorrect: false,
        correctAnswer: json.wrongWord,
        profile: {
          connect: { id: Number(profileId) },
        },
      },
    });

    res.json({
      words: json.words,
      sentence: json.sentence,
      wrongWordId: wrongWords.id,
      correctAnswer: json.correctWord,
      wrongWord: json.wrongWord,
      success: true,
    });
  } catch (err) {
    console.error("AI генераци алдаа:", err);
    res.status(500).json({ message: "Өгүүлбэр үүсгэхэд алдаа гарлаа." });
  }
};
