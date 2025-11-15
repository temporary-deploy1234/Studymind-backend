import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

// Insert your NEW API key here
const genAI = new GoogleGenerativeAI(process.env.API_KEY || "AIzaSyAKoXcGU2xfCM1kGpgnUwpYo9zsWbjyhuo");

app.post("/analyze", async (req, res) => {
  try {
    const userData = req.body;

    // Correct supported model for v1beta API
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest"
    });

    const prompt = `
    Analyze this student's study habits:
    ${JSON.stringify(userData)}

    Provide:
    - Strengths
    - Weaknesses
    - Procrastination pattern
    - Memory improvement plan
    - Personalized study plan
    - Daily schedule (morning/evening)
    - Weekly timetable
    `;

    const result = await model.generateText(prompt);

    const response = result.response.text();

    res.json({ reply: response });

  } catch (err) {
    console.error("ERROR:", err.message);
    res.json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));


