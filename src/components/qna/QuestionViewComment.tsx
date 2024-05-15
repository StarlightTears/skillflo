import styled from '@emotion/styled';
import React from 'react';

import { Container, QnaQuestionViewCommentList, QnaQuestionViewCommentForm } from '@/components';
import { media } from '@/styles/legacy-mixins';

const QnaQuestionViewCommentBlock = styled.article`
  padding: 2rem 0 8rem;
  background-color: var(--legacy-color-gray-50);

  ${media('large')} {
    padding-top: 3rem;
  }
`;

const QnaQuestionViewComment = () => {
  return (
    <QnaQuestionViewCommentBlock>
      <Container>
        <QnaQuestionViewCommentList />
        <QnaQuestionViewCommentForm />
      </Container>
    </QnaQuestionViewCommentBlock>
  );
};

export default QnaQuestionViewComment;
