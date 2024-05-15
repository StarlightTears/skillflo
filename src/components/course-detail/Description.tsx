import styled from '@emotion/styled';
import React from 'react';

import type { PropsWithStyle } from '@/types/component.interface';

import { homeMedia, typographyMixin } from '@/styles/mixins';

interface DescriptionProps {
  term: React.ReactNode | string;
  description: React.ReactNode;
  isFirstDescription?: boolean;
  onClick?: () => void;
}

const DescriptionBlock = styled.dl`
  display: flex;
  flex-direction: column;
  padding: 2.8rem 2rem;

  &.hover:hover {
    background-color: var(--color-primary-700-transparency-5);
    cursor: pointer;
  }

  dt {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.2rem;
    ${typographyMixin('p1', 'bold')};
  }

  dd {
    flex: 1;
  }

  ${homeMedia('large', 'xlarge')} {
    flex-direction: row;

    dt {
      flex: 10rem 0 0;
      align-items: flex-start;
      margin-right: 2rem;
      margin-bottom: 0;
    }
  }
`;

const Description = ({ className, term, description, onClick }: PropsWithStyle<DescriptionProps>) => {
  return (
    <DescriptionBlock className={className} onClick={onClick}>
      <dt>{term}</dt>
      <dd>{description}</dd>
    </DescriptionBlock>
  );
};

export default Description;
