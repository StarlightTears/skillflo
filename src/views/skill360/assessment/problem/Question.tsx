import styled from '@emotion/styled';
import React from 'react';

import { ImageList } from '@/components';
import { useAssessmentQuestion } from '@/shared/hooks/skill360';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

const SkillAssessmentProblemQuestionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  color: var(--color-semantic-informative-primary);

  .main-question {
    ${renewalTypographyMixin('body', 2, true)}
  }

  .additional-question {
    padding: 1.6rem;
    border-radius: 0.6rem;
    background-color: var(--color-semantic-paper-surface-default);
    white-space: pre-wrap;
    word-break: break-all;

    ${renewalTypographyMixin('body', 3)}
  }
`;

const SkillAssessmentProblemQuestion = () => {
  const { currentQuestion } = useAssessmentQuestion();

  const imageList = currentQuestion?.extras.attachedImages?.map((image) => image.url) ?? [];

  return (
    <SkillAssessmentProblemQuestionBlock>
      <p className="main-question">{currentQuestion?.extras.question}</p>
      {currentQuestion?.extras.additionalQuestion && (
        <pre className="additional-question">{currentQuestion?.extras.additionalQuestion}</pre>
      )}
      {!!imageList.length && <ImageList imageList={imageList} />}
    </SkillAssessmentProblemQuestionBlock>
  );
};

export default SkillAssessmentProblemQuestion;
