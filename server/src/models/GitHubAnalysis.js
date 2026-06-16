const mongoose = require("mongoose");

const githubAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    githubScore: {
      type: Number,
      default: 0,
    },

    analysis: {
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
