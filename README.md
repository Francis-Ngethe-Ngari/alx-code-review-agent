# my-agent

An AI-powered code review agent built with TypeScript and Bun, leveraging Google's Gemini AI model to provide intelligent, automated code reviews.

## Overview

This project is designed to be an **AI code review automation tool** that transforms Google's Gemini 2.5 Pro into an expert code reviewer. The agent provides constructive, actionable feedback on code changes with a focus on correctness, clarity, maintainability, and best practices.

## Features

- **AI-Powered Reviews**: Uses Google Gemini 2.5 Pro for intelligent code analysis
- **Expert Persona**: Sophisticated prompt engineering creates a professional code reviewer personality
- **Comprehensive Analysis**: Reviews code for correctness, security, performance, testing, and maintainability
- **Constructive Feedback**: Provides clear explanations and actionable suggestions

## Current State

This project is in **early development**. Currently includes:
- Basic AI text generation setup with Gemini integration
- Comprehensive code review prompt template (`prompt.ts`)
- Demo query functionality

**Next Steps**: Connect the review prompt to actual code analysis functionality for automated pull request reviews.

## Installation

To install dependencies:

```bash
bun install
```

## Usage

To run the current demo:

```bash
bun run index.ts
```

## Technical Stack

- **Runtime**: [Bun](https://bun.com) v1.2.22+ (fast all-in-one JavaScript runtime)
- **Language**: TypeScript
- **AI SDK**: `ai` package for text generation
- **AI Model**: Google Gemini 2.5 Pro

## Project Structure

- `index.ts` - Main entry point with AI integration demo
- `prompt.ts` - Expert code reviewer system prompt and persona definition

---

*This project was created using `bun init` and is designed to help teams maintain code quality through automated AI reviews.*
