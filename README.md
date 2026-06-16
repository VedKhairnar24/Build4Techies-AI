# Build4Techies-AI

AI-powered career growth and open-source contribution platform.

Build4Techies-AI helps students and developers improve their resumes, analyze GitHub profiles, generate personalized learning roadmaps, calculate job readiness, and discover open-source opportunities.

## Screenshots

*(Place your screenshots in the `docs/screenshots/` folder)*

## Features

- **Resume ATS Analysis**: Get ATS scores, strengths, weaknesses, and improvement suggestions.
- **AI Career Roadmap Generation**: Generate a personalized learning path based on your skills and goals.
- **Job Readiness Score**: Track your overall hireability and progress.
- **GitHub Profile Analysis**: Understand project quality, activity, and portfolio readiness.
- **Open Source Recommendations**: Find beginner-friendly repositories that match your skills.
- **User Profile Management**: Manage your tech stack, skills, and career goals.
- **Secure Authentication**: JWT-based secure user authentication.
- **Responsive Dashboard**: Beautiful, mobile-first design across all devices.

## Tech Stack

**Frontend**
- React.js
- Tailwind CSS
- React Router
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB
- JWT Authentication

**AI**
- Cerebras AI
- GPT-OSS

**Deployment**
- Render

## Architecture

```
User
 ↓
React Frontend
 ↓
Express API
 ↓
MongoDB

AI Features
 ↓
Cerebras GPT-OSS
```

*See `docs/architecture/` for detailed diagrams.*

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/Build4Techies-AI.git
cd Build4Techies-AI
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your `server/.env` file. See `server/.env.example` for reference.

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `CEREBRAS_API_KEY`

## API Endpoints

Check `docs/API.md` for complete API documentation.

## Project Structure

```
Build4Techies-AI
│
├── client                 # React Frontend
├── server                 # Node.js Backend
│
├── docs                   # Documentation
│   ├── API.md             # API Endpoints
│   ├── screenshots/       # UI Screenshots
│   └── architecture/      # Architecture Diagrams
│
├── .github                # GitHub Templates
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
│
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── LICENSE
│
└── .env.example
```

## Contributing

Contributions are always welcome!

See `CONTRIBUTING.md` for ways to get started.

Please adhere to this project's `CODE_OF_CONDUCT.md`.

## License

[MIT](https://choosealicense.com/licenses/mit/)
