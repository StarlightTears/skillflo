import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface PersonalInfoContentProps {
  title: string;
  subInfo: string;
  children?: ReactNode;
  disabled?: boolean;
}

const PersonalInfoContentBlock = styled.div<{ disabled: boolean }>`
  padding: 0 1.6rem;
  opacity: ${(props) => (props.disabled ? '0.3' : '1')};
`;

const PersonalInfoContentTitle = styled.h6`
  ${legacyTypographyMixin('headline6')}
  margin-bottom: 0.8rem;
  font-weight: 700;
`;

const PersonalInfoContentSubInfo = styled.div`
  ${legacyTypographyMixin('caption')}
  margin-bottom: 2.4rem;
  color: var(--legacy-color-gray-600);
  white-space: pre-line;
`;

const PersonalInfoContent = ({ title, subInfo, disabled = false, children }: PersonalInfoContentProps) => {
  return (
    <PersonalInfoContentBlock disabled={disabled}>
      <PersonalInfoContentTitle>{title}</PersonalInfoContentTitle>
      <PersonalInfoContentSubInfo>{subInfo}</PersonalInfoContentSubInfo>
      {children}
    </PersonalInfoContentBlock>
  );
};

export default PersonalInfoContent;
