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

  try {
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

    const cleanContent = content.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanContent);
  } catch (error) {
    console.error("Cerebras Error:", error);
    throw error;
  }
};

module.exports = {
  analyzeResume,
};
