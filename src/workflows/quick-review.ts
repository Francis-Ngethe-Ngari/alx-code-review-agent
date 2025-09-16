import { CodeReviewAgent } from '../core/agent.js';

export async function quickReview(directory = '.'): Promise<void> {
  console.log(`🔍 Quick review of ${directory}...\n`);
  
  const agent = new CodeReviewAgent();
  await agent.reviewCode({ directory });
  
  console.log('\n✅ Quick review completed!');
}

// CLI usage
if (require.main === module) {
  const directory = process.argv[2] || '.';
  quickReview(directory);
}