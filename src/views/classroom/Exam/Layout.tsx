import styled from '@emotion/styled';
import React from 'react';

import ClassroomExam from './Index';

import { ClassroomInvalidExam } from '@/components';
import { useViewport } from '@/shared/hooks';
import { classroomMedia } from '@/styles/mixins';

const ClassroomExamLayoutBlock = styled.section`
  display: flex;
  justify-content: center;
  overflow-y: auto;
  background-color: var(--legacy-color-gray-50);
  color: var(--legacy-color-gray-900);

  &::-webkit-scrollbar {
    display: none;
  }

  ${classroomMedia('small')} {
    height: 20.2rem;
  }

  ${classroomMedia('medium')} {
    width: 41.4rem;
    height: 23.2rem;
    margin: 0 auto;
  }

  ${classroomMedia('large')} {
    height: calc(100vh - var(--classroom-content-info-large-viewport-height));
  }
`;

const ClassroomExamLayout = () => {
  const { isLargeViewport } = useViewport();
  return (
    <ClassroomExamLayoutBlock>
      {isLargeViewport ? <ClassroomExam /> : <ClassroomInvalidExam />}
    </ClassroomExamLayoutBlock>
  );
};

export default ClassroomExamLayout;
