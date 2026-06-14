const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    skills: [String],

    careerGoal: String,

    recommendations: Object,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "OpenSourceRecommendation",
  recommendationSchema
);
