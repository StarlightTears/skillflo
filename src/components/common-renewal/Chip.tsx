import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import { renewalTypographyMixin } from '@/styles/renewal-mixins';

type ChipTheme = 'rectangle' | 'capsule';

interface ChipProps {
  theme?: ChipTheme;
  children: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

const ChipWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  height: 3.3rem;
  padding: 0.8rem;
  border: 0.1rem solid var(--color-semantic-divider-default);
  border-radius: 0.4rem;
  cursor: pointer;
  ${renewalTypographyMixin('label', 4)}

  :hover {
    background-color: var(--color-semantic-informative-contrast);
  }
`;
//TODO: figma 참고해서 theme & size 추가 필요
const Chip = ({ theme = 'rectangle', className, children, ...restProps }: ChipProps) => {
  return (
    <ChipWrapper theme={theme} className={className} {...restProps}>
      {children}
    </ChipWrapper>
  );
};

export default Chip;
