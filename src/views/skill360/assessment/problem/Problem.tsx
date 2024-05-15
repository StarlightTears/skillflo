import styled from '@emotion/styled';
import React from 'react';

import SkillAssessmentProblemAnswers from './Answers';
import SkillAssessmentProblemQuestion from './Question';

import { Button } from '@/components';
import { useAssessmentProgressState, useAssessmentQuesionSubmit } from '@/shared/hooks/skill360';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

const SkillAssessmentProblemBlock = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  .button-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  .submit-button {
    width: auto;
    height: 4.8rem;
    padding: 0 1.4rem;
    border-radius: 0.4rem;

    color: var(--color-white);
    ${renewalTypographyMixin('label', 2, true)};
  }
`;

const SkillAssessmentProblem = () => {
  const { submitAnswer, isLoadingRequest } = useAssessmentQuesionSubmit();
  const { currentQuestionAnswer } = useAssessmentProgressState();

  const isDisableSubmitButton = !currentQuestionAnswer || isLoadingRequest;

  return (
    <SkillAssessmentProblemBlock>
      <SkillAssessmentProblemQuestion />
      <SkillAssessmentProblemAnswers />
      <div className="button-wrapper">
        {/* TODO: 신규 디자인 시스템에 맞추어서 적용필요. */}
        <Button theme="primary" className="submit-button" onClick={submitAnswer} disabled={isDisableSubmitButton}>
          답안 제출
        </Button>
      </div>
    </SkillAssessmentProblemBlock>
  );
};

export default SkillAssessmentProblem;
