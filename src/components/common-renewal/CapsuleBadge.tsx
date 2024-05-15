import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import { renewalTypographyMixin } from '@/styles/renewal-mixins';
import { BadgeSize, CapsuleBadgeTheme } from '@/types/design-system.type';

interface CapsuleBadgeProps {
  className?: string;
  theme?: CapsuleBadgeTheme;
  size?: BadgeSize;
  children: ReactNode;
}
//TODO: figma 참고해서 theme & size 추가 필요
const getBadgeTypeStyle = ({ theme }: CapsuleBadgeProps) => {
  switch (theme) {
    case 'gray': {
      return css`
        background-color: var(--color-semantic-informative-primary);
        color: var(--color-white);
      `;
    }
    case 'gray-low': {
      return css`
        background-color: var(--color-semantic-informative-contrast);
        color: var(--color-semantic-informative-primary);
      `;
    }
    case 'blue': {
      return css`
        background-color: var(--color-semantic-informative-accent);
        color: var(--color-white);
      `;
    }
    case 'blue-low': {
      return css`
        background-color: var(--color-semantic-informative-accent-low);
        color: var(--color-semantic-informative-accent);
      `;
    }
    case 'green': {
      return css`
        background-color: var(--color-semantic-informative-success);
        color: var(--color-white);
      `;
    }
    case 'green-low': {
      return css`
        background-color: var(--color-semantic-informative-success-low);
        color: var(--color-semantic-informative-success);
      `;
    }
    case 'red': {
      return css`
        background-color: var(--color-semantic-informative-alert);
        color: var(--color-white);
      `;
    }
    case 'red-low': {
      return css`
        background-color: var(--color-semantic-informative-alert-low);
        color: var(--color-semantic-informative-alert);
      `;
    }
    default:
      return css``;
  }
};

const getBadgeSizeStyle = ({ size }: CapsuleBadgeProps) => {
  switch (size) {
    case 'medium':
      return css`
        height: 2.1rem;
        ${renewalTypographyMixin('label', 4, true)}
      `;
    case 'small':
    default:
      return css`
        height: 1.8rem;
        ${renewalTypographyMixin('label', 5, true)}
      `;
  }
};

const CapsuleBadgeBlock = styled.span`
  ${getBadgeTypeStyle}
  ${getBadgeSizeStyle}
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.6rem;
  border-radius: 999rem;
`;

const CapsuleBadge = ({ children, className, theme = 'blue', size = 'small' }: CapsuleBadgeProps) => {
  return (
    <CapsuleBadgeBlock theme={theme} className={className} size={size}>
      {children}
    </CapsuleBadgeBlock>
  );
};

export default CapsuleBadge;
