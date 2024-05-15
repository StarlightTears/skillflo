import styled from '@emotion/styled';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { Container, QnaCourseIntro } from '@/components';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';

const QnaLayoutBlock = styled.div`
  padding: 2.4rem 0 0;

  .page-title {
    margin: 0 0 2rem;

    ${legacyTypographyMixin('headline4')}
    font-weight: 700;
  }

  ${media('large')} {
    padding: 2rem 0 0;

    .page-title {
      ${legacyTypographyMixin('headline2')}
    }
  }
`;

const QnaLayout = () => {
  return (
    <QnaLayoutBlock>
      <Container>
        <h2 className="page-title">질문하고 답하기</h2>
        <QnaCourseIntro />
      </Container>
      <Outlet />
    </QnaLayoutBlock>
  );
};

export default QnaLayout;
