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
`
};

module.exports = AI_PROMPTS;
