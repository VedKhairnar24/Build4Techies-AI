const GitHubAnalysis = require("../models/GitHubAnalysis");
const parseAIResponse = require("../utils/parseAIResponse");

const {
  getGitHubProfile,
} = require("../services/githubService");

const {
  analyzeGitHubProfileWithAI,
} = require("../services/aiService");

const analyzeGitHub = async (req, res) => {
  const { githubUsername } = req.body;

  if (!githubUsername) {
    return res.status(400).json({ success: false, message: "GitHub username is required" });
  }

  let githubData;
  try {
    githubData = await getGitHubProfile(githubUsername);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: "GitHub profile not found"
      });
    }
    throw error;
  }

  // Calculate metrics locally
  const languages = new Set();
  let stars = 0;
  
  githubData.repos.forEach(repo => {
    if (repo.language) languages.add(repo.language);
    stars += repo.stargazers_count || 0;
  });

  const simplifiedData = {
    profile: {
      public_repos: githubData.profile.public_repos,
      followers: githubData.profile.followers,
      following: githubData.profile.following,
      created_at: githubData.profile.created_at,
      bio: githubData.profile.bio,
    },
    stats: {
      total_stars: stars,
      languages: Array.from(languages),
    },
    repos: githubData.repos.slice(0, 10).map(r => ({
      name: r.name,
      has_readme: true, // simplified, checking actual README requires extra API calls
      description_exists: !!r.description,
      language: r.language,
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
      updated_at: r.updated_at
    })),
  };

  const aiResponse = await analyzeGitHubProfileWithAI(simplifiedData);

  const parsed = parseAIResponse(aiResponse);

  const analysis = await GitHubAnalysis.create({
    user: req.user.id,
    username: githubUsername,
    githubScore: parsed.githubScore || 0,
    analysis: parsed,
  });

  res.status(200).json({
    success: true,
    message: "GitHub analysis generated successfully",
    analysis,
    extraStats: {
      repositories: githubData.profile.public_repos,
      languages: Array.from(languages),
      stars: stars
    }
  });
};

const getGitHubHistory = async (req, res) => {
  const history = await GitHubAnalysis.find({
    user: req.user.id,
  }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    message: "GitHub history fetched",
    history,
  });
};

module.exports = {
  analyzeGitHub,
  getGitHubHistory,
};
