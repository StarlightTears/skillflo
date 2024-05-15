export interface Task {
  id: number;
  name: string;
  extras: {
    attachedImages: { name: string; url: string }[];
    attachedFiles: { name: string; url: string }[];
    attachedExplanationFiles: { name: string; url: string }[];
  };
}

export interface TaskExam {
  id: number;
  name: string;
}
export interface TaskQuestion {
  id: number;
  name: string;
  type: string;
  extras: {
    earnedScore: number;
    maxScore: number;
    score: number;
    question: string;
    comment: string;
    explanation: string;
    submittedAnswer: string;
    submittedAttachedTitle: string;
    submittedAttachedFiles: { name: string; url: string }[];
    evaluateState: string;
    attachedFiles: { name: string; url: string }[];
    attachedImages: { name: string; url: string }[];
    attachedExplanationFiles: { name: string; url: string }[];
    submittedAttachedFeedbackFiles: { name: string; url: string }[];
    url: string;
  };
}

export interface TaskAnswer {
  title: string;
  description: string;
  attachedFileList: File[];
}

export interface SolveQuestionPayload {
  type: string;
  submitAnswer: string;
  attachedTitle: string;
  attachedFiles?: {
    name: string;
    url: string;
  }[];
}
