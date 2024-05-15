import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import SkillGapBadge from './SkillGapBadge';
import SkillLevelTabList from './SkillLevelTabList';

import { LevelBar } from '@/components';
import { getSkillGapColor } from '@/shared/utils/skillGap';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

interface SkillLevelComparisonProps {
  skillName: string;
  userLevel: number;
  standardLevel: number;
  maxLevel?: number;
  skillLevelDescriptions: string[];
  skillId: number;
}

const SkillLevelComparisonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  justify-content: center;
  padding: 2rem 1.6rem;
  border-top: 0.1rem solid var(--color-semantic-divider-default);

  .title {
    display: flex;
    gap: 1.2rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .title-skill-name {
      ${renewalTypographyMixin('body', 2, true)}
    }
  }

  .comparison-bar-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-self: center;
    min-width: 49rem;
  }
`;

const SkillLevelComparison = ({
  skillName,
  userLevel,
  standardLevel,
  maxLevel = 5,
  skillLevelDescriptions,
  skillId,
}: SkillLevelComparisonProps) => {
  const navigate = useNavigate();
  return (
    <SkillLevelComparisonWrapper>
      <div
        className="title"
        onClick={() => {
          navigate(`/skills/${skillId}`);
        }}
      >
        <span className="title-skill-name">{skillName}</span>
        <SkillGapBadge userLevel={userLevel} standardLevel={standardLevel} />
      </div>
      <div className="comparison-bar-container">
        <LevelBar label={'표준 레벨'} maxLevel={maxLevel} level={standardLevel} />
        <LevelBar
          label={'나의 레벨'}
          maxLevel={maxLevel}
          level={userLevel}
          color={getSkillGapColor(userLevel, standardLevel).key}
        />
      </div>
      <SkillLevelTabList maxLevel={maxLevel} userLevel={userLevel} descriptions={skillLevelDescriptions} />
    </SkillLevelComparisonWrapper>
  );
};

export default SkillLevelComparison;
