import styled from '@emotion/styled';
import React from 'react';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const ErrorMsgStyle = styled.span`
  color: var(--color-error-message-color);
  ${legacyTypographyMixin('caption')};
`;

const ErrorMsg = ({ className, children, ...restProps }: { className?: string; children: React.ReactNode }) => {
  return (
    <ErrorMsgStyle className={className} {...restProps}>
      {children}
    </ErrorMsgStyle>
  );
};

export default ErrorMsg;
