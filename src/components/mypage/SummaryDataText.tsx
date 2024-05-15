import styled from '@emotion/styled';
import React from 'react';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface MypageSummaryDataTextProps {
  value: string | number;
  suffix: string;
}

const MypageSummaryDataTextBlock = styled.span`
  ${legacyTypographyMixin('body2')}
  color: var(--color-blue-600);
  line-height: 2.4rem;

  .value {
    ${legacyTypographyMixin('headline6')}
    font-weight: 700;
  }
`;

const MypageSummaryDataText = ({ value, suffix }: MypageSummaryDataTextProps) => {
  return (
    <MypageSummaryDataTextBlock>
      <span className="value">{value}</span>
      <span className="suffix">{suffix}</span>
    </MypageSummaryDataTextBlock>
  );
};

export default MypageSummaryDataText;
