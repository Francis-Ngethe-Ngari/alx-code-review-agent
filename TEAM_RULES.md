# Team Development Rules & Standards

## 📋 **Overview**

This document establishes coding standards, development practices, and team collaboration rules for the **my-agent** AI Code Review project. All team members must follow these guidelines to ensure code quality, consistency, and maintainability.

---

## 🎯 **Core Development Principles**

### 1. **Code Quality First**
- Write clean, readable, and self-documenting code
- Follow the principle of least surprise
- Prioritize code clarity over cleverness
- Every function should have a single responsibility

### 2. **Type Safety**
- Use TypeScript strict mode (already configured)
- Define explicit types for all public APIs
- Avoid `any` type unless absolutely necessary
- Prefer interfaces over type aliases for object definitions

### 3. **Error Handling**
- Always handle errors explicitly
- Use proper error types and messages
- Log errors with appropriate context
- Never silently fail

---

## 📁 **Project Structure Rules**

### **Directory Organization**
```
src/
├── cli/           # Command-line interface
├── core/          # Core business logic
├── prompts/       # AI prompts and templates
├── tools/         # External integrations (Git, etc.)
├── types/         # TypeScript interfaces and types
├── utils/         # Utility functions and helpers
└── workflows/     # Business workflows
```

### **File Naming Conventions**
- Use kebab-case for directories: `code-review/`
- Use kebab-case for files: `commit-gen.ts`
- Use PascalCase for classes: `CodeReviewAgent`
- Use camelCase for functions and variables: `reviewCode()`

### **Import/Export Rules**
- Use explicit imports: `import { CodeReviewAgent } from './agent.js'`
- Always include `.js` extension in imports (ES modules)
- Group imports: external packages → internal modules → types
- Use barrel exports (`index.ts`) for public APIs

---

## 🔧 **Coding Standards**

### **TypeScript Rules**
- Enable strict mode in `tsconfig.json`
- Use explicit return types for all functions
- Define interfaces for all data structures
- Use `readonly` for immutable data

```typescript
// ✅ Good
interface CodeReviewRequest {
  readonly directory: string;
  readonly excludeFiles?: readonly string[];
}

export async function reviewCode(request: CodeReviewRequest): Promise<void> {
  // implementation
}

// ❌ Bad
function reviewCode(request: any) {
  // implementation
}
```

### **Function Guidelines**
- Maximum 50 lines per function
- Use descriptive names that explain purpose
- Prefer pure functions when possible
- Document complex logic with comments

### **Class Guidelines**
- Single responsibility principle
- Private members by default
- Use readonly for immutable properties
- Implement proper error handling

```typescript
// ✅ Good
export class CodeReviewAgent {
  private readonly model = google('models/gemini-2.5-pro');

  async reviewCode(request: CodeReviewRequest): Promise<void> {
    try {
      // implementation
    } catch (error) {
      throw new Error(`Review failed: ${error.message}`);
    }
  }
}
```

---

## 🧪 **Testing Requirements**

### **Test Coverage Standards**
- Minimum 80% code coverage for new code
- 100% coverage for critical business logic
- Unit tests for all utility functions
- Integration tests for workflows

### **Test Structure**
```typescript
describe('CodeReviewAgent', () => {
  describe('reviewCode', () => {
    it('should generate review for valid directory', async () => {
      // Arrange
      const request = { directory: './test-dir' };
      
      // Act
      await agent.reviewCode(request);
      
      // Assert
      expect(result).toBeDefined();
    });

    it('should throw error for invalid directory', async () => {
      // Test error cases
    });
  });
});
```

### **Test Naming**
- Describe behavior, not implementation
- Use "should" statements: `should throw error when directory is invalid`
- Group related tests with `describe` blocks

---

## 🔄 **Git Workflow & Commit Standards**

### **Branch Naming**
- `feature/description`: New features
- `fix/description`: Bug fixes  
- `refactor/description`: Code refactoring
- `docs/description`: Documentation updates

