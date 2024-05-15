import styled from '@emotion/styled';
import React from 'react';

import { QuestionEllipseBlue, ArrowRight } from '@/components/index';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const IntroBlock = styled.div`
  padding: 1.2rem 1.2rem 0.6rem;
  border-radius: 1rem;
  background-color: var(--color-blue-50);
  cursor: pointer;

  .intro-header {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
    font-weight: 700;
    ${legacyTypographyMixin('Large')};

    svg {
      margin-right: 1.1rem;
    }
  }

  .intro-header + div {
    display: flex;
    align-items: center;
    margin-left: 3.2rem;
    color: var(--color-blue-600);
    ${legacyTypographyMixin('Small')}
  }
`;

const Intro = () => {
  return (
    <IntroBlock onClick={() => window.open('https://b2b.fastcampus.co.kr/service_subs')}>
      <div className="intro-header">
        <QuestionEllipseBlue />
        패스트캠퍼스 for Business란?
      </div>
      <div>
        자세히 보기
        <ArrowRight />
      </div>
    </IntroBlock>
  );
};

export default Intro;
