import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import { legacyTypographyMixin, media } from '@/styles/legacy-mixins';

type ChipTheme = 'gray';

interface ChipStyleProps {
  theme: ChipTheme;
}

interface ChipProps {
  theme?: ChipTheme;
  children: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

const themeStyles: Record<ChipTheme, SerializedStyles> = {
  gray: css`
    color: var(--color-chip-gray-font);

    :hover {
      background-color: var(--color-chip-gray-background);
    }

    &.focus {
      background-color: var(--color-chip-gray-background);
      color: var(--legacy-color-gray-900);
    }
  `,
};

const ChipWrapper = styled.span<ChipStyleProps>`
  ${legacyTypographyMixin('body2')}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  border-radius: 0.4rem;
  font-weight: 700;
  cursor: pointer;

  ${(props) => themeStyles[props.theme as ChipTheme]}

  ${media('large')} {
    ${legacyTypographyMixin('body1')}
    padding: 1rem 1.6rem;
    border-radius: 0.6rem;
  }

  & a {
    color: inherit;
  }
`;

const Chip = ({ theme = 'gray', className, children, ...restProps }: ChipProps) => {
  return (
    <ChipWrapper theme={theme} className={`common-chip ${className}`} {...restProps}>
      {children}
    </ChipWrapper>
  );
};

export default Chip;
