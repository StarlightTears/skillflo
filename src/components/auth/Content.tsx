import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface AuthContentProps {
  title: string;
  subInfo?: string;
  children?: ReactNode;
}

const AuthContentBlock = styled.div`
  height: 100%;
`;

const AuthContentTitle = styled.h5`
  ${legacyTypographyMixin('headline5')}
  margin-bottom: 0.8rem;
  font-weight: 700;
  color: var(--legacy-color-gray-900);
  white-space: pre-line;
`;

const AuthContentSubInfo = styled.div`
  ${legacyTypographyMixin('body2')}
  color: var(--legacy-color-gray-600);
  white-space: pre-line;
`;

const AuthContent = ({ title, subInfo, children }: AuthContentProps) => {
  return (
    <AuthContentBlock>
      <AuthContentTitle>{title}</AuthContentTitle>
      {subInfo && <AuthContentSubInfo>{subInfo}</AuthContentSubInfo>}
      {children}
    </AuthContentBlock>
  );
};

export default AuthContent;
