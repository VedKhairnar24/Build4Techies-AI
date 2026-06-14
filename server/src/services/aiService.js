const { Cerebras } = require("@cerebras/cerebras_cloud_sdk");

const client = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

const analyzeResumeWithAI = async (resumeText) => {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b",
    messages: [
      {
        role: "system",
        content: `
You are an expert ATS and career advisor.

Return ONLY valid JSON.

Format:

{
  "atsScore": number,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": []
}
`,
      },
      {
        role: "user",
        content: resumeText,
      },
    ],
  });

  return response.choices[0].message.content;
};

module.exports = {
  analyzeResumeWithAI,
};
