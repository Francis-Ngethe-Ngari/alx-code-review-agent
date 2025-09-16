import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { execSync } from 'node:child_process';

// Extract staged git diff
function getStagedDiff(): string {
  try {
    return execSync('git diff --cached', { encoding: 'utf8' });
  } catch (err) {
    console.error('Error getting git diff:', err);
    return '';
  }
}

export async function generateCommitMessage(diff?: string): Promise<string | null> {
  const gitDiff = diff || getStagedDiff();
  
  if (!gitDiff.trim()) {
    console.log('No staged changes found.');
    return null;
  }

  const response = await generateText({
    model: google('models/gemini-2.5-pro'),
    prompt: `
You are an expert software developer. Write a clear, concise commit message 
based on the following diff. Follow Conventional Commits style (feat, fix, chore, docs, refactor, etc.).

Diff:
${gitDiff}
    `,
  });

  return response.text;
}

// CLI usage when run directly
if (require.main === module) {
  (async () => {
    const message = await generateCommitMessage();
    if (message) {
      console.log('\nSuggested Commit Message:\n');
      console.log(message);
    }
  })();
}