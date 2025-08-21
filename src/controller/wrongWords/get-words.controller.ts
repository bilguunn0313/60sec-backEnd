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
1-2-р ангийн хүүхдэд зориулсан монгол хэл дээрх 4-8 үгтэй өгүүлбэр зохио. 
Гэхдээ нэг үгийн үсгийг буруу бич. Ямар ч жишээ бүү давт. Зөвхөн шинэ өгүүлбэр өг. 
Дараах JSON форматаар өг:

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
