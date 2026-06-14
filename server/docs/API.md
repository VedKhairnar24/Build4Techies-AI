# Build4Techies-AI API Documentation

## Authentication Routes
- \`POST /api/auth/register\` - Register a new user
- \`POST /api/auth/login\` - Login an existing user

## User Routes
- \`GET /api/user/profile\` - Get the current user's profile
- \`PUT /api/user/profile\` - Update the current user's profile

## Resume Routes
- \`POST /api/resume/upload\` - Upload a new PDF resume
- \`GET /api/resume/all\` - Retrieve all uploaded resumes for the user

## Analysis Routes
- \`POST /api/analysis/resume\` - Analyze a resume using AI
- \`GET /api/analysis/history\` - Get all previous AI resume analyses

## Roadmap Routes
- \`POST /api/roadmap/generate\` - Generate a career learning roadmap via AI
- \`GET /api/roadmap/history\` - Get all previous career roadmaps

## GitHub Analysis Routes
- \`POST /api/github/analyze\` - Analyze a GitHub profile using AI
- \`GET /api/github/history\` - Get all previous GitHub analyses

## Open Source Recommendation Routes
- \`POST /api/opensource/generate\` - Generate open source repository recommendations via AI
- \`GET /api/opensource/history\` - Get all previous open source recommendations
