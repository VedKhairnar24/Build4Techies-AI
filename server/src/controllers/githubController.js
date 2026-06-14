const GitHubAnalysis = require("../models/GitHubAnalysis");

const {
  getGitHubProfile,
} = require("../services/githubService");

const {
  analyzeGitHubProfileWithAI,
} = require("../services/aiService");

const parseAIResponse = require("../utils/parseAIResponse");

const analyzeGitHub = async (req, res) => {
  try {
    const { githubUsername } = req.body;

    const githubData = await getGitHubProfile(githubUsername);

    const simplifiedData = {
      profile: {
        public_repos: githubData.profile.public_repos,
        followers: githubData.profile.followers,
        bio: githubData.profile.bio,
      },
      repos: githubData.repos.map(r => ({
        name: r.name,
        description: r.description,
        language: r.language,
        stargazers_count: r.stargazers_count,
      })),
    };

    const aiResponse = await analyzeGitHubProfileWithAI(simplifiedData);

    const parsed = parseAIResponse(aiResponse);

    const analysis = await GitHubAnalysis.create({
      userId: req.user.id,
      githubUsername,
      profileData: githubData.profile,
      repositories: githubData.repos,
      aiInsights: parsed,
    });

    res.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getGitHubHistory = async (req, res) => {
  const history = await GitHubAnalysis.find({
    userId: req.user.id,
  }).sort({
    createdAt: -1,
  });

  res.json({
    success: true,
    history,
  });
};

module.exports = {
  analyzeGitHub,
  getGitHubHistory,
};
