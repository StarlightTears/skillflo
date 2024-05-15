import styled from '@emotion/styled';
import React, { PropsWithChildren } from 'react';

import type { PropsWithStyle } from '@/types/component.interface';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface QnaQuestionFormFieldProps {
  label: string;
}

const QnaQuestionFormFieldBlock = styled.div`
  .label {
    margin: 0 0 0.4rem;

    ${legacyTypographyMixin('caption')}
    font-weight: 700;
    color: var(--legacy-color-gray-400);
  }
`;

const QnaQuestionFormField = ({ label, children }: PropsWithStyle<PropsWithChildren<QnaQuestionFormFieldProps>>) => {
  return (
    <QnaQuestionFormFieldBlock>
      <div className="label">{label}</div>
      <div className="input-wrapper">{children}</div>
    </QnaQuestionFormFieldBlock>
  );
};

export default QnaQuestionFormField;
