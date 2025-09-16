export interface FileChange {
  file: string;
  diff: string;
}

export interface GitDiffSummary {
  files: Array<{
    file: string;
    changes: number;
    insertions: number;
    deletions: number;
  }>;
}

export interface CodeReviewRequest {
  directory: string;
  excludeFiles?: string[];
}

export interface CodeReviewResponse {
  reviews: FileReview[];
  summary: string;
}

export interface FileReview {
  file: string;
  suggestions: ReviewSuggestion[];
  rating: 'good' | 'needs-improvement' | 'critical';
}

export interface ReviewSuggestion {
  line?: number;
  type: 'bug' | 'improvement' | 'style' | 'security' | 'performance';
  message: string;
  severity: 'low' | 'medium' | 'high';
}