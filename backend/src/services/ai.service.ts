import { ai } from "../config/ai";
import { IGenerateRoadmapBody } from "../types";

export const generateRoadmapWithAI = async ({
  targetRole,
  currentSkills,
  experienceLevel,
}: IGenerateRoadmapBody) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API key is missing");
    }
    const prompt = `
You are an expert career mentor and roadmap generator.

Based on the user's target role, current skills, and experience level, generate a detailed career roadmap.

Rules:

1. Return ONLY valid JSON.
2. Do not include markdown.
3. Do not include explanations outside JSON.
4. The roadmap should be practical, beginner-friendly, and ordered from fundamentals to advanced concepts.
5. Include learning topics, project suggestions, and estimated duration.
6. If the user already knows some skills, avoid repeating them unnecessarily.
7. Generate between 6 and 12 roadmap steps.

User Input:
Target Role: ${targetRole}
Current Skills: ${currentSkills}
Experience Level: ${experienceLevel}

Return JSON in exactly this format:

{
"targetRole": "string",
"experienceLevel": "string",
"roadmap": [
{
"step": 1,
"title": "string",
"description": "string",
"estimatedDuration": "string",
"resources": ["string", "string"],
"projectSuggestion": "string"
}
]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    const text = response.text;

    if (!text) {
      throw new Error("Empty response received from AI");
    }

    const cleanedResponse = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      return JSON.parse(cleanedResponse);
    } catch {
      throw new Error("AI returned invalid JSON format");
    }
  } catch (error: any) {
    console.dir(error, { depth: null });

    let apiMessage = "Failed to generate roadmap";

    try {
      const parsed = JSON.parse(error.message);

      apiMessage = parsed?.error?.message || parsed?.message || apiMessage;
    } catch {
      apiMessage = error?.message || apiMessage;
    }

    console.error("AI Service Error:", apiMessage);

    throw new Error(apiMessage);
  }
};
