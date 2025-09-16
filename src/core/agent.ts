import { stepCountIs, streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { SYSTEM_PROMPT } from '../prompts/system.js';
import { getFileChangesInDirectoryTool } from '../tools/index.js';
import type { CodeReviewRequest } from '../types/common.js';

export class CodeReviewAgent {
  private model = google('models/gemini-2.5-pro');

  async reviewCode(request: CodeReviewRequest): Promise<void> {
    const { directory } = request;
    
    const result = streamText({
      model: this.model,
      prompt: `Review the code changes in '${directory}' directory, make your reviews and suggestions file by file`,
      system: SYSTEM_PROMPT,
      tools: {
        getFileChangesInDirectoryTool,
      },
      stopWhen: stepCountIs(10),
    });

    for await (const chunk of result.textStream) {
      process.stdout.write(chunk);
    }
  }

  async reviewPrompt(prompt: string): Promise<void> {
    const result = streamText({
      model: this.model,
      prompt,
      system: SYSTEM_PROMPT,
      tools: {
        getFileChangesInDirectoryTool,
      },
      stopWhen: stepCountIs(10),
    });

    for await (const chunk of result.textStream) {
      process.stdout.write(chunk);
    }
  }
}