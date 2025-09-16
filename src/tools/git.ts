import { tool } from 'ai';
import { simpleGit } from 'simple-git';
import { z } from 'zod';
import type { FileChange } from '../types/common.js';

const excludeFiles = ['dist', 'bun.lock', 'node_modules'];

const fileChangeSchema = z.object({
  rootDir: z.string().min(1).describe('The root directory'),
});

type FileChangeInput = z.infer<typeof fileChangeSchema>;

async function getFileChangesInDirectory({ rootDir }: FileChangeInput): Promise<FileChange[]> {
  try {
    const git = simpleGit(rootDir);
    const summary = await git.diffSummary();
    const diffs: FileChange[] = [];

    for (const file of summary.files) {
      if (excludeFiles.some(exclude => file.file.includes(exclude))) {
        continue;
      }
      
      const diff = await git.diff(['--', file.file]);
      diffs.push({ file: file.file, diff });
    }

    return diffs;
  } catch (error) {
    console.error('Error getting file changes:', error);
    throw new Error(`Failed to get file changes: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export const getFileChangesInDirectoryTool = tool({
  description: 'Gets the code changes made in given directory',
  inputSchema: fileChangeSchema,
  execute: getFileChangesInDirectory,
});