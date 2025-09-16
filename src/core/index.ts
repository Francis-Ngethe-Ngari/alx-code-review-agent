import { CodeReviewAgent } from './agent.js';

const agent = new CodeReviewAgent();

// Specify which directory the code review agent should review changes in your prompt
await agent.reviewPrompt(
  'Review the code changes in \'../my-agent\' directory, make your reviews and suggestions file by file',
);

export { CodeReviewAgent };