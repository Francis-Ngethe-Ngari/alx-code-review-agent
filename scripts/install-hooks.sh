#!/bin/bash

# Git Hooks Installation Script for my-agent
# Installs and configures Git hooks with proper permissions

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HOOKS_DIR="$PROJECT_ROOT/hooks"
GIT_HOOKS_DIR="$PROJECT_ROOT/.git/hooks"

echo "🔧 Installing Git hooks for my-agent project..."

# Check if we're in a Git repository
if [ ! -d "$PROJECT_ROOT/.git" ]; then
    echo "❌ Error: Not in a Git repository"
    echo "💡 Run this script from the project root directory"
    exit 1
fi

# Check if hooks directory exists
if [ ! -d "$HOOKS_DIR" ]; then
    echo "❌ Error: Hooks directory not found at $HOOKS_DIR"
    exit 1
fi

# Create Git hooks directory if it doesn't exist
mkdir -p "$GIT_HOOKS_DIR"

# Function to install a hook
install_hook() {
    local hook_name="$1"
    local source_file="$HOOKS_DIR/$hook_name"
    local target_file="$GIT_HOOKS_DIR/$hook_name"
    
    if [ -f "$source_file" ]; then
        echo "📄 Installing $hook_name hook..."
        cp "$source_file" "$target_file"
        chmod +x "$target_file"
        echo "✅ $hook_name hook installed"
    else
        echo "⚠️  Hook file $source_file not found, skipping"
    fi
}

# Install each hook
install_hook "pre-commit"
install_hook "commit-msg"
install_hook "pre-push"

# Create or update hooks configuration
CONFIG_FILE="$PROJECT_ROOT/.hooks-config.json"
if [ ! -f "$CONFIG_FILE" ]; then
    echo "📝 Creating default hooks configuration..."
    cat > "$CONFIG_FILE" << 'EOF'
{
  "preCommit": {
    "runLinting": true,
    "runTypeCheck": true,
    "runTests": false,
    "autoFix": true,
    "stageFixed": true,
    "excludePatterns": ["*.min.js", "*.bundle.js", "dist/**", "build/**"]
  },
  "commitMsg": {
    "enforceConventionalCommits": true,
    "maxLength": 100,
    "allowedTypes": [
      "feat", "fix", "docs", "style", "refactor", 
      "perf", "test", "chore", "ci", "build", "revert"
    ],
    "requireScope": false,
    "allowedScopes": ["core", "cli", "tools", "utils", "workflows", "docs", "config"]
  },
  "prePush": {
    "runTests": true,
    "runBuild": true,
    "checkDependencies": false,
    "checkBranchProtection": true,
    "protectedBranches": ["main", "master", "develop"],
    "maxFileSize": 10485760
  },
  "general": {
    "packageManager": "auto",
    "verbose": false,
    "skipCI": false,
    "enableEmojis": true
  }
}
EOF
    echo "✅ Configuration file created at $CONFIG_FILE"
else
    echo "ℹ️  Configuration file already exists at $CONFIG_FILE"
fi

# Verify installation
echo ""
echo "🔍 Verifying installation..."

for hook in "pre-commit" "commit-msg" "pre-push"; do
    if [ -x "$GIT_HOOKS_DIR/$hook" ]; then
        echo "✅ $hook hook is installed and executable"
    else
        echo "❌ $hook hook installation failed"
    fi
done

echo ""
echo "🎉 Git hooks installation completed!"
echo ""
echo "📋 Installed hooks:"
echo "   • pre-commit: Runs linting, type checking, and formatting"
echo "   • commit-msg: Validates commit message format"
echo "   • pre-push: Runs tests and build before pushing"
echo ""
echo "⚙️  Configuration:"
echo "   • Edit .hooks-config.json to customize hook behavior"
echo "   • Set 'runTests' to true in preCommit for stricter checks"
echo "   • Modify 'allowedTypes' and 'allowedScopes' for commit validation"
echo ""
echo "🚀 You're ready to commit with automated quality checks!"
echo ""
echo "💡 Tips:"
echo "   • Use 'git commit --no-verify' to skip hooks in emergencies"
echo "   • Run 'bun run hooks:install' to reinstall hooks if needed"
echo "   • Check hook logs if commits are rejected"