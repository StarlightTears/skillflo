import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';

import { ArrowRight } from '..';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface Props {
  to: string;
  e2eTestId: string;
  title?: string;
}

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 15rem;
  height: 3.2rem;
  margin: 4rem auto 0;
  padding: 0 1.6rem 0 2.4rem;
  border: 0.1rem solid var(--color-border-grey);
  border-radius: 2.4rem;
  ${legacyTypographyMixin('Small')}
  font-weight: 500;
  color: var(--color-text-black);

  :hover {
    border: none;
    background-color: var(--color-surface-blue);
    color: var(--color-white);
  }
`;

const ViewAllListLink = ({ to, e2eTestId, title = '전체보기' }: Props) => {
  return (
    <StyledLink to={to} data-e2e={e2eTestId}>
      {title}
      <ArrowRight />
    </StyledLink>
  );
};

export default ViewAllListLink;
