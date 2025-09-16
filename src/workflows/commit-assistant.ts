import { generateCommitMessage } from '../utils/commit-gen.js';
import { execSync } from 'node:child_process';

export async function commitAssistant(): Promise<void> {
  console.log('💡 AI Commit Assistant\n');
  
  // Check for staged changes
  try {
    const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' });
    
    if (!stagedFiles.trim()) {
      console.log('⚠️  No staged changes found. Use `git add` to stage files first.');
      return;
    }

    console.log('📋 Staged files:');
    stagedFiles.trim().split('\n').forEach(file => {
      console.log(`  - ${file}`);
    });

    console.log('\n🤖 Generating commit message...');
    const message = await generateCommitMessage();
    
    if (message) {
      console.log('\n📝 Suggested commit message:');
      console.log(`\n${message}\n`);
      console.log('💡 Copy this message for your commit or use our workflow script!');
    }

  } catch (err) {
    console.error('❌ Error:', err);
  }
}

// CLI usage
if (require.main === module) {
  commitAssistant();
}