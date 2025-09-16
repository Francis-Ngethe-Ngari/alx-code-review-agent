#!/usr/bin/env node

import { Command } from 'commander';
import { ReviewWorkflow } from '../workflows/review-and-commit.js';
import { quickReview } from '../workflows/quick-review.js';
import { commitAssistant } from '../workflows/commit-assistant.js';
import { CodeReviewAgent } from '../core/agent.js';

const program = new Command();

program
  .name('my-agent')
  .description('AI-powered code review agent')
  .version('1.0.0');

program
  .command('review')
  .description('Quick code review of directory')
  .argument('[directory]', 'directory to review', '.')
  .action(async (directory: string) => {
    await quickReview(directory);
  });

program
  .command('commit')
  .description('Generate AI-powered commit message')
  .action(async () => {
    await commitAssistant();
  });

program
  .command('workflow')
  .description('Full review and commit workflow')
  .argument('[directory]', 'directory to review', '.')
  .option('--auto-commit', 'automatically commit without prompting')
  .option('--save-review', 'save review to markdown file')
  .action(async (directory: string, options: { autoCommit?: boolean; saveReview?: boolean }) => {
    const workflow = new ReviewWorkflow();
    await workflow.reviewAndCommitWorkflow({
      directory,
      autoCommit: options.autoCommit,
      saveReviewFile: options.saveReview,
      interactive: !options.autoCommit,
    });
  });

program
  .command('prompt')
  .description('Review with custom prompt')
  .argument('<prompt>', 'custom review prompt')
  .action(async (prompt: string) => {
    const agent = new CodeReviewAgent();
    await agent.reviewPrompt(prompt);
  });

// Handle CLI execution
if (require.main === module) {
  program.parse();
}