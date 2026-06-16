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
  "careerGoal":"",
  "timeline":[
    {
      "month":"",
      "topics":[]
    }
  ],
  "projects":[],
  "certifications":[],
  "openSource":[]
}
`,

  GITHUB_ANALYSIS: `
Analyze this GitHub profile.

Return ONLY valid JSON.

{
  "githubScore": 0,
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
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
