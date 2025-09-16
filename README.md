# my-agent

An AI-powered code review agent built with TypeScript and Bun, leveraging Google's Gemini AI model to provide intelligent, automated code reviews.

## Overview

This project is designed to be an **AI code review automation tool** that transforms Google's Gemini 2.5 Pro into an expert code reviewer. The agent provides constructive, actionable feedback on code changes with a focus on correctness, clarity, maintainability, and best practices.

## Features

- **AI-Powered Reviews**: Uses Google Gemini 2.5 Pro for intelligent code analysis
- **Expert Persona**: Sophisticated prompt engineering creates a professional code reviewer personality
- **Comprehensive Analysis**: Reviews code for correctness, security, performance, testing, and maintainability
- **Constructive Feedback**: Provides clear explanations and actionable suggestions
- **Type-Safe**: Built with TypeScript for enhanced development experience
- **Modern Tooling**: ESLint, Prettier, and Vitest for code quality and testing

## Current State

This project is in **active development**. Currently includes:
- Structured TypeScript codebase with proper separation of concerns
- AI integration with Google Gemini 2.5 Pro using the AI SDK
- Comprehensive code review prompt templates
- Git integration for analyzing file changes
- Environment configuration with validation
- Testing infrastructure with Vitest
- Code quality tools (ESLint, Prettier)

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd my-agent
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env and add your Google Gemini API key
   ```

## Usage

### AI Code Review Commands

#### Individual Scripts
```bash
# Quick code review
bun run review [directory]

# Generate commit message
bun run commit-msg

# Save review to file
bun run save-review
```

#### Integrated Workflows
```bash
# Full interactive workflow
bun run workflow [directory]

# Auto-commit workflow
bun run workflow:auto

# Save review + interactive workflow
bun run workflow:save
```

#### CLI Interface
```bash
# Install dependencies first
bun install

# Use CLI commands directly
bun run src/cli/index.ts review ./src
bun run src/cli/index.ts commit
bun run src/cli/index.ts workflow --auto-commit
bun run src/cli/index.ts prompt "Focus on security issues in this code"

# Or build and install globally (optional)
bun run build
npm install -g .
my-agent review ./src
```

## Usage

### Individual Scripts
```bash
# Quick code review
bun run review [directory]

# Generate commit message
bun run commit-msg

# Save review to file
bun run save-review
```

### Integrated Workflows
```bash
# Full interactive workflow
bun run workflow [directory]

# Auto-commit workflow
bun run workflow:auto

# Save review + interactive workflow
bun run workflow:save
```

### Development
```bash
# Run in development mode
bun run dev

# Type checking
bun run type-check

# Linting
bun run lint
bun run lint:fix

# Formatting
bun run format
bun run format:check
```

### Testing
```bash
# Run tests
bun run test

# Run tests in watch mode
bun run test:watch

# Run tests with coverage
bun run test:coverage
```

### Production
```bash
# Build the project
bun run build

# Run the built project
bun run start
```

### CLI Interface
```bash
# Install globally (optional)
npm install -g .

# Use CLI commands
my-agent review ./src
my-agent commit
my-agent workflow --auto-commit
my-agent prompt "Focus on security issues in this code"
```

## Project Structure

```
my-agent/
├── src/
│   ├── core/
│   │   ├── agent.ts           # Main CodeReviewAgent class
│   │   └── index.ts           # Entry point
│   ├── prompts/
│   │   └── system.ts          # AI system prompts and templates
│   ├── tools/
│   │   ├── git.ts             # Git integration tools
│   │   └── index.ts           # Tool exports
│   ├── types/
│   │   └── common.ts          # TypeScript interfaces and types
│   ├── utils/
│   │   └── config.ts          # Environment configuration
│   └── index.ts               # Main exports
├── tests/
│   ├── unit/                  # Unit tests
│   └── integration/           # Integration tests
├── .env.example               # Environment variables template
├── .eslintrc.js              # ESLint configuration
├── .prettierrc               # Prettier configuration
├── .editorconfig             # Editor configuration
├── vitest.config.ts          # Vitest test configuration
└── tsconfig.json             # TypeScript configuration
```

## Configuration

The application uses environment variables for configuration. Copy `.env.example` to `.env` and configure:

- `GOOGLE_GENERATIVE_AI_API_KEY`: Your Google Gemini API key (required)
- `GEMINI_MODEL`: Model to use (default: models/gemini-2.5-pro)
- `GEMINI_MAX_TOKENS`: Maximum tokens for responses (default: 8192)
- `GEMINI_TEMPERATURE`: Model temperature (default: 0.7)

## API Usage

```typescript
import { CodeReviewAgent } from './src/core/agent.js';

const agent = new CodeReviewAgent();

// Review changes in a directory
await agent.reviewCode({
  directory: './src',
  excludeFiles: ['node_modules', 'dist']
});

// Review with custom prompt
await agent.reviewPrompt(
  "Review the code changes in './src' directory, focusing on security issues"
);
```

## Development Workflow

1. **Code Quality**: The project uses ESLint and Prettier for consistent code style
2. **Type Safety**: Full TypeScript coverage with strict mode enabled
3. **Testing**: Comprehensive test suite with Vitest
4. **Environment**: Proper environment variable validation
5. **Git Hooks**: Consider adding pre-commit hooks for quality checks

## Technical Stack

- **Runtime**: [Bun](https://bun.com) v1.2.22+ (fast all-in-one JavaScript runtime)
- **Language**: TypeScript with strict mode
- **AI SDK**: `ai` package for text generation
- **AI Model**: Google Gemini 2.5 Pro
- **Testing**: Vitest with coverage reporting
- **Code Quality**: ESLint + Prettier + EditorConfig
- **Validation**: Zod for environment and input validation

## Next Steps

- [ ] Add CLI interface for command-line usage
- [ ] Implement GitHub/GitLab integration for automated PR reviews
- [ ] Add support for multiple AI models
- [ ] Create web interface for interactive reviews
- [ ] Add more sophisticated code analysis tools
- [ ] Implement review caching and history

---

*This project is designed to help teams maintain code quality through automated AI reviews. Built with modern TypeScript practices and comprehensive tooling.*
