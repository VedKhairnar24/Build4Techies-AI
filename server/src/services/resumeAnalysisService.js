const { Cerebras } = require("@cerebras/cerebras_cloud_sdk");

const client = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
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

  const response = await client.chat.completions.create({
    model: "llama3.1-8b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = response.choices[0].message.content;

  try {
    const cleanContent = content.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanContent);
  } catch (error) {
    console.error("JSON parse error from Cerebras:", error);
    return {
      atsScore: 0,
      strengths: [],
      weaknesses: [],
      suggestions: [],
    };
  }
};

module.exports = {
  analyzeResume,
};
