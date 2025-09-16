# Git Hooks for my-agent

This directory contains Git hooks that automatically enforce code quality standards for the my-agent project.

## Available Hooks

### 1. pre-commit
**Purpose**: Runs quality checks before allowing commits  
**Checks**:
- ESLint linting with auto-fix
- Prettier formatting with auto-fix  
- TypeScript type checking
- File size validation
- Sensitive file detection

**Configuration**: Customize behavior in `.hooks-config.json`

### 2. commit-msg
**Purpose**: Validates commit message format  
**Checks**:
- Conventional Commits format validation
- Message length limits (default: 100 characters)
- Imperative mood suggestions
- WIP commit warnings

**Format Required**:
```
type(scope): description

Examples:
feat(core): add AI model configuration
fix(git): handle empty repository case
docs: update installation guide
```

### 3. pre-push
**Purpose**: Final validation before pushing to remote  
**Checks**:
- Full test suite execution
- Build verification
- TypeScript compilation
- Large file detection (>10MB)
- Sensitive file scanning
- Branch protection warnings

## Installation

### Automatic Installation
```bash
# Install all hooks with default configuration
bun run hooks:install
```

### Manual Installation
```bash
# Copy hooks to .git/hooks/
cp hooks/pre-commit .git/hooks/
cp hooks/commit-msg .git/hooks/
cp hooks/pre-push .git/hooks/

# Make hooks executable
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/commit-msg
chmod +x .git/hooks/pre-push
```

### Verification
```bash
# Check installed hooks
bun run hooks:check
```

## Configuration

Customize hook behavior by editing `.hooks-config.json`:

```json
{
  "preCommit": {
    "runLinting": true,
    "runTypeCheck": true,
    "runTests": false,
    "autoFix": true,
    "stageFixed": true
  },
  "commitMsg": {
    "enforceConventionalCommits": true,
    "maxLength": 100,
    "requireScope": false
  },
  "prePush": {
    "runTests": true,
    "runBuild": true,
    "checkDependencies": false
  }
}
```

## Troubleshooting

- **Hook not running**: Check if hook files are executable
- **Permission errors**: Run `chmod +x .git/hooks/*`
- **Bypass hooks**: Use `git commit --no-verify` (emergency only)

## Uninstallation

```bash
bun run hooks:uninstall
```
    "runFormatting": true,
    "runTests": false
  },
  "commitMsg": {
    "enforceConventionalCommits": true,
    "maxLength": 100,
    "allowedTypes": ["feat", "fix", "docs", "style", "refactor", "test", "chore"]
  },
  "prePush": {
    "runFullTests": true,
    "runSecurity": true,
    "runBuild": true
  }
}
```

## 🚫 **Bypassing Hooks**

**Use sparingly and with caution:**
```bash
# Skip pre-commit hooks
git commit --no-verify -m "emergency fix"

# Skip pre-push hooks  
git push --no-verify
```

## 🔧 **Troubleshooting**

### **Hook Not Executing**
```bash
# Check if hooks are executable
ls -la .git/hooks/

# Make executable if needed
chmod +x .git/hooks/pre-commit
```

### **Performance Issues**
- Reduce hook scope in configuration
- Use `--staged` flag for linting
- Cache dependencies where possible

## 📝 **Custom Hooks**

Add your own hooks:
1. Create script in `hooks/` directory
2. Make it executable
3. Copy to `.git/hooks/`
4. Update this documentation