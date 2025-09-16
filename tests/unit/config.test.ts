import { describe, it, expect } from 'vitest';
import { loadConfig } from '../../src/utils/config.js';

describe('Config Utils', () => {
  it('should load default config values', () => {
    // Set required env var for test
    process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'test-key';
    
    const config = loadConfig();
    
    expect(config.GOOGLE_GENERATIVE_AI_API_KEY).toBe('test-key');
    expect(config.GEMINI_MODEL).toBe('models/gemini-2.5-pro');
    expect(config.GEMINI_MAX_TOKENS).toBe(8192);
    expect(config.NODE_ENV).toBe('development');
  });

  it('should throw error when required env vars are missing', () => {
    delete process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    
    expect(() => loadConfig()).toThrow('Missing or invalid environment variables');
  });
});