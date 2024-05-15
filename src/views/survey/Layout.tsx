import styled from '@emotion/styled';
import React from 'react';

import { LoadingSpinner, SurveyContent } from '@/components';
import { useSurvey } from '@/shared/hooks/survey';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';

const SurveyLayoutBlock = styled.section`
  min-height: 60vh;
  padding: 2rem 1.6rem 9.6rem;

  ${media('large')} {
    max-width: 83.5rem;
    margin: 0 auto;
  }

  h2 {
    margin-bottom: 4rem;
    ${legacyTypographyMixin('headline2')}
    font-weight: 700;
  }
`;

const SurveyLayout = () => {
  const surveyToken = location.search.replace('?token=', '');

  const { isLoading, data } = useSurvey(surveyToken);

  if (isLoading) return <LoadingSpinner />;

  if (data)
    return (
      <SurveyLayoutBlock>
        <h2>{data.name}</h2>
        <SurveyContent
          surveyId={data.id}
          solveMemberId={data.extras.memberId}
          noticeMessage={data.extras.noticeMessage}
          resultMessage={data.extras.resultMessage}
          isAgreePrivacy={data.extras.isAgreePrivacy}
          privacyPolicyStatement={data.extras.privacyPolicyStatement}
          questionList={data.extras.question}
        />
      </SurveyLayoutBlock>
    );

  return null;
};

export default SurveyLayout;
