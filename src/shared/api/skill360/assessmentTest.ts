import { CrudClientInstance } from '@/shared/api';
import { ApiData } from '@/types/api.interface';
import { QuestionExampleAnswer, QuestionResult } from '@/types/exam.interface';
import { AssessmentExamResult, AssessmentProgress } from '@/types/skill360.interface';

interface FetchAssessmentOptions {
  skillId: number;
  examId: number;
  memberAssessmentId: number;
}

export const fetchAssessmentProgress = async ({ skillId, examId, memberAssessmentId }: FetchAssessmentOptions) => {
  const response = await CrudClientInstance.getSkill360<ApiData<AssessmentProgress>>(`/exam/${examId}/apply`, {
    skillId,
    memberAssessmentId,
  });

  return response.data;
};

// * hermes 서버에 저장된 assessment 관련 데이터를 가져오는 api 메서드
export const fetchAssessmentExamResult = async ({ skillId, examId, memberAssessmentId }: FetchAssessmentOptions) => {
  const response = await CrudClientInstance.getSkill360<ApiData<AssessmentExamResult>>(`/exam/${examId}/info`, {
    skillId,
    memberAssessmentId,
  });

  return response.data.data;
};

interface SolveAssessmentQuestionOptions {
  skillId: number;
  memberAssessmentId: number;
  examId: number;
  questionId: number;
  type: string;
  submitAnswer: string;
  exampleAnswers?: QuestionExampleAnswer[];
}

export const solveAssessmentQuestion = async ({
  skillId,
  memberAssessmentId,
  examId,
  questionId,
  type,
  submitAnswer,
  exampleAnswers,
}: SolveAssessmentQuestionOptions) => {
  const response = await CrudClientInstance.postSkill360<ApiData<QuestionResult>>(
    `/exam/${examId}/question/${questionId}/solve?skillId=${skillId}&memberAssessmentId=${memberAssessmentId}`,
    {},
    {
      type,
      submitAnswer,
      exampleAnswers,
    }
  );

  return response.data;
};

interface CompleteAssessmentOptions {
  skillId: number;
  examId: number;
  memberAssessmentId: number;
  earnedLevel: number;
}

export const completeAssessment = async ({
  skillId,
  examId,
  earnedLevel,
  memberAssessmentId,
}: CompleteAssessmentOptions) => {
  const urlSearchParams = new URLSearchParams({
    skillId: skillId.toString(),
    memberAssessmentId: memberAssessmentId.toString(),
  });

  await CrudClientInstance.putSkill360(`/exam/${examId}/solve/complete?${urlSearchParams.toString()}`);
  await CrudClientInstance.putSkill360(`/match/complete?${urlSearchParams.toString()}`, {}, { earnedLevel });
};
