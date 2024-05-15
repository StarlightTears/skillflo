import styled from '@emotion/styled';
import React from 'react';

import type { SKILL_CATEGORY } from '@/types/skill360.interface';

import { ChevronRight, Tooltip } from '@/components';
import SkillCategoryBadge from '@/components/skill360/SkillCategoryBadge';
import SkillGapBadge from '@/components/skill360/SkillGapBadge';
import { dateFormat } from '@/shared/utils/date';
import { textEllipsis } from '@/styles/mixins';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

export interface SkillCardProps {
  id?: number;
  skillName: string;
  skillDescription?: string;
  skillCategory: SKILL_CATEGORY;
  completedAt?: string;
  earnedLevel?: number;
  baseLevel?: number;
  onClick?: () => void;
}

const SkillCardBlock = styled.li<{ isCompleted: boolean }>`
  border-radius: 0.6rem;
  background: var(--color-white);
  cursor: pointer;

  &.medium {
    align-items: flex-start;
    width: 37.8rem;
    padding: 2rem;
    border: ${({ isCompleted }) =>
      isCompleted ? '0.1rem solid var(--color-surface-blue)' : '0.1rem solid var(--color-semantic-divider-default)'};

    .skill-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 0.8rem;

      .skill-status {
        ${renewalTypographyMixin('label', 4)}
        color: var(--color-surface-blue);

        &-completed {
          ${renewalTypographyMixin('label', 4)}
          color: var(--color-semantic-informative-primary-low);
        }
      }
    }

    .skill-name {
      margin-bottom: 0.4rem;
      ${renewalTypographyMixin('body', 1, true)}
      ${textEllipsis(1)}
    }

    .skill-description {
      height: 4.2rem;
      ${renewalTypographyMixin('body', 4, false)}
      color: var(--color-gray-500);
      line-height: 2.1rem;
      ${textEllipsis(2)}
    }

    .skill-level-group-block {
      display: flex;
      gap: 1.2rem;
      justify-content: space-between;
      height: 7.2rem;
      margin-top: 1.6rem;
      padding: 1.2rem;
      border: 0.1rem solid #e5e8eb;
      border-radius: 0.6rem;

      .skill-level-block {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 0.4rem;

        &:not(:last-child) {
          border-right: 0.1rem solid #e5e8eb;
        }

        .skill-level-label {
          display: flex;
          gap: 0.4rem;
          align-items: center;
          color: var(--color-gray-400);
          line-height: 1.95rem;
          ${renewalTypographyMixin('caption', 1, false)}
        }

        .skill-level-value {
          ${renewalTypographyMixin('body', 2, true)}
          color: var(--color-gray-800);
          line-height: 2.4rem;
        }

        .dash {
          color: var(--color-semantic-informative-teritary);
          ${renewalTypographyMixin('body', 2, true)}
        }
      }
    }
  }

  &.small {
    display: flex;
    align-items: center;
    padding: 1.4rem;
    border: 0.1rem solid var(--color-semantic-divider-default);

    .skill-name {
      flex: 1 0;
      margin: 0 1.4rem 0 0.6rem;
      ${renewalTypographyMixin('body', 3, true)}
      ${textEllipsis(1)}
    }

    button {
      display: flex;
      gap: 0.2rem;
      align-items: center;
      border: none;
      background: none;
      color: var(--color-semantic-informative-accent);
      ${renewalTypographyMixin('label', 4)}
      line-height: 0;
      cursor: pointer;

      svg {
        width: 1rem;
        height: 1rem;

        path: {
          fill: var(--color-semantic-informative-accent);
        }
      }
    }

    :hover {
      background: var(--color-gray-50);
    }
  }
`;

const SkillCard = ({
  skillName,
  skillCategory,
  skillDescription,
  completedAt,
  earnedLevel,
  baseLevel,
  onClick,
}: SkillCardProps) => {
  const isCompleted = !!completedAt;
  const size = skillDescription ? 'medium' : 'small';
  return (
    <SkillCardBlock isCompleted={isCompleted} onClick={onClick} className={size}>
      {size === 'medium' && (
        <>
          <div className="skill-card-header">
            <SkillCategoryBadge size="small" category={skillCategory} />
            {isCompleted ? (
              <div className="skill-status-completed">{dateFormat(completedAt)} 진단 완료</div>
            ) : (
              <div className="skill-status">진단 필요</div>
            )}
          </div>

          <div className="skill-content">
            <div className="skill-name">{skillName}</div>
            <p className="skill-description">{skillDescription}</p>
          </div>
          <div className="skill-level-group-block">
            <div className="skill-level-block">
              <div className="skill-level-label">
                표준 레벨
                <Tooltip message={'응시자의 직무, 직급(직무 연차)에 요구되는 스킬의 표준 레벨 값'} />
              </div>
              <p className="skill-level-value">LV.{baseLevel}</p>
            </div>
            <div className="skill-level-block">
              <div className="skill-level-label">
                나의 레벨
                <Tooltip message={'스킬 진단 및 분석 결과에 따른 응시자의 스킬 레벨'} />
              </div>
              {!isNaN(Number(earnedLevel)) ? (
                <p className="skill-level-value">LV.{earnedLevel}</p>
              ) : (
                <p className="dash">-</p>
              )}
            </div>
            <div className="skill-level-block">
              <div className="skill-level-label">
                스킬 갭<Tooltip message={'표준 레벨과 나의 레벨의 차이 값'} />
              </div>
              {!isNaN(Number(earnedLevel)) ? (
                <SkillGapBadge userLevel={Number(earnedLevel)} standardLevel={baseLevel || 0} size="medium" />
              ) : (
                <p className="dash">-</p>
              )}
            </div>
          </div>
        </>
      )}
      {size === 'small' && (
        <>
          <SkillCategoryBadge size="small" category={skillCategory} />
          <div className="skill-name">{skillName}</div>
          {/* TODO: TextButton 컴포넌트 추가 후 적용 필요 */}
          <button>
            {isCompleted ? '자세히' : '진단 시작'}
            <ChevronRight />
          </button>
        </>
      )}
    </SkillCardBlock>
  );
};

export default SkillCard;
