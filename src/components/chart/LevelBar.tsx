import styled from '@emotion/styled';
import React from 'react';

import type { Skill360ColorTheme } from '@/types/skill360.interface';

import { INFORMATIVE_COLOR_PLATTE } from '@/shared/policy';
import { getCssVariable } from '@/shared/utils/getCssVariable';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

interface LevelBarWrapperProps {
  levelColor: Skill360ColorTheme;
}

const LevelBarWrapper = styled.div<LevelBarWrapperProps>`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: center;

  .label {
    flex: 1 0 0;
    color: var(--color-semantic-informative-secondary);
    ${renewalTypographyMixin('caption', 1)}
  }

  .level-bar {
    display: flex;
    gap: 0.2rem;
  }

  .level-bar-vector {
    flex: 1 0 0;
    align-self: stretch;
    border-radius: 0.2rem;
    background: #d3d7da;
  }

  .level {
    flex: 1 0 0;
    color: ${({ levelColor }) => INFORMATIVE_COLOR_PLATTE[levelColor]};
    ${renewalTypographyMixin('caption', 1, true)}
  }
`;

interface LevelBarProps {
  label: string;
  level?: number;
  maxLevel?: number;
  color?: Skill360ColorTheme;
}

const LevelBar = ({ label, level, maxLevel = 5, color = 'gray' }: LevelBarProps) => {
  return (
    <LevelBarWrapper levelColor={color}>
      <span className="label">{label}</span>
      <span className="level-bar">
        {Array.from({ length: maxLevel }).map((_, idx) => (
          <svg className="level-bar-vector" key={`${label}-level-bar-vector-${idx}`} width="72.4" height="14">
            <rect
              width="100%"
              height="100%"
              fill={level && idx < level ? INFORMATIVE_COLOR_PLATTE[color] : getCssVariable('--color-gray-200')}
            />
          </svg>
        ))}
      </span>
      <span className="level">{level === undefined ? '-' : `Lv.${level}`}</span>
    </LevelBarWrapper>
  );
};

export default LevelBar;
