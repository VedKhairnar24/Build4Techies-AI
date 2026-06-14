const { Cerebras } = require("@cerebras/cerebras_cloud_sdk");
const AI_PROMPTS = require("../constants/aiPrompts");

const client = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

const analyzeResumeWithAI = async (resumeText) => {
  const response = await client.chat.completions.create({
    model: "gpt-oss-120b",
    messages: [
      {
        role: "system",
        content: AI_PROMPTS.RESUME_ANALYSIS,
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
          content: AI_PROMPTS.ROADMAP_GENERATION,
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

const analyzeGitHubProfileWithAI = async (githubData) => {
  const response = await client.chat.completions.create({
    model: "gpt-oss-120b",

    messages: [
      {
        role: "system",
        content: AI_PROMPTS.GITHUB_ANALYSIS,
      },
      {
        role: "user",
        content: JSON.stringify(githubData),
      },
    ],
  });

  return response.choices[0].message.content;
};

module.exports = {
  analyzeResumeWithAI,
  generateRoadmapWithAI,
  analyzeGitHubProfileWithAI,
};