### **Commit Message Format**
Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(core): add support for custom AI models

fix(git): handle empty repository edge case

docs(readme): update installation instructions
```

### **Pull Request Rules**
- Create PR from feature branch to `main`
- Require at least 1 code review approval
- All CI checks must pass
- Squash commits when merging
- Delete feature branch after merge

---

## 🚦 **Code Review Guidelines**

### **For Authors**
- Keep PRs small (< 400 lines changed)
- Write clear PR description
- Self-review before requesting review
- Add tests for new functionality
- Update documentation if needed

### **For Reviewers**
- Review within 24 hours
- Focus on logic, not style (automated tools handle style)
- Suggest improvements, don't just point out problems
- Ask questions to understand intent
- Approve when code meets standards

### **Review Checklist**
- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No security vulnerabilities
- [ ] Performance considerations addressed
- [ ] Error handling is appropriate

---

## ⚙️ **Development Environment**

### **Required Tools**
- **Runtime**: Bun v1.2.22+
- **Node.js**: v18.0.0+ (fallback)
- **TypeScript**: v5.0+
- **Git**: Latest version

### **IDE Configuration**
- Install ESLint and Prettier extensions
- Enable "format on save"
- Configure TypeScript strict mode
- Use EditorConfig settings

### **Pre-commit Hooks**
Install and configure:
```bash
# Type checking
bun run type-check

# Linting
bun run lint:fix

# Formatting
bun run format

# Tests
bun run test
```

---

## 🔒 **Security Guidelines**

### **Environment Variables**
- Never commit secrets to repository
- Use `.env.example` for documentation
- Validate all environment variables
- Use proper secret management in production

### **Dependencies**
- Regularly update dependencies
- Audit for security vulnerabilities
- Pin exact versions in production
- Review new dependencies before adding

### **API Security**
- Validate all inputs
- Sanitize user-provided data
- Use proper error handling (don't leak sensitive info)
- Implement rate limiting where appropriate

---

## 📊 **Performance Standards**

### **Benchmarks**
- Function execution < 100ms for utility functions
- API responses < 2 seconds
- Memory usage < 100MB for CLI operations
- Test suite completion < 30 seconds

### **Optimization Rules**
- Prefer async/await over callbacks
- Use streaming for large data processing
- Implement proper caching strategies
- Profile performance-critical code

---

## 📚 **Documentation Requirements**

### **Code Documentation**
- JSDoc comments for all public APIs
- README updates for new features
- Architecture decisions in ADR format
- API examples in documentation

### **Documentation Standards**
```typescript
/**
 * Reviews code changes in the specified directory using AI analysis.
 * 
 * @param request - Configuration for the review request
 * @returns Promise that resolves when review is complete
 * @throws Error when directory is invalid or AI service fails
 * 
 * @example
 * ```typescript
 * await agent.reviewCode({ directory: './src' });
 * ```
 */
async reviewCode(request: CodeReviewRequest): Promise<void>
```

---

## 🚀 **Release Process**

### **Version Management**
- Follow [Semantic Versioning](https://semver.org/)
- Update `CHANGELOG.md` for each release
- Tag releases in Git
- Generate release notes

### **Deployment Checklist**
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Version bumped
- [ ] Changelog updated
- [ ] Security audit completed
- [ ] Performance benchmarks met

---

## ⚖️ **Enforcement**

### **Automated Checks**
- ESLint rules enforced in CI
- TypeScript compilation required
- Test coverage reports generated
- Security scans automated

### **Manual Review**
- Code review required for all changes
- Architecture review for major changes
- Security review for sensitive changes
- Performance review for critical paths

---

## 📞 **Team Communication**

### **Daily Practices**
- Use descriptive commit messages
- Update PR status regularly
- Respond to review comments promptly
- Share knowledge in team channels

### **Documentation**
- Keep README up to date
- Document architectural decisions
- Share learning and discoveries
- Maintain troubleshooting guides

---

*These rules are living guidelines that evolve with our project. Suggestions for improvements are always welcome!*