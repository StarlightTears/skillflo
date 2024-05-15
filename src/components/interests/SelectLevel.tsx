import styled from '@emotion/styled';
import React from 'react';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface InterestsSelectLevelProps {
  label: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const InterestsSelectLevelBlock = styled.div`
  padding-top: 2.4rem;
`;

const InterestsSelectLevelLabel = styled.div`
  ${legacyTypographyMixin('caption')}
  font-weight: 700;
  color: var(--color-blue-600);
`;

const InterestsSelectLevelTitle = styled.div`
  ${legacyTypographyMixin('body1')}
  margin-bottom: 2.4rem;
  font-weight: 700;
`;

const InterestsSelectLevel = ({ label, title, children, className }: InterestsSelectLevelProps) => {
  return (
    <InterestsSelectLevelBlock className={className}>
      <InterestsSelectLevelLabel>{label}</InterestsSelectLevelLabel>
      <InterestsSelectLevelTitle>{title}</InterestsSelectLevelTitle>
      {children}
    </InterestsSelectLevelBlock>
  );
};

export default InterestsSelectLevel;
