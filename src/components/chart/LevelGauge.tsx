import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import type { Skill360ColorTheme } from '@/types/skill360.interface';

import { GaugeGraph0, GaugeGraph1, GaugeGraph2, GaugeGraph3, GaugeGraph4, GaugeGraph5, Tooltip } from '@/components';
import { INFORMATIVE_COLOR_PLATTE } from '@/shared/policy';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

interface LevelGaugeWrapperProps {
  size: 'small' | 'medium';
  skillGapColor: string;
}

const LevelGaugeWrapper = styled.div<LevelGaugeWrapperProps>`
  position: relative;
  width: ${({ size }) => (size === 'small' ? '12.6rem' : '16rem')};
  height: ${({ size }) => (size === 'small' ? '12.6rem' : '16rem')};

  svg {
    width: ${({ size }) => (size === 'small' ? '12.6rem' : '16rem')};
    height: ${({ size }) => (size === 'small' ? '10.6rem' : '13.5rem')};
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .label {
      ${renewalTypographyMixin('caption', 1)}
      display: flex;
      gap: 0.4rem;
      align-items: center;
      justify-content: center;
      color: var(--color-semantic-informative-secondary);
    }

    .value {
      ${renewalTypographyMixin('title', 2)}
      color: ${({ skillGapColor }) => skillGapColor};

      &.none {
        color: var(--color-semantic-informative-teritary);
      }
    }
  }

  #gauge-graph-value {
    fill: ${({ skillGapColor }) => skillGapColor};
  }
`;

interface LevelGaugeProps {
  size?: 'small' | 'medium';
  label: string;
  level?: number;
  tooltipMessage: string;
  colorTheme?: Skill360ColorTheme;
}

const LevelGauge = ({ size = 'medium', label, tooltipMessage, level, colorTheme = 'gray' }: LevelGaugeProps) => {
  const GaugeGraphMap: { [key: number]: ReactNode } = {
    0: <GaugeGraph0 />,
    1: <GaugeGraph1 />,
    2: <GaugeGraph2 />,
    3: <GaugeGraph3 />,
    4: <GaugeGraph4 />,
    5: <GaugeGraph5 />,
  };

  return (
    <LevelGaugeWrapper size={size} skillGapColor={INFORMATIVE_COLOR_PLATTE[colorTheme]}>
      <div className="content">
        <div className="label">
          {label} <Tooltip message={tooltipMessage} />
        </div>
        {level === undefined ? <div className="value none">-</div> : <div className="value">Lv.{level}</div>}
      </div>
      {GaugeGraphMap[level ?? 0]}
    </LevelGaugeWrapper>
  );
};

export default LevelGauge;
