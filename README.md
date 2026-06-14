# Build4Techies-AI

## Project Overview
Build4Techies-AI is a powerful platform that leverages Cerebras AI to provide personalized career insights, resume analysis, career roadmaps, GitHub profile analysis, and open-source project recommendations for aspiring and professional developers.

## Tech Stack
- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express, MongoDB
- AI Integration: Cerebras API (`gpt-oss-120b`, `llama3.1-8b`)
- Security: JWT Authentication, bcryptjs
- File Upload: Multer, pdf-parse

## Installation

### 1. Clone the Repository
\`\`\`bash
git clone <your-repo-url>
cd Build4Techies-AI
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd server
npm install
\`\`\`

### 3. Frontend Setup
\`\`\`bash
cd client
npm install
\`\`\`

## Environment Variables
Create a \`.env\` file in the `server` directory:

\`\`\`env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CEREBRAS_API_KEY=your_cerebras_api_key
\`\`\`

## API Documentation Link
For detailed API documentation, refer to [API.md](server/docs/API.md).

## Contributing Guide
We welcome contributions! Please check out the issues tab, particularly those tagged with `good first issue`.

## Roadmap
For upcoming features and project status, see the [ROADMAP.md](ROADMAP.md) file.
