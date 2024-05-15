import styled from '@emotion/styled';
import React from 'react';

import { QuestionOutlined } from '@/components';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

const TooltipWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;

  p {
    position: absolute;
    z-index: 99;
    display: none;
    width: max-content;
    max-width: 24rem;
    padding: 0.8rem;
    border-radius: 0.4rem;
    background-color: #2d3136;
    color: var(--color-semantic-informative-contrast);
    word-break: keep-all;
    transform: translateY(60%);
    ${renewalTypographyMixin('caption', 1)};
  }

  &:hover {
    p {
      display: block;
    }
  }
`;

const Tooltip = ({ message }: { message: string }) => {
  return (
    <TooltipWrapper>
      <QuestionOutlined />
      <p>{message}</p>
    </TooltipWrapper>
  );
};

export default Tooltip;
