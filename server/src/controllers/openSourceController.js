const User = require("../models/User");
const OpenSourceRecommendation = require("../models/OpenSourceRecommendation");

const {
  generateOpenSourceRecommendations,
} = require("../services/aiService");

const { searchRepositories } = require("../services/githubService");

const generateRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user.skills || user.skills.length === 0) {
      return res.status(400).json({ success: false, message: "Add skills to your profile to get open source recommendations." });
    }

    const topSkills = user.skills.slice(0, 3);
    const allRepos = [];

    // Search GitHub for each skill
    for (const skill of topSkills) {
      try {
        const query = `label:"good first issue" ${skill}`;
        const repos = await searchRepositories(query);
        allRepos.push(...repos);
      } catch (err) {
        console.error(`Failed to fetch repos for ${skill}`, err.message);
      }
    }

    // Deduplicate and simplify
    const uniqueReposMap = new Map();
    allRepos.forEach(r => {
      if (!uniqueReposMap.has(r.id)) {
        uniqueReposMap.set(r.id, {
          name: r.full_name,
          description: r.description,
          language: r.language,
          stars: r.stargazers_count,
          url: r.html_url
        });
      }
    });

    const candidateRepos = Array.from(uniqueReposMap.values()).sort((a, b) => b.stars - a.stars).slice(0, 15);

    const aiPromptData = {
      skills: user.skills,
      careerGoal: user.careerGoal,
      candidateRepositories: candidateRepos
    };

    const aiResponse = await generateOpenSourceRecommendations(aiPromptData);

    let jsonString = aiResponse;
    if (jsonString.includes("```json")) {
      jsonString = jsonString.split("```json")[1].split("```")[0].trim();
    } else if (jsonString.includes("```")) {
      jsonString = jsonString.split("```")[1].split("```")[0].trim();
    }

    const parsed = JSON.parse(jsonString);
    
    // Map URLs back
    const finalRecommendations = parsed.recommended?.map(rec => {
      const original = candidateRepos.find(r => r.name === rec.name);
      return {
        ...rec,
        url: original ? original.url : `https://github.com/${rec.name}`
      };
    }) || [];

    const recommendation = await OpenSourceRecommendation.create({
      user: user._id,
      repositories: finalRecommendations,
    });

    res.json({
      success: true,
      repositories: finalRecommendations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRecommendationHistory = async (req, res) => {
  try {
    const history = await OpenSourceRecommendation.find({
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
  generateRecommendations,
  getRecommendationHistory,
};
