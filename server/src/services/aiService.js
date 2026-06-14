const { Cerebras } = require("@cerebras/cerebras_cloud_sdk");

const client = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

const analyzeResumeWithAI = async (resumeText) => {
  const response = await client.chat.completions.create({
    model: "gpt-oss-120b",
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

const generateRoadmapWithAI = async (
  goal,
  skills = []
) => {
  const response =
    await client.chat.completions.create({
      model: "gpt-oss-120b",

      messages: [
        {
          role: "system",
          content: `
Return ONLY valid JSON.

{
  "roadmap": [
    {
      "title":"",
      "description":"",
      "duration":""
    }
  ]
}
`,
        },

        {
          role: "user",
          content: `
Career Goal:
${goal}

Current Skills:
${skills.join(", ")}
`,
        },
      ],
    });

  return response.choices[0].message.content;
};

module.exports = {
  analyzeResumeWithAI,
  generateRoadmapWithAI,
};
