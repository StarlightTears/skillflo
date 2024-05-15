import styled from '@emotion/styled';
import React from 'react';

import ExamInOutLayout from './InOut';
import ExamQuestionLayout from './Question';

import { useExamState, useResetExamWhenMovedPage } from '@/shared/hooks/classroom';

const ExamBlock = styled.div`
  width: 88rem;
`;

const ClassroomExam = () => {
  const { currentIndex, completedExam } = useExamState();
  useResetExamWhenMovedPage();

  return (
    <ExamBlock>{currentIndex !== undefined && !completedExam ? <ExamQuestionLayout /> : <ExamInOutLayout />}</ExamBlock>
  );
};

export default ClassroomExam;
