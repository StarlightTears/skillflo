import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Dialog } from '../../components/common-renewal/Dialog';

import dimmedAssessmentAnalysis from '@/assets/images/skill360-dimmed-assessment-analysis.jpg';
import dimmedChart from '@/assets/images/skill360-dimmed-chart.jpg';
import { DonutChart, ColumnChart, SectionMessage } from '@/components';
import SkillCategoryFilter, { SkillCategoryFilterNameType } from '@/components/skill360/SkillCategoryFilter';
import SkillCategoryMatchingChart from '@/components/skill360/SkillCategoryMatchingChart';
import SkillJobMatchingChart from '@/components/skill360/SkillJobMatchingChart';
import SkillLevelComparison from '@/components/skill360/SkillLevelComparison';
import SkillLevelRadarChart from '@/components/skill360/SkillLevelRadarChart';
import SkillRank from '@/components/skill360/SkillRank';
import { SKILL_CATEGORY_LABELS } from '@/shared/policy';
import { compareSkillTitle, compareSkillType, sortSkills } from '@/shared/utils/skillList';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';
import { SKILL_CATEGORY } from '@/types/skill360.interface';
import { Level, Skill, SkillCompletion, SkillType } from '@/types/skill360.interface';

interface SkillAnalysisTabListProps {
  skillTypes: SkillType[];
  skills: Skill[];
  skillCompletions: SkillCompletion[];
  userName: string;
  levels: Level[];
}

const SkillAnalysisTabBlock = styled.div`
  padding: 4rem 2.4rem;

  > h1 {
    ${renewalTypographyMixin('title', 3)}
  }

  .user-name {
    color: var(--color-semantic-informative-accent);
  }

  .skill-analysis-section {
    margin: 1rem 0 4rem;
    border: 0.1rem solid var(--color-semantic-divider-default);
    border-radius: 0.6rem;

    .skill-competency {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 20.6rem;
      border-bottom: 0.1rem solid var(--color-semantic-divider-default);
    }

    .skill-competency-row {
      display: flex;
      align-items: center;
      height: 20.6rem;
      border-bottom: 0.1rem solid var(--color-semantic-divider-default);

      .row-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 2rem 1.6rem 2.4rem;

        :not(:last-child) {
          border-right: 0.1rem solid var(--color-semantic-divider-default);
        }
      }
    }
  }

  .description {
    ${renewalTypographyMixin('body', 4)}
    color: var(--color-semantic-informative-primary-low);
  }

  .skill-gap {
    margin-top: 1rem;
    border: 0.1rem solid var(--color-semantic-divider-default);
    border-radius: 0.6rem;

    .skill-gap-header {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      padding: 1.6rem 1.6rem 2rem;
      border-bottom: 0.1rem solid var(--color-semantic-divider-default);
    }
  }

  .dimmed-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 79.5rem;

    &.analysis {
      background: url(${dimmedAssessmentAnalysis}) no-repeat center;
      background-size: contain;
    }

    &.chart {
      background: url(${dimmedChart}) no-repeat center;
      background-size: contain;
    }
  }
`;

