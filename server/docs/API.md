# Build4Techies-AI API Documentation

Below is the documentation for all available endpoints, including dummy data for testing via Postman or cURL. 

> **Note**: For all protected routes, you must pass the `Authorization` header: `Authorization: Bearer <your_jwt_token>`

---

## Authentication Routes

### `POST /api/auth/register`
Register a new user.
**Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

### `POST /api/auth/login`
Login an existing user.
**Body (JSON):**
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```
**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5...",
  "user": {
    "_id": "6a2e83e900fdd7315440cd4b",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

---

## User Routes

### `GET /api/user/profile`
Get the current user's profile.
**Headers:** `Authorization: Bearer <token>`

### `PUT /api/user/profile`
Update the current user's profile.
**Headers:** `Authorization: Bearer <token>`
**Body (JSON):**
```json
{
  "bio": "Passionate software engineer building AI applications.",
  "skills": ["React", "Node.js", "MongoDB", "Python", "Docker"],
  "careerGoal": "Full Stack Developer",
  "githubUsername": "johndoe123"
}
```

---

## Resume Routes

### `POST /api/resume/upload`
Upload a new PDF resume. This will automatically extract the text.
**Headers:** `Authorization: Bearer <token>`
**Body (FormData):**
- `resume`: `[File]` (Must be a `.pdf` file)

### `GET /api/resume/all`
Retrieve all uploaded resumes for the user.
**Headers:** `Authorization: Bearer <token>`

### `POST /api/resume/analyze`
Analyze the most recently uploaded resume using Cerebras AI.
**Headers:** `Authorization: Bearer <token>`
**Response:**
```json
{
  "success": true,
  "analysis": {
    "atsScore": 82,
    "strengths": ["Strong React skills", "Multiple projects"],
    "weaknesses": ["Missing testing"],
    "suggestions": ["Learn Jest", "Add CI/CD"]
  }
}
```

---

## Analysis Routes

### `POST /api/analysis/resume`
Analyze a specific uploaded resume using Cerebras AI.
**Headers:** `Authorization: Bearer <token>`
**Body (JSON):**
```json
{
  "resumeId": "6a2e8d4b0ea57965f2e172d8"
}
```
*(Retrieve the `resumeId` from the `GET /api/resume/all` response)*

### `GET /api/analysis/history`
Get all previous AI resume analyses.
**Headers:** `Authorization: Bearer <token>`

---

## Roadmap Routes

### `POST /api/roadmap/generate`
Generate a career learning roadmap via AI based on the user's saved `skills` and a target `goal`.
**Headers:** `Authorization: Bearer <token>`
**Body (JSON):**
```json
{
  "goal": "Senior DevOps Engineer"
}
```

### `GET /api/roadmap/history`
Get all previous career roadmaps.
**Headers:** `Authorization: Bearer <token>`

---

## GitHub Analysis Routes

### `POST /api/github/analyze`
Analyze a GitHub profile using AI. It fetches public repositories and generates insights.
**Headers:** `Authorization: Bearer <token>`
**Body (JSON):**
```json
{
  "githubUsername": "VedKhairnar24"
}
```

### `GET /api/github/history`
Get all previous GitHub analyses.
**Headers:** `Authorization: Bearer <token>`

---

## Open Source Recommendation Routes

### `POST /api/opensource/generate`
Generate open source repository recommendations via AI based on user profile and skills.
**Headers:** `Authorization: Bearer <token>`
**Body (JSON):**
*(No body required. It uses the logged-in user's `skills` and `careerGoal`)*
```json
{}
```

### `GET /api/opensource/history`
Get all previous open source recommendations.
**Headers:** `Authorization: Bearer <token>`

---

## Job Readiness Routes

### `GET /api/job-readiness/generate`
Calculate the user's aggregated Job Readiness Score based on ATS score, GitHub score, skills count, and career goal completion. Updates the user's profile and returns the score.
**Headers:** `Authorization: Bearer <token>`
**Response:**
```json
{
  "success": true,
  "score": 81
}
```
