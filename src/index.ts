import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 4001;
app.use(express.json());
app.use(cors());

app.get("/hello", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello, World!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
