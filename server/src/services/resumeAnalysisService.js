const { Cerebras } = require("@cerebras/cerebras_cloud_sdk");
const env = require("../config/env");
const parseAIResponse = require("../utils/parseAIResponse");

const client = new Cerebras({
  apiKey: env.CEREBRAS_API_KEY,
});

const analyzeResume = async (resumeText) => {
  const prompt = `
Analyze this resume.

Return ONLY strict JSON.

{
  "atsScore": number,
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

Resume:

${resumeText}
`;

  try {
    const response = await client.chat.completions.create({
      model: env.CEREBRAS_MODEL || "llama3.1-8b",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.choices[0].message.content;
    return parseAIResponse(content);
  } catch (error) {
    console.error("Cerebras Error:", error);
    throw error;
  }
};

module.exports = {
  analyzeResume,
};
