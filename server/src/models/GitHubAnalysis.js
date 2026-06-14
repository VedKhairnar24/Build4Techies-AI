const mongoose = require("mongoose");

const githubAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    githubUsername: {
      type: String,
      required: true,
    },

    profileData: {
      type: Object,
      default: {},
    },

    repositories: {
      type: Array,
      default: [],
    },

    aiInsights: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "GitHubAnalysis",
  githubAnalysisSchema
);
