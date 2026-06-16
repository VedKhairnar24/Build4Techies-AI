# API Documentation

## Authentication

### POST `/api/auth/register`
Create a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Headers:** None
**Response (201):**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

### POST `/api/auth/login`
Authenticate an existing user.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Headers:** None
**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

## Profile

### GET `/api/profile`
Get the authenticated user's profile details.

**Request:** None
**Headers:** `Authorization: Bearer <token>`
**Response (200):**
```json
{
  "success": true,
  "profile": {
    "name": "John Doe",
    "email": "john@example.com",
    "githubUsername": "johndoe",
    "skills": ["React", "Node.js"],
    "careerGoal": "Full Stack Developer"
  }
}
```

### PUT `/api/profile`
Update the authenticated user's profile.

**Request:**
```json
{
  "githubUsername": "johndoe",
  "skills": ["React", "Node.js", "MongoDB"],
  "careerGoal": "Senior Full Stack Developer"
}
```
**Headers:** `Authorization: Bearer <token>`
**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully"
}
```

## Resume

### POST `/api/resume/upload`
Upload a PDF resume for parsing.

**Request:** `multipart/form-data` with `file` field containing PDF.
**Headers:** `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
**Response (200):**
```json
{
  "success": true,
  "message": "Resume processed successfully"
}
```

### POST `/api/resume/analyze`
Analyze the most recently uploaded resume.

**Request:** None
**Headers:** `Authorization: Bearer <token>`
**Response (200):**
```json
{
  "success": true,
  "analysis": {
    "atsScore": 85,
    "strengths": ["Strong React skills", "Good project descriptions"],
    "weaknesses": ["Missing quantitative metrics"],
    "suggestions": ["Add more measurable impact to your experience"]
  }
}
```

## Career Roadmap

### POST `/api/roadmap/generate`
Generate a career roadmap based on skills, career goal, and resume analysis.

**Request:** None
**Headers:** `Authorization: Bearer <token>`
**Response (200):**
```json
{
  "success": true,
  "roadmap": {
    "careerGoal": "Full Stack Developer",
    "timeline": [...],
    "projects": [...],
    "certifications": [...]
  }
}
```

## Job Readiness

### GET `/api/job-readiness`
Calculate and retrieve the user's job readiness score.

**Request:** None
**Headers:** `Authorization: Bearer <token>`
**Response (200):**
```json
{
  "success": true,
  "score": 84,
  "factors": {
    "resumeScore": 34,
    "profileScore": 20,
    "skillsScore": 10,
    "roadmapScore": 20
  }
}
```

## GitHub Analyzer

### POST `/api/github/analyze`
Analyze a GitHub profile.

**Request:**
```json
{
  "githubUsername": "torvalds"
}
```
**Headers:** `Authorization: Bearer <token>`
**Response (200):**
```json
{
  "success": true,
  "analysis": {
    "githubScore": 95,
    "strengths": ["High star count", "Consistent activity"],
    "weaknesses": ["Missing READMEs on some repos"],
    "suggestions": ["Add documentation to older projects"]
  },
  "extraStats": {
    "repositories": 50,
    "languages": ["C", "C++", "Shell"],
    "stars": 150000
  }
}
```

## Open Source Recommendations

### GET `/api/open-source/recommendations`
Get curated open-source recommendations.

**Request:** None
**Headers:** `Authorization: Bearer <token>`
**Response (200):**
```json
{
  "success": true,
  "repositories": [
    {
      "name": "react",
      "owner": "facebook",
      "description": "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
      "url": "https://github.com/facebook/react",
      "stars": 200000,
      "language": "JavaScript",
      "matchReason": "Matches your React skills."
    }
  ]
}
```
