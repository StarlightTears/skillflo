import styled from '@emotion/styled';
import React from 'react';

import { AnswerList } from '@/components';
import { useAssessmentQuestion, useAssessmentQuestionInput } from '@/shared/hooks/skill360';

const SkillAssessmentProblemAnswersBlock = styled.div``;

const SkillAssessmentProblemAnswers = () => {
  const { currentQuestion } = useAssessmentQuestion();
  const answerList = currentQuestion?.extras.exampleAnswers;
  const { selectedAnswers, selectAnswer } = useAssessmentQuestionInput();

  return (
    <SkillAssessmentProblemAnswersBlock>
      <AnswerList answerList={answerList || []} selectedAnswerList={selectedAnswers} onSelectAnswer={selectAnswer} />
    </SkillAssessmentProblemAnswersBlock>
  );
};

export default SkillAssessmentProblemAnswers;
