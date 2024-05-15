import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowRightSmallPrimary, ChatPrimary } from '..';

import type { PropsWithStyle } from '@/types/component.interface';

import { useCourseDetailParams } from '@/shared/hooks/course-detail';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const QnaBlock = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem;
  border: 0.1rem solid var(--color-blue-600);
  border-radius: 0.6rem;
  font-weight: 500;
  color: var(--color-blue-600);
  cursor: pointer;

  ${legacyTypographyMixin('button')}

  div {
    display: flex;
    gap: 0.6rem;
    align-items: center;
  }

  &:hover {
    background-color: var(--color-primary-700-transparency-5);
  }
`;

const Qna = ({ className }: PropsWithStyle) => {
  const { courseId, productId } = useCourseDetailParams();
  const navigate = useNavigate();

  return (
    <QnaBlock className={className} onClick={() => navigate(`/qna/${productId}/${courseId}`)}>
      <div>
        <ChatPrimary style={{ width: 16, height: 16 }} />
        질의응답 게시판.
      </div>
      <ArrowRightSmallPrimary style={{ width: 20, height: 20 }} />
    </QnaBlock>
  );
};

export default Qna;
