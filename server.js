import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI("AIzaSyDcQhxsfVOL5qtYNfbBXEyeTxFMoSv01mc");

app.post("/analyze", async (req, res) => {
  try {
    const userData = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    Analyze this student's study habits:
    ${JSON.stringify(userData)}

    Give:
    - Strengths
    - Weaknesses
    - Procrastination pattern
    - Memory improvement plan
    - Personalized study plan (easy to follow)
    - Daily schedule (morning/evening)
    - Weekly timetable
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ reply: response });
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running"));
