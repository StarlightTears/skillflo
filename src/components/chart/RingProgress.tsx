import styled from '@emotion/styled';
import React from 'react';

import { RingProgress as RingProgressComponent, RingProgressConfig } from '@fastcampus/fastcomponents';

import type { Skill360ColorTheme } from '@/types/skill360.interface';

import { INFORMATIVE_COLOR_PLATTE } from '@/shared/policy';
import { getCssVariable } from '@/shared/utils/getCssVariable';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

interface RingProgressWrapperProps {
  colorTheme?: Skill360ColorTheme;
  size?: 'small' | 'medium';
}

const RingProgressWrapper = styled.div<RingProgressWrapperProps>`
  position: relative;
  width: ${({ size }) => (size === 'small' ? '12.6rem' : '16rem')};
  height: ${({ size }) => (size === 'small' ? '12.6rem' : '16rem')};

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

    label {
      ${renewalTypographyMixin('caption', 1)}
      color: var(--color-semantic-informative-secondary);
    }

    .value {
      ${renewalTypographyMixin('title', 2)}
      color: ${({ colorTheme }) => INFORMATIVE_COLOR_PLATTE[colorTheme || 'blue']};

      &.task {
        .total {
          color: var(--color-semantic-informative-teritary);
        }
      }

      &.none {
        color: var(--color-semantic-informative-teritary);
      }
    }
  }
`;

interface RingProgressProps extends RingProgressWrapperProps {
  percent?: number;
  label?: string;
  config?: RingProgressConfig;
  progressedNumber?: number;
  totalNumber?: number;
  isTaskMode?: boolean;
}

const RingProgress = ({
  percent,
  label,
  progressedNumber,
  totalNumber,
  isTaskMode = false,
  colorTheme = 'blue',
  size = 'medium',
  config,
  ...restProps
}: RingProgressProps) => {
  const getNewPercent = () => {
    if (progressedNumber && totalNumber) {
      return Math.floor((progressedNumber / totalNumber) * 100);
    }
    return percent;
  };

  const newPercent = getNewPercent();

  const getValue = () => {
    if (isTaskMode && progressedNumber !== undefined && totalNumber && totalNumber > 0) {
      return (
        <div className="value task">
          <span>{progressedNumber}</span>
          <span className="total">/{totalNumber}</span>
        </div>
      );
    } else if (!isTaskMode && newPercent !== undefined) {
      return <div className="value percent">{newPercent}%</div>;
    } else {
      return <div className="value none">-</div>;
    }
  };

  return (
    <RingProgressWrapper colorTheme={colorTheme} size={size} {...restProps}>
      <div className="content">
        {label && <label>{label}</label>}
        {getValue()}
      </div>
      <RingProgressComponent
        percent={newPercent || 0}
        config={{
          ...config,
          innerRadius: 0.84,
          color: [INFORMATIVE_COLOR_PLATTE[colorTheme], getCssVariable('--color-gray-200')],
          progressStyle: {
            lineCap: newPercent ? 'round' : 'butt',
          },
          statistic: { content: false },
        }}
      />
    </RingProgressWrapper>
  );
};

export default RingProgress;
