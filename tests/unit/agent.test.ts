import { describe, it, expect, vi } from 'vitest';
import { CodeReviewAgent } from '../../src/core/agent.js';

// Mock the AI SDK
vi.mock('ai', () => ({
  streamText: vi.fn(),
  stepCountIs: vi.fn(),
}));

vi.mock('@ai-sdk/google', () => ({
  google: vi.fn(),
}));

describe('CodeReviewAgent', () => {
  it('should create an instance', () => {
    const agent = new CodeReviewAgent();
    expect(agent).toBeInstanceOf(CodeReviewAgent);
  });

  it('should have reviewCode method', () => {
    const agent = new CodeReviewAgent();
    expect(typeof agent.reviewCode).toBe('function');
  });

  it('should have reviewPrompt method', () => {
    const agent = new CodeReviewAgent();
    expect(typeof agent.reviewPrompt).toBe('function');
  });
});