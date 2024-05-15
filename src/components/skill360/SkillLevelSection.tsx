import styled from '@emotion/styled';
import React from 'react';

import SkillLevelTabList from './SkillLevelTabList';

import { LevelGauge, TriangleDownFilled, TriangleUpFilled } from '@/components';
import { getSkillGap } from '@/shared/utils/skillGap';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

interface SkillLevelSectionWrapperProps {
  gaugeColor: string;
}

const SkillLevelSectionWrapper = styled.div<SkillLevelSectionWrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  width: 60rem;

  h3 {
    ${renewalTypographyMixin('body', 2, true)}
  }

  .my-level {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;

    .level-gauge-container {
      display: flex;
      gap: 2.4rem;
      align-items: center;
      align-self: center;
      justify-content: center;

      .divider {
        width: 0.1rem;
        height: 12rem;
        background-color: var(--color-semantic-divider-default);
      }
    }

    .description {
      text-align: center;

      ${renewalTypographyMixin('body', 1, true)}

      &.none-level {
        color: var(--color-semantic-informative-teritary);
      }

      .skill-gap {
        color: ${({ gaugeColor }) => gaugeColor};
        fill: ${({ gaugeColor }) => gaugeColor};

        svg {
          width: 1.6rem;
          height: 1.6rem;
        }

        path {
          fill: ${({ gaugeColor }) => gaugeColor};
        }
      }
    }
  }

  .skill-level {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
  }
`;

interface SkillLevelSectionProps {
  userName: string;
  userLevel?: number;
  standardLevel?: number;
  skillLevelDescriptions: string[];
}

const SkillLevelSection = ({ userName, userLevel, standardLevel, skillLevelDescriptions }: SkillLevelSectionProps) => {
  const { gapLevel, gapType, colorKey, colorCode } = getSkillGap(userLevel ?? 0, standardLevel ?? 0);

  return (
    <SkillLevelSectionWrapper gaugeColor={colorCode}>
      <div className="my-level">
        <h3>나의 레벨</h3>
        <div className="level-gauge-container">
          <LevelGauge
            label={'표준 레벨'}
            level={standardLevel}
            tooltipMessage={'응시자의 직무, 직급(직무 연차)에 요구되는 스킬의 표준 레벨 값'}
            colorTheme={'gray'}
          />
          <div className="divider"></div>
          <LevelGauge
            label={'나의 레벨'}
            level={userLevel}
            tooltipMessage={'스킬 진단 및 분석 결과에 따른 응시자의 스킬 레벨'}
            colorTheme={colorKey}
          />
        </div>
        {userLevel === undefined ? (
          <p className="description none-level">{userName}님의 진단레벨이 아직 측정되지 않았습니다.</p>
        ) : (
          <p className="description user-level">
            {userName}님은 직무에서 요구하는 {gapType === 'standard' ? null : '수준보다 '}
            <p>
              {gapType === 'standard' ? (
                <span className="skill-gap">적정 수준</span>
              ) : (
                <span className="skill-gap">
                  {gapType === 'high' && (
                    <>
                      <TriangleUpFilled /> {gapLevel}레벨 뛰어난 수준
                    </>
                  )}
                  {gapType === 'low' && (
                    <>
                      <TriangleDownFilled /> {gapLevel}레벨 미흡한 수준
                    </>
                  )}
                </span>
              )}
              의 스킬을 보유하고 있습니다.
            </p>
          </p>
        )}
      </div>
      {userLevel !== undefined && (
        <div className="skill-level">
          <h3>스킬 레벨 설명</h3>
          <SkillLevelTabList userLevel={userLevel} descriptions={skillLevelDescriptions} />
        </div>
      )}
    </SkillLevelSectionWrapper>
  );
};

export default SkillLevelSection;
