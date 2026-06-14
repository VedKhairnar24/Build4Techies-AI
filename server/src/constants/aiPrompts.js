const AI_PROMPTS = {
  RESUME_ANALYSIS: `
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

  ROADMAP_GENERATION: `
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

  GITHUB_ANALYSIS: `
Return ONLY valid JSON.

{
  "skillLevel":"",
  "strongAreas":[],
  "weakAreas":[],
  "recommendedTechnologies":[],
  "projectSuggestions":[],
  "openSourceReadiness":"",
  "portfolioScore":0
}
`,

  OPEN_SOURCE_RECOMMENDATION: `
Return ONLY valid JSON.

{
  "repositories": [
    {
      "name":"",
      "difficulty":"",
      "reason":""
    }
  ],

  "learningPath": [],

  "contributionTips": []
}
`
};

module.exports = AI_PROMPTS;
