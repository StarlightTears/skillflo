import styled from '@emotion/styled';
import React from 'react';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface ExamInfoProps {
  name: string;
  subInfo: string;
  children: React.ReactNode;
}

const ExamInfoBlock = styled.section`
  flex: 1;

  .name {
    ${legacyTypographyMixin('headline5')}
    font-weight: 700;
  }

  .sub-info {
    ${legacyTypographyMixin('body2')}
    color: var(--legacy-color-gray-600);
  }

  .hr {
    margin: 3.6rem 0;
  }
`;

const ExamInfo = ({ name, subInfo, children }: ExamInfoProps) => {
  return (
    <ExamInfoBlock>
      <div className="name">{name}</div>
      <div className="sub-info">{subInfo}</div>
      {children}
    </ExamInfoBlock>
  );
};

export default ExamInfo;
