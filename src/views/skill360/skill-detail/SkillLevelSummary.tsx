import React from 'react';

import SkillLevelSection from '@/components/skill360/SkillLevelSection';
import { useCurrentMember } from '@/shared/hooks';
import { useSkillQueryOnPage } from '@/shared/hooks/skill360';

const SkillLevelSummary = () => {
  const { member } = useCurrentMember();
  const { data: skillDetail } = useSkillQueryOnPage();
  const { skill, skillCompletion, levels } = skillDetail || {};

  return (
    <SkillLevelSection
      userName={member?.extras.name || '회원'}
      standardLevel={skill?.memberBaseSkill?.baseLevel}
      userLevel={skillCompletion?.earnedLevel}
      skillLevelDescriptions={levels?.map((level) => level.description) || []}
    />
  );
};

export default SkillLevelSummary;
