import { Attached, EvaluateState, ProgressStatus } from './common.interface';

export interface SetQuestion {
  level: 2 | 4 | 6 | 8 | 10;
  type: 'MULTIPLE' | 'INPUT' | 'TEXT';
  count: number;
  score: number;
}

export interface ExamTaskMeta {
  id: number;
  name: string;
  extras: {
    category: 'TASK' | 'SELECTION';
    courseId: number;
    courseTitle: string | null;
    partId?: string;
    chapterId?: string;
    courseContentId?: number;
    courseContentName?: string;
    cansolvedCount: number;
    timeLimit: number;
    progressStatus: ProgressStatus | null;
    evaluationStatus: 'UNEVALUATED' | 'COMPLETE' | 'NONE' | null;
    createdAt: Date | null;
    completedAt: Date | null;
    earnedScore: number | null;
    totalScore: number | null;
    percentageScore: number | null;
  };
}

export type QuestionType = 'MULTIPLE' | 'INPUT' | 'TEXT';

export interface ExamProgressResponse {
  exam: {
    id: number;
    name: string;
    state: string;
    type: string;
    extras: {
      canSolvedCount: number;
      timeLimit: number;
      setQuestion: SetQuestion[];
      description: string;
      isAutoMark: boolean;
      isRetry: boolean;
    };
  };
  questions: ExamQuestion[];
  progress: {
    endAt: string | undefined;
  };
}

export interface ExamQuestion {
  id: number;
  type: QuestionType;
  extras: {
    attachedFiles?: Attached[];
    attachedImages?: Attached[];
    attachedExplanationFiles?: Attached[];
    question: string;
    additionalQuestion: string;
    explanation: string;
    exampleAnswers: QuestionExampleAnswer[];
    isShuffle: boolean;
    level: 2 | 4 | 6 | 8 | 10;
    url: string;
    earnedScore: number;
    maxScore: number;
    answerCount: number;
    similarAnswers: string[];
    answer: string;
    submittedAnswer: string;
    evaluateState: EvaluateState;
    comment: string;
  };
}

export interface QuestionExampleAnswer {
  id: number;
  answer: string;
}

export interface QuestionResult {
  id: number;
  questionId: number;
  isCorrect: boolean;
  score: number;
  answer: string;
}

export interface ExamBridgeInfo {
  id: number;
  name: string;
  extras: {
    canSolvedCount: number;
    category: string;
    courseTitle: string;
    description: string;
    timeLimit: number;
    totalScore: number;
    totalQuestion: number;
  };
}
