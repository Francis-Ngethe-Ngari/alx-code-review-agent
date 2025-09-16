# Git Hooks Uninstallation Script for my-agent
# Removes Git hooks and optionally removes configuration

$PROJECT_ROOT = Split-Path -Parent $PSScriptRoot
$GIT_HOOKS_DIR = Join-Path $PROJECT_ROOT ".git\hooks"

Write-Host "🗑️ Uninstalling Git hooks for my-agent project..." -ForegroundColor Yellow

# Check if we're in a Git repository
if (-not (Test-Path (Join-Path $PROJECT_ROOT ".git"))) {
    Write-Host "❌ Error: Not in a Git repository" -ForegroundColor Red
    Write-Host "💡 Run this script from the project root directory" -ForegroundColor Cyan
    exit 1
}

# Function to remove a hook
function Remove-Hook {
    param($hookName)
    
    $hookPath = Join-Path $GIT_HOOKS_DIR $hookName
    if (Test-Path $hookPath) {
        Remove-Item $hookPath -Force
        Write-Host "✅ Removed $hookName hook" -ForegroundColor Green
    } else {
        Write-Host "ℹ️ $hookName hook not found, skipping" -ForegroundColor Gray
    }
}

# Remove each hook
Remove-Hook "pre-commit"
Remove-Hook "commit-msg" 
Remove-Hook "pre-push"

# Ask about configuration file
$configFile = Join-Path $PROJECT_ROOT ".hooks-config.json"
if (Test-Path $configFile) {
    $response = Read-Host "🗑️ Remove hooks configuration file? (y/N)"
    if ($response -eq "y" -or $response -eq "Y") {
        Remove-Item $configFile -Force
        Write-Host "✅ Removed configuration file" -ForegroundColor Green
    } else {
        Write-Host "ℹ️ Keeping configuration file for future use" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "🎉 Git hooks uninstallation completed!" -ForegroundColor Green
Write-Host "💡 You can reinstall hooks anytime with: bun run hooks:install" -ForegroundColor Cyan