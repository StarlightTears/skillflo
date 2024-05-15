import type { Survey, SurveyQuestionAnswer } from '@/types/survey.interface';

import { CrudClientInstance } from '@/shared/api/index';

export const getSurvey = (token: string | null) => {
  return CrudClientInstance.get<Survey>('/survey', {
    token,
  });
};

export const submitSurveyQuestionAndCompleteSurvey = (
  surveyId: number,
  solveMemberId: string | number,
  payload: SurveyQuestionAnswer[]
) => {
  return CrudClientInstance.post(
    `/survey/${surveyId}/bulk-submit-and-complete`,
    { solveMemberId },
    { surveyQuestions: payload }
  );
};