const SkillAnalysisTabList = ({
  userName,
  skills,
  skillCompletions,
  levels,
  skillTypes,
}: SkillAnalysisTabListProps) => {
  const isAllSkillsCompleted = skillCompletions.length === skills.length;
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<SkillCategoryFilterNameType>('TECHNICAL');
  const selectedCategoryLabel = SKILL_CATEGORY_LABELS[selectedCategory as SKILL_CATEGORY];

  const sortedSkills = sortSkills(skills, skillCompletions);
  const skillsMap: { [skillId: number]: Skill } = {};
  sortedSkills?.forEach((skill) => {
    skillsMap[skill.id] = skill;
  });

  const sortedSkillCompletions = skillCompletions.toSorted((a, b) => {
    const typeComparison = compareSkillType(skillsMap[a.skillId].type, skillsMap[b.skillId].type);
    return typeComparison === 0
      ? compareSkillTitle(skillsMap[a.skillId].name, skillsMap[b.skillId].name)
      : typeComparison;
  });

  // 직무 스킬 매칭도
  const sufficientSkillCount = sortedSkillCompletions.filter(
    (completedSkill) =>
      completedSkill.earnedLevel >= (skillsMap[completedSkill.skillId]?.memberBaseSkill?.baseLevel ?? 0)
  ).length;
  const totalSkillsCount = sortedSkills?.length;
  const skillJobMatchingChartPercent = Math.round((sufficientSkillCount / totalSkillsCount) * 100);

  // 스킬 타입별 매칭 비율
  const skillLevelComparisonMap = {
    TECHNICAL: { over: 0, standard: 0, under: 0 },
    WORKPLACE: { over: 0, standard: 0, under: 0 },
    DX_ESSENTIAL: { over: 0, standard: 0, under: 0 },
  } satisfies Record<SKILL_CATEGORY, unknown>;

  sortedSkillCompletions.forEach((completedSkill) => {
    const skill = skillsMap[completedSkill.skillId];
    if (completedSkill.earnedLevel > (skill.memberBaseSkill?.baseLevel ?? 0)) {
      skillLevelComparisonMap[skill.type].over += 1;
    } else if (completedSkill.earnedLevel === (skill.memberBaseSkill?.baseLevel ?? 0)) {
      skillLevelComparisonMap[skill.type].standard += 1;
    } else {
      skillLevelComparisonMap[skill.type].under += 1;
    }
  });

  // TOP3 스킬 랭킹
  const completedSkillsForRank = sortedSkillCompletions.map((completedSkill) => {
    const skill = skillsMap[completedSkill.skillId];
    return {
      category: skill.type,
      skillName: skill.name,
      userLevel: completedSkill.earnedLevel,
      standardLevel: skill.memberBaseSkill?.baseLevel ?? 0,
    };
  });

  // 스킬 갭
  const completedSkillsBySelectedCategory = sortedSkillCompletions.filter(
    (completedSkill) => skillsMap[completedSkill.skillId].type === selectedCategory
  );

  // 스킬 갭 레이더 차트
  const completedSkillsForRadarChart = {
    userLevel: completedSkillsBySelectedCategory.map((completedSkill) => ({
      skill: skillsMap[completedSkill.skillId].name,
      level: completedSkill.earnedLevel,
    })),
    standardLevel: completedSkillsBySelectedCategory.map((completedSkill) => ({
      skill: skillsMap[completedSkill.skillId].name,
      level: skillsMap[completedSkill.skillId].memberBaseSkill?.baseLevel ?? 0,
    })),
  };

  return (
    <SkillAnalysisTabBlock>
      <h1>
        <span className="user-name">{userName}</span>님의 핵심 스킬 분석
      </h1>
      <div className="skill-analysis-section">
        {isAllSkillsCompleted ? (
          <>
            <div className="skill-competency">
              <SkillJobMatchingChart percent={skillJobMatchingChartPercent} />
            </div>
            <div className="skill-competency-row">
              <div className="row-item">
                <SkillCategoryMatchingChart
                  skillCategory="TECHNICAL"
                  highSkillAmount={skillLevelComparisonMap.TECHNICAL.over}
                  standardSkillAmount={skillLevelComparisonMap.TECHNICAL.standard}
                  lowSkillAmount={skillLevelComparisonMap.TECHNICAL.under}
                />
              </div>
              <div className="row-item">
                <SkillCategoryMatchingChart
                  skillCategory="WORKPLACE"
                  highSkillAmount={skillLevelComparisonMap.WORKPLACE.over}
                  standardSkillAmount={skillLevelComparisonMap.WORKPLACE.standard}
                  lowSkillAmount={skillLevelComparisonMap.WORKPLACE.under}
                />
              </div>
              <div className="row-item">
                <SkillCategoryMatchingChart
                  skillCategory="DX_ESSENTIAL"
                  highSkillAmount={skillLevelComparisonMap.DX_ESSENTIAL.over}
                  standardSkillAmount={skillLevelComparisonMap.DX_ESSENTIAL.standard}
                  lowSkillAmount={skillLevelComparisonMap.DX_ESSENTIAL.under}
                />
              </div>
            </div>
            <div className="skill-competency-row">
              <div className="row-item">
                <SkillRank amount={3} rankType="highest" skills={completedSkillsForRank} />
              </div>
              <div className="row-item">
                <SkillRank amount={3} rankType="lowest" skills={completedSkillsForRank} />
              </div>
            </div>
          </>
        ) : (
          <div className="dimmed-container analysis">
            <Dialog
              prefixIcon={<DonutChart />}
              title="내 핵심 스킬 분석이 궁금하다면?"
              description="핵심 스킬 진단을 완료해주세요!"
              isCtaButtonHighlighted={false}
              buttonText="핵심 스킬 진단"
              onClickButton={() => {
                navigate('/skills?skill=assessment');
              }}
            />
          </div>
        )}
      </div>
      <h1>
        <span className="user-name">{userName}</span>님의 스킬 갭
      </h1>
      <p className="description">스킬별 직무 표준 레벨 대비 현재 나의 스킬 위치를 확인할 수 있습니다.</p>
      <div className="skill-gap">
        {isAllSkillsCompleted ? (
          <>
            <div className="skill-gap-header">
              <SkillCategoryFilter
                selectedCategory={selectedCategory}
                onTabClickHandler={setSelectedCategory}
                isAllDisabled={true}
              />
              <SectionMessage
                title={`${selectedCategoryLabel} 스킬이란?`}
                description={
                  skillTypes?.find((skillType) => skillType.name === selectedCategoryLabel)?.description || ''
                }
              />
            </div>
            <SkillLevelRadarChart
              chartType={'standard'}
              skillCategory={selectedCategory as SKILL_CATEGORY}
              data={completedSkillsForRadarChart}
            />
            {completedSkillsBySelectedCategory.map((completedSkill) => (
              <SkillLevelComparison
                key={completedSkill.skillId}
                skillName={skillsMap[completedSkill.skillId].name}
                userLevel={completedSkill.earnedLevel}
                standardLevel={skillsMap[completedSkill.skillId].memberBaseSkill?.baseLevel ?? 0}
                skillLevelDescriptions={levels
                  .filter((level) => level.skillId === completedSkill.skillId)
                  .toSorted((a, b) => a.level - b.level)
                  .map((level) => level.description)}
                skillId={completedSkill.skillId}
              />
            ))}
          </>
        ) : (
          <div className="dimmed-container chart">
            <Dialog
              prefixIcon={<ColumnChart />}
              title="내 스킬갭 분석이 궁금하다면?"
              description="핵심 스킬 진단을 완료해주세요!"
              buttonText="핵심 스킬 진단"
              isCtaButtonHighlighted={false}
              onClickButton={() => {
                navigate('/skills?skill=assessment');
              }}
            />
          </div>
        )}
      </div>
    </SkillAnalysisTabBlock>
  );
};

export default SkillAnalysisTabList;
