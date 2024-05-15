import { useQuery } from '@tanstack/react-query';

import type { HttpClientError } from '@/types/api.interface';

import { getSurvey } from '@/shared/api/survey';
import { QUERY_KEYS } from '@/shared/policy';

export const useSurvey = (surveyToken: string, onError?: (error: HttpClientError) => void) => {
  return useQuery(QUERY_KEYS.SURVEY(surveyToken), () => getSurvey(surveyToken).then((data) => data.data), { onError });
};
