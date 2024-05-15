import styled from '@emotion/styled';
import React from 'react';

import { Chat } from '@/components';
import { useClassroomParams } from '@/shared/hooks/classroom';
import { useCourseQnaSummary } from '@/shared/hooks/course-detail';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { classroomMedia } from '@/styles/mixins';

const ClassroomQuestionAnswerBlock = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 1.6rem;
  padding: 1.2rem;
  ${legacyTypographyMixin('body2')}
  border-radius: 0.6rem;
  background-color: rgb(95 95 95 / 70%);
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: var(--color-blue-600);
  }

  ${classroomMedia('large')} {
    position: fixed;
    right: 1.6rem;
    bottom: 1.2rem;
    width: 36.8rem;
    margin: 0;
    box-shadow: 0 1.6rem 2rem 0 rgb(0 0 0 / 80%);
  }

  svg {
    margin-right: 1rem;
  }
`;

const ClassroomQuestionAnswer = () => {
  const { productId, courseId } = useClassroomParams();
  const { data: courseQnaSummary } = useCourseQnaSummary(courseId);

  if (!courseQnaSummary?.isExist) return null;

  return (
    <ClassroomQuestionAnswerBlock onClick={() => window.open(`/qna/${productId}/${courseId}`, '_blank')}>
      <Chat />
      질문이 있으신가요? 커뮤니티에 물어보세요.
    </ClassroomQuestionAnswerBlock>
  );
};

export default ClassroomQuestionAnswer;
