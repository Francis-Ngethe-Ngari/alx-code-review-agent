import { z } from 'zod';

const envSchema = z.object({
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1, 'Google Gemini API key is required'),
  GEMINI_MODEL: z.string().default('models/gemini-2.5-pro'),
  GEMINI_MAX_TOKENS: z.coerce.number().default(8192),
  GEMINI_TEMPERATURE: z.coerce.number().min(0).max(2).default(0.7),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  DEFAULT_EXCLUDE_FILES: z.string().default('dist,bun.lock,node_modules,.git'),
  MAX_FILE_SIZE_MB: z.coerce.number().default(10),
});

export type Config = z.infer<typeof envSchema>;

export function loadConfig(): Config {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map(issue => issue.path.join('.')).join(', ');
      throw new Error(`Missing or invalid environment variables: ${missingVars}`);
    }
    throw error;
  }
}

export const config = loadConfig();