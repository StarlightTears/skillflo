import styled from '@emotion/styled';
import React from 'react';

import type { PropsWithStyle } from '@/types/component.interface';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

type GraphColor = 'red' | 'green' | 'blue';
type TextAlign = 'left' | 'center' | 'right';

interface MypageProgressGraphProps {
  color: GraphColor;
  value: number;
  textAlign?: TextAlign;
  maxValue: number;
}

const getGraphColorStyle = ({ color }: { color: GraphColor }) => `var(--color-${color}-600)`;

const MypageProgressGraphBlock = styled.div<{ color: GraphColor; textAlign: TextAlign }>`
  .graph {
    position: relative;
    overflow: hidden;
    height: 0.5rem;
    margin: 0 0 0.6rem;
    border-radius: 2.5rem;

    background-color: var(--legacy-color-gray-100);
  }

  .value-bar {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 2.5rem;
    background-color: ${getGraphColorStyle};
  }

  .text {
    ${legacyTypographyMixin('caption')}
    text-align: ${(props) => props.textAlign};
  }

  .current-value {
    font-weight: 700;
    color: ${getGraphColorStyle};
  }

  .max-value {
    color: var(--legacy-color-gray-400);
  }
`;

const MypageProgressGraph = ({
  color,
  value,
  maxValue,
  textAlign = 'left',
  className,
}: PropsWithStyle<MypageProgressGraphProps>) => {
  const valuePercentage = value !== 0 ? (value / maxValue) * 100 : 0;

  return (
    <MypageProgressGraphBlock color={color} textAlign={textAlign} className={className}>
      <div className="graph">
        <div className="value-bar" style={{ right: `${100 - valuePercentage}%` }} />
      </div>
      <div className="text">
        <span className="current-value">{parseFloat(valuePercentage.toFixed(1))}</span>
        <span className="max-value"> / 100(%)</span>
      </div>
    </MypageProgressGraphBlock>
  );
};

export default MypageProgressGraph;
