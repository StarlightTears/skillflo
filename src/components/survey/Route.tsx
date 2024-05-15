import React from 'react';

import type { HttpClientError } from '@/types/api.interface';

import { LoadingSpinner } from '@/components';
import { useToken } from '@/shared/hooks';
import { useSurvey } from '@/shared/hooks/survey';
import SurveyLayout from '@/views/survey/Layout';

const SurveyRoute = () => {
  const surveyToken = location.search.replace('?token=', ''); // 이 방식은 searchParams로 추출시 +기호가 공백처리 되는 이슈가 있어 임시적용. 추후 제로베이스 적용상황에 맞춰서 수정예정
  const { logout } = useToken();

  const onSurveyError = (error: HttpClientError) => {
    if (error.response?.data?.message === '회원 전용 설문폼 입니다.') {
      logout(`?redirectUrl=member-survey&token=${surveyToken}`);
    }
  };

  const { isLoading, data } = useSurvey(surveyToken, onSurveyError);

  if (isLoading) return <LoadingSpinner className="full-viewport" />;

  if (data) return <SurveyLayout />;

  return null;
};

export default SurveyRoute;
