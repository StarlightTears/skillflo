import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SkillCard from '../../components/skill360/SkillCard';

import { Checkbox, SectionMessage } from '@/components';
import SkillCategoryFilter, { SkillCategoryFilterNameType } from '@/components/skill360/SkillCategoryFilter';
import { SKILL_CATEGORY_LABELS } from '@/shared/policy';
import { sortCoreSkills } from '@/shared/utils/skillList';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';
import { SKILL_CATEGORY } from '@/types/skill360.interface';
import { Skill, SkillCompletion, SkillType } from '@/types/skill360.interface';

interface SkillAssessmentTabListProps {
  skillTypes: SkillType[];
  data: Skill[];
  skillCompletions: SkillCompletion[];
  jobName: string;
}

const CoreSkillAssessment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 4rem 2.4rem;

  .core-skill-title {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    ${renewalTypographyMixin('title', 3)}

    span {
      color: var(--color-semantic-informative-accent);
    }

    .skill-count {
      ${renewalTypographyMixin('label', 2, true)}
    }
  }

  .checkbox-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .label {
      ${renewalTypographyMixin('body', 4)}
    }
  }

  .skill-card-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem;
    width: 100%;
  }
`;

const SkillAssessmentTabList = ({ data, skillCompletions, jobName, skillTypes }: SkillAssessmentTabListProps) => {
  const navigate = useNavigate();

  const [selectedSkillTypeForAssessment, setSelectedSkillTypeForAssessment] =
    useState<SkillCategoryFilterNameType>('전체보기');
  const selectedCategoryLabel =
    selectedSkillTypeForAssessment === '전체보기'
      ? '전체보기'
      : SKILL_CATEGORY_LABELS[selectedSkillTypeForAssessment as SKILL_CATEGORY];

  const [isNotCompletedOnly, setNotCompletedOnly] = useState(false);

  const notCompletedData = data.filter((skill) => {
    return !skillCompletions.find((completion) => completion.skillId === skill.id)?.skillId;
  });

  const currentData = isNotCompletedOnly ? notCompletedData : data;
  const filteredData = currentData.filter((skill) =>
    selectedSkillTypeForAssessment === '전체보기' ? data : skill.type === selectedSkillTypeForAssessment
  );

  const sortedData = sortCoreSkills(filteredData, skillCompletions);

  return (
    <CoreSkillAssessment>
      <div className="core-skill-title">
        <div>
          <span>{jobName}</span>의 핵심 스킬
        </div>
        <span className="skill-count">{data.length}</span>
      </div>
      <div className="checkbox-wrapper">
        <SkillCategoryFilter
          selectedCategory={selectedSkillTypeForAssessment}
          onTabClickHandler={setSelectedSkillTypeForAssessment}
        />
        <Checkbox
          checked={isNotCompletedOnly}
          setChecked={() => setNotCompletedOnly(!isNotCompletedOnly)}
          label={<span className="label">진단 필요 스킬 모아보기</span>}
        />
      </div>
      <SectionMessage
        title={selectedCategoryLabel === '전체보기' ? '스킬 유형이란?' : `${selectedCategoryLabel} 스킬이란?`}
        description={
          selectedCategoryLabel === '전체보기'
            ? '스킬 유형을 선택하면 해당 유형의 스킬만 모아 볼 수 있습니다.'
            : skillTypes?.find((skillType) => skillType.name === selectedCategoryLabel)?.description || ''
        }
      />
      <ul className="skill-card-container">
        {sortedData.map((skill, index) => {
          const completedAt =
            skillCompletions.find((completion) => completion.skillId === skill.id)?.earnedAt.toString() || '';
          const earnedLevel = skillCompletions.find((completion) => completion.skillId === skill.id)?.earnedLevel;
          return (
            <SkillCard
              key={index}
              skillName={skill.name}
              skillCategory={skill.type}
              skillDescription={skill.description}
              completedAt={completedAt}
              earnedLevel={earnedLevel}
              baseLevel={skill.memberBaseSkill?.baseLevel}
              onClick={() => navigate(`/skills/${skill.id}`)}
            />
          );
        })}
      </ul>
    </CoreSkillAssessment>
  );
};

export default SkillAssessmentTabList;
