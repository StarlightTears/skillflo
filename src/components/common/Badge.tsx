import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import type { BadgeTheme, BadgeSize, Scale } from '@/types/design-system.type';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface BadgeProps {
  theme?: BadgeTheme;
  colorScale?: Scale;
  bgColorScale?: Scale;
  size?: BadgeSize;
  className?: string;
  children: ReactNode;
}

const getBadgeTypeStyle = ({ theme, bgColorScale, colorScale }: BadgeProps) => {
  switch (theme) {
    case 'blue': {
      return css`
        background-color: var(--color-blue-600);
        color: var(--color-white);
      `;
    }
    case 'gray': {
      return `
        background-color: ${bgColorScale ? `var(--color-gray-${bgColorScale})` : `var(--legacy-color-gray-50)`};
        color: ${colorScale ? `var(--color-gray-${colorScale})` : `var(--color-white)`};
      `;
    }
    case 'lightred': {
      return css`
        background-color: var(--color-lightred-background);
        color: var(--color-red-600);
      `;
    }
    case 'lightgreen': {
      return css`
        background-color: var(--color-lightgreen-background);
        color: var(--color-green-600);
      `;
    }
    case 'lightblue': {
      return css`
        background-color: var(--color-lightblue-background);
        color: var(--color-blue-600);
      `;
    }
    case 'whiteblue': {
      return css`
        background-color: var(--color-white);
        box-shadow: 0 0 0 0.1rem var(--color-blue-600) inset;
        color: var(--color-blue-600);
      `;
    }
    default:
      return css``;
  }
};

const getBadgeSizeStyle = ({ size }: BadgeProps) => {
  switch (size) {
    case 'medium':
      return css`
        ${legacyTypographyMixin('caption')}
        height: 2.4rem;

        svg {
          margin-left: 0.4rem;
        }
      `;
    case 'small':
    default:
      return css`
        ${legacyTypographyMixin('label')}
        height: 2rem;
      `;
  }
};

const BadgeInline = styled.span`
  ${getBadgeTypeStyle}
  ${getBadgeSizeStyle}
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.6rem;
  border-radius: 0.4rem;
  font-weight: 700;
`;

const Badge = ({ theme = 'blue', size = 'small', bgColorScale, colorScale, children, className }: BadgeProps) => {
  return (
    <BadgeInline theme={theme} className={className} size={size} bgColorScale={bgColorScale} colorScale={colorScale}>
      {children}
    </BadgeInline>
  );
};

export default Badge;
