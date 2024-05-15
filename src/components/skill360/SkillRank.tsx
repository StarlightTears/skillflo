import styled from '@emotion/styled';
import React from 'react';

import Tooltip from '../common/Tooltip';

import SkillGapBadge from './SkillGapBadge';

import type { SKILL_CATEGORY } from '@/types/skill360.interface';

import SkillCategoryBadge from '@/components/skill360/SkillCategoryBadge';
import { getSkillGapLevel } from '@/shared/utils/skillGap';
import { textEllipsis } from '@/styles/mixins';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

interface SkillRankProps {
  amount?: number;
  rankType: 'highest' | 'lowest';
  skills: { category: SKILL_CATEGORY; skillName: string; userLevel: number; standardLevel: number }[];
}

const SkillRankWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;

  .title {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    justify-content: center;
    ${renewalTypographyMixin('caption', 1, true)}
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;

    li {
      display: flex;
      gap: 0.6rem;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.2rem;
      border-radius: 0.6rem;
      background-color: var(--color-gray-50);

      .skill-name {
        flex: 1 0;
        ${textEllipsis(1)}
        ${renewalTypographyMixin('caption', 2, true)}
      }

      &.skill-null-item {
        text-align: center;

        .skill-name {
          color: var(--color-semantic-informative-teritary);
        }
      }
    }
  }
`;

const getNewSkillData = ({ amount = 3, rankType, skills }: SkillRankProps) => {
  switch (rankType) {
    case 'highest':
      return {
        title: '최상위 핵심',
        tooltipMessage: `표준 레벨 대비 응시자의 진단 레벨이 높은 최상위 스킬 ${amount}개`,
        skills: skills
          .filter((skill) => skill.userLevel >= skill.standardLevel)
          .sort(
            (a, b) =>
              getSkillGapLevel(b.userLevel, b.standardLevel).result -
              getSkillGapLevel(a.userLevel, a.standardLevel).result
          ),
      };

    case 'lowest':
      return {
        title: '학습이 필요한',
        tooltipMessage: `표준 레벨 대비 응시자의 진단 레벨이 낮은 최하위 스킬 ${amount}개`,
        skills: skills
          .filter((skill) => skill.userLevel < skill.standardLevel)
          .sort(
            (a, b) =>
              getSkillGapLevel(a.userLevel, a.standardLevel).result -
              getSkillGapLevel(b.userLevel, b.standardLevel).result
          ),
      };

    default:
      return { title: '', tooltipMessage: '', skills };
  }
};

const SkillRank = ({ amount = 3, rankType, skills }: SkillRankProps) => {
  const newSkillData = getNewSkillData({ amount, rankType, skills });

  return (
    <SkillRankWrapper>
      <div className="title">
        {newSkillData.title} 스킬 TOP{amount} <Tooltip message={newSkillData.tooltipMessage} />
      </div>
      <ul>
        {newSkillData.skills.map(
          (skill, idx) =>
            idx < amount && (
              <li key={`skill-rank-${skill.skillName}`}>
                <SkillCategoryBadge category={skill.category} />
                <span className="skill-name">{skill.skillName}</span>
                <SkillGapBadge userLevel={skill.userLevel} standardLevel={skill.standardLevel} />
              </li>
            )
        )}
        {Array.from({ length: amount - newSkillData.skills.length }).map((_, idx) => (
          <li className="skill-null-item" key={`skill-null-item-${idx}`}>
            <span className="skill-name">???</span>
          </li>
        ))}
      </ul>
    </SkillRankWrapper>
  );
};

export default SkillRank;
