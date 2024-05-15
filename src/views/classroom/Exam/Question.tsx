import styled from '@emotion/styled';
import React from 'react';

import { ExamStatus, ExamQuestion } from '@/components';
import { useExamState } from '@/shared/hooks/classroom';

const ClassroomExamQuestionLayoutBlock = styled.div`
  display: flex;
  padding: 7.2rem 1.6rem 18.2rem;
`;

const ExamQuestionCard = styled.div`
  align-self: start;
  width: 68rem;
  margin-right: 1.6rem;
  padding: 2rem 2.4rem;
  border-radius: 0.6rem;
  background-color: var(--color-white);
`;

const ClassroomExamQuestionLayout = () => {
  const { currentIndex } = useExamState();

  return (
    <ClassroomExamQuestionLayoutBlock>
      <ExamQuestionCard key={currentIndex}>
        <ExamQuestion />
      </ExamQuestionCard>
      <ExamStatus />
    </ClassroomExamQuestionLayoutBlock>
  );
};

export default ClassroomExamQuestionLayout;
