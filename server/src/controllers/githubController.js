const GitHubAnalysis = require("../models/GitHubAnalysis");

const {
  getGitHubProfile,
} = require("../services/githubService");

const {
  analyzeGitHubProfileWithAI,
} = require("../services/aiService");

const analyzeGitHub = async (req, res) => {
  try {
    const { githubUsername } = req.body;

    if (!githubUsername) {
      return res.status(400).json({ success: false, message: "GitHub username is required" });
    }

    const githubData = await getGitHubProfile(githubUsername);

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

    let jsonString = aiResponse;
    if (jsonString.includes("```json")) {
      jsonString = jsonString.split("```json")[1].split("```")[0].trim();
    } else if (jsonString.includes("```")) {
      jsonString = jsonString.split("```")[1].split("```")[0].trim();
    }

    const parsed = JSON.parse(jsonString);

    const analysis = await GitHubAnalysis.create({
      user: req.user.id,
      username: githubUsername,
      githubScore: parsed.githubScore || 0,
      analysis: parsed,
    });

    res.json({
      success: true,
      analysis,
      extraStats: {
        repositories: githubData.profile.public_repos,
        languages: Array.from(languages),
        stars: stars
      }
    });
  } catch (error) {
    console.error("GitHub Analysis Error:", error);

    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: "GitHub profile not found"
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
      details: error.response?.data,
    });
  }
};

const getGitHubHistory = async (req, res) => {
  try {
    const history = await GitHubAnalysis.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      history,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  analyzeGitHub,
  getGitHubHistory,
};
