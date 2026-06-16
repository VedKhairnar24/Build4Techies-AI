# Contributing to Build4Techies-AI

First off, thank you for considering contributing to Build4Techies-AI! It's people like you that make open source such a great community.

## Development Process

1. **Fork the Repository**
   Click the "Fork" button in the top right corner of the repository to create your own copy.

2. **Clone your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Build4Techies-AI.git
   cd Build4Techies-AI
   ```

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

4. **Make your Changes**
   - Write clean, readable code.
   - Follow the existing code style.
   - Add comments where necessary.

5. **Commit your Changes**
   Follow conventional commit messages:
   ```bash
   git commit -m "feat: add new dashboard metric"
   git commit -m "fix: resolve login routing issue"
   git commit -m "docs: update API documentation"
   ```

6. **Push to your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository.
   - Click "New Pull Request".
   - Compare your feature branch to the main branch.
   - Fill out the Pull Request template completely.

## Coding Standards
- Use ESLint/Prettier formatting if configured.
- Keep components modular and reusable in React.
- Handle all API errors gracefully in both Backend (try/catch) and Frontend (handleApiError utility).
- Ensure mobile responsiveness for all UI additions using Tailwind CSS.
