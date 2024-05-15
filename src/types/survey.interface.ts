export interface Survey {
  id: number;
  name: string;
  description: string;
  extras: {
    createdAt: string;
    isAgreePrivacy: boolean;
    isLimitResponse: boolean;
    memberId: string | number;
    noticeMessage: string;
    resultMessage: string;
    privacyPolicyStatement: string;
    isNonMember: boolean;
    question: SurveyQuestion[];
  };
}

export type SurveyQuestionType = 'SINGLE' | 'MULTIPLE' | 'TEXT' | 'INPUT' | 'RANGE';

export interface SurveyQuestion {
  id: number;
  type: SurveyQuestionType;
  name: string;
  questionId: number;
  sequence: number;
  rightLabel: string;
  leftLabel: string;
  isRequired: boolean;
  examples: SurveyQuestionExample[];
  startNumber: number;
  selectionCount: number;
}

export interface SurveyQuestionAnswer {
  questionId: number;
  type: SurveyQuestionType;
  submitAnswer: string;
  examples: SurveyQuestionExample[];
}

export interface SurveyQuestionExample {
  id: number;
  answer: string;
  comment: string;
  label: string;
}

export interface InvalidQuestionAnswer {
  id: number;
  message: string;
  focusElement: HTMLElement;
}
