import styled from '@emotion/styled';
import React, { PropsWithChildren } from 'react';

import { Info } from '..';

import type { PropsWithStyle } from '@/types/component.interface';

import { typographyMixin } from '@/styles/mixins';

const InfoNoticeBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.6rem;
  border-radius: 0.6rem;
  background-color: var(--color-primary-600);
  color: var(--color-white);
  ${typographyMixin('p2', 'bold')};

  &.margin-bottom {
    margin-bottom: 2rem;
  }

  svg {
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 1rem;
  }
`;

const InfoNotice = ({ children, className }: PropsWithChildren<PropsWithStyle>) => {
  return (
    <InfoNoticeBlock className={className}>
      <Info />
      {children}
    </InfoNoticeBlock>
  );
};

export default InfoNotice;
