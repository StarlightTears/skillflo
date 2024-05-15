import styled from '@emotion/styled';
import React from 'react';

import { renewalTypographyMixin } from '@/styles/renewal-mixins';

const LegendWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: center;
`;

const LegendStyle = styled.span<{ color: string }>`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  ${renewalTypographyMixin('caption', 2)}

  ::before {
    content: '';
    width: 1rem;
    height: 1rem;
    border-radius: 0.2rem;
    background-color: ${({ color }) => color};
  }
`;

const Legend = ({ legendInfo }: { legendInfo: { label: string; color: string }[] }) => {
  return (
    <LegendWrapper className="chart-legend">
      {legendInfo.map((info) => (
        <LegendStyle color={info.color} className="legend-label" key={`legend-${info.label}`}>
          {info.label}
        </LegendStyle>
      ))}
    </LegendWrapper>
  );
};

export default Legend;
