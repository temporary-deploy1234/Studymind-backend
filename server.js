import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI({ apiKey: "AIzaSyDcQhxsfVOL5qtYNfbBXEyeTxFMoSv01mc" });

app.post("/analyze", async (req, res) => {
  try {
    const userData = req.body;

    // Get the model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest"
    });

    // Generate content
    const result = await model.generate({
      prompt: `
Analyze this student's study habits:
${JSON.stringify(userData)}

Give:
- Strengths
- Weaknesses
- Procrastination pattern
- Memory improvement plan
- Personalized study plan
- Daily schedule (morning/evening)
- Weekly timetable
      `,
      temperature: 0.7
    });

    // The text is inside result.output_text
    res.json({ reply: result.output_text });
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
