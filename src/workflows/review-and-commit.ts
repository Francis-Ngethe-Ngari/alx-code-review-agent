import { CodeReviewAgent } from '../core/agent.js';
import { generateCommitMessage } from '../utils/commit-gen.js';
import { saveReview, type ReviewFeedback } from '../utils/review-writer.js';
import { execSync } from 'node:child_process';
import { createInterface } from 'node:readline';

interface WorkflowOptions {
  directory?: string;
  saveReviewFile?: boolean;
  autoCommit?: boolean;
  interactive?: boolean;
}

export class ReviewWorkflow {
  private agent: CodeReviewAgent;

  constructor() {
    this.agent = new CodeReviewAgent();
  }

  async reviewAndCommitWorkflow(options: WorkflowOptions = {}): Promise<void> {
    const {
      directory = '.',
      saveReviewFile = false,
      autoCommit = false,
      interactive = true,
    } = options;

    console.log('🔍 Starting AI-powered review and commit workflow...\n');
    
    try {
      // Step 1: Review current changes
      console.log('📝 Reviewing code changes...');
      await this.agent.reviewCode({ directory });
      
      // Step 2: Check for staged changes
      const stagedFiles = this.getStagedFiles();
      
      if (stagedFiles.length === 0) {
        console.log('\n⚠️  No staged changes found. Stage your changes first with `git add`');
        return;
      }

      console.log(`\n📋 Found ${stagedFiles.length} staged file(s):`);
      stagedFiles.forEach(file => console.log(`  - ${file}`));

      // Step 3: Generate commit message
      console.log('\n💡 Generating commit message...');
      const commitMessage = await generateCommitMessage();
      
      if (!commitMessage) {
        console.log('❌ Could not generate commit message');
        return;
      }

      console.log('\n📝 Suggested commit message:');
      console.log(`\n${commitMessage}\n`);

      // Step 4: Save review if requested
      if (saveReviewFile) {
        await this.saveReviewSummary(directory, commitMessage);
      }

      // Step 5: Interactive commit or auto-commit
      if (autoCommit) {
        await this.commitChanges(commitMessage);
      } else if (interactive) {
        await this.promptForCommit(commitMessage);
      }

    } catch (error) {
      console.error('❌ Workflow failed:', error);
    }
  }

  private getStagedFiles(): string[] {
    try {
      const output = execSync('git diff --cached --name-only', { encoding: 'utf8' });
      return output.trim().split('\n').filter(file => file.length > 0);
    } catch (err) {
      return [];
    }
  }

  private async saveReviewSummary(directory: string, commitMessage: string): Promise<void> {
    const feedback: ReviewFeedback = {
      summary: `Review completed for changes in ${directory}. Suggested commit: ${commitMessage}`,
      strengths: ['Code review completed successfully'],
      issues: ['See console output for detailed analysis'],
      suggestions: ['Apply suggested improvements before committing'],
      metadata: {
        reviewedAt: new Date().toISOString(),
        directory,
        reviewer: 'AI Agent (Gemini 2.5 Pro)',
      },
    };

    const reviewPath = saveReview(feedback);
    console.log(`📄 Review summary saved to: ${reviewPath}`);
  }

  private async commitChanges(message: string): Promise<void> {
    try {
      execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
      console.log('✅ Changes committed successfully!');
    } catch (err) {
      console.error('❌ Failed to commit changes:', err);
    }
  }

  private async promptForCommit(message: string): Promise<void> {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question('❓ Would you like to commit these changes? (y/n): ', (answer) => {
        rl.close();
        
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
          this.commitChanges(message).then(() => resolve());
        } else {
          console.log('⏭️  Skipping commit. You can commit manually later.');
          resolve();
        }
      });
    });
  }
}

// CLI usage when run directly
if (require.main === module) {
  const workflow = new ReviewWorkflow();
  
  const args = process.argv.slice(2);
  const directory = args[0] || '.';
  const saveReview = args.includes('--save-review');
  const autoCommit = args.includes('--auto-commit');
  
  workflow.reviewAndCommitWorkflow({
    directory,
    saveReviewFile: saveReview,
    autoCommit,
    interactive: !autoCommit,
  });
}