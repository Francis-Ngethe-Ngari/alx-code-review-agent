# Git Hooks Installation Script for my-agent (PowerShell)
# Installs and configures Git hooks with proper permissions

param(
    [switch]$Force = $false
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$HooksDir = Join-Path $ProjectRoot "hooks"
$GitHooksDir = Join-Path $ProjectRoot ".git\hooks"

Write-Host "🔧 Installing Git hooks for my-agent project..." -ForegroundColor Green

# Check if we're in a Git repository
if (-not (Test-Path (Join-Path $ProjectRoot ".git"))) {
    Write-Host "❌ Error: Not in a Git repository" -ForegroundColor Red
    Write-Host "💡 Run this script from the project root directory" -ForegroundColor Cyan
    exit 1
}

# Check if hooks directory exists
if (-not (Test-Path $HooksDir)) {
    Write-Host "❌ Error: Hooks directory not found at $HooksDir" -ForegroundColor Red
    exit 1
}

# Create Git hooks directory if it doesn't exist
if (-not (Test-Path $GitHooksDir)) {
    New-Item -ItemType Directory -Path $GitHooksDir -Force | Out-Null
}

# Function to install a hook
function Install-Hook {
    param($HookName)
    
    $SourceFile = Join-Path $HooksDir $HookName
    $TargetFile = Join-Path $GitHooksDir $HookName
    
    if (Test-Path $SourceFile) {
        Write-Host "📄 Installing $HookName hook..." -ForegroundColor Yellow
        
        # Check if hook already exists
        if ((Test-Path $TargetFile) -and -not $Force) {
            $response = Read-Host "Hook $HookName already exists. Overwrite? (y/N)"
            if ($response -ne "y" -and $response -ne "Y") {
                Write-Host "⏭️ Skipping $HookName hook" -ForegroundColor Gray
                return
            }
        }
        
        Copy-Item $SourceFile $TargetFile -Force
        
        # On Windows, we need to create a .bat wrapper for bash scripts
        if (Get-Content $SourceFile -First 1 | Select-String "#!/bin/bash") {
            $BatFile = "$TargetFile.bat"
            @"
@echo off
bash "%~dp0$HookName" %*
"@ | Out-File -FilePath $BatFile -Encoding ASCII
            Write-Host "✅ $HookName hook installed (with .bat wrapper)" -ForegroundColor Green
        } else {
            Write-Host "✅ $HookName hook installed" -ForegroundColor Green
        }
    } else {
        Write-Host "⚠️ Hook file $SourceFile not found, skipping" -ForegroundColor Yellow
    }
}

# Install each hook
Install-Hook "pre-commit"
Install-Hook "commit-msg"
Install-Hook "pre-push"

# Create or update hooks configuration
$ConfigFile = Join-Path $ProjectRoot ".hooks-config.json"
if (-not (Test-Path $ConfigFile)) {
    Write-Host "📝 Creating default hooks configuration..." -ForegroundColor Yellow
    $DefaultConfig = @{
        preCommit = @{
            runLinting = $true
            runTypeCheck = $true
            runTests = $false
            autoFix = $true
            stageFixed = $true
            excludePatterns = @("*.min.js", "*.bundle.js", "dist/**", "build/**")
        }
        commitMsg = @{
            enforceConventionalCommits = $true
            maxLength = 100
            allowedTypes = @("feat", "fix", "docs", "style", "refactor", "perf", "test", "chore", "ci", "build", "revert")
            requireScope = $false
            allowedScopes = @("core", "cli", "tools", "utils", "workflows", "docs", "config")
        }
        prePush = @{
            runTests = $true
            runBuild = $true
            checkDependencies = $false
            checkBranchProtection = $true
            protectedBranches = @("main", "master", "develop")
            maxFileSize = 10485760
        }
        general = @{
            packageManager = "auto"
            verbose = $false
            skipCI = $false
            enableEmojis = $true
        }
    }
    
    $DefaultConfig | ConvertTo-Json -Depth 3 | Out-File -FilePath $ConfigFile -Encoding UTF8
    Write-Host "✅ Configuration file created at $ConfigFile" -ForegroundColor Green
} else {
    Write-Host "ℹ️ Configuration file already exists at $ConfigFile" -ForegroundColor Gray
}

# Verify installation
Write-Host ""
Write-Host "🔍 Verifying installation..." -ForegroundColor Cyan

$HooksToCheck = @("pre-commit", "commit-msg", "pre-push")
foreach ($Hook in $HooksToCheck) {
    $HookPath = Join-Path $GitHooksDir $Hook
    $BatPath = "$HookPath.bat"
    
    if ((Test-Path $HookPath) -or (Test-Path $BatPath)) {
        Write-Host "✅ $Hook hook is installed" -ForegroundColor Green
    } else {
        Write-Host "❌ $Hook hook installation failed" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎉 Git hooks installation completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Installed hooks:" -ForegroundColor Cyan
Write-Host "   • pre-commit: Runs linting, type checking, and formatting" -ForegroundColor White
Write-Host "   • commit-msg: Validates commit message format" -ForegroundColor White
Write-Host "   • pre-push: Runs tests and build before pushing" -ForegroundColor White
Write-Host ""
Write-Host "⚙️ Configuration:" -ForegroundColor Cyan
Write-Host "   • Edit .hooks-config.json to customize hook behavior" -ForegroundColor White
Write-Host "   • Set 'runTests' to true in preCommit for stricter checks" -ForegroundColor White
Write-Host "   • Modify 'allowedTypes' and 'allowedScopes' for commit validation" -ForegroundColor White
Write-Host ""
Write-Host "🚀 You're ready to commit with automated quality checks!" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Tips:" -ForegroundColor Cyan
Write-Host "   • Use 'git commit --no-verify' to skip hooks in emergencies" -ForegroundColor White
Write-Host "   • Run 'bun run hooks:install' to reinstall hooks if needed" -ForegroundColor White
Write-Host "   • Check hook logs if commits are rejected" -ForegroundColor White