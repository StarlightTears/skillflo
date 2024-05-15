import styled from '@emotion/styled';
import React from 'react';

import { PercentBarChart } from '@fastcampus/fastcomponents';

import Legend from '../chart/Legend';
import Tooltip from '../common/Tooltip';

import type { SKILL_CATEGORY } from '@/types/skill360.interface';

import { INFORMATIVE_COLOR_PLATTE, SKILL_CATEGORIES, SKILL_CATEGORY_LABELS } from '@/shared/policy';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

interface SkillCategoryMatchingChartWrapperProps {
  skillCategory: SKILL_CATEGORY;
}

const SkillCategoryMatchingChartWrapper = styled.div<SkillCategoryMatchingChartWrapperProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem 1.6rem 2.4rem;

  .title {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.6rem;
    ${renewalTypographyMixin('caption', 1, true)}

    .skill-category-name {
      color: ${({ skillCategory }) => SKILL_CATEGORIES[skillCategory].mainColor};
    }
  }

  .chart-legend {
    margin-bottom: 2rem;
  }
`;

const PercentBarWrapper = styled.div`
  height: 7.6rem;
  margin: 0 0 1.2rem;
`;

interface SkillCategoryMatchingChartProps {
  skillCategory: SKILL_CATEGORY;
  highSkillAmount: number;
  standardSkillAmount: number;
  lowSkillAmount: number;
}

const SkillCategoryMatchingChart = ({
  skillCategory,
  highSkillAmount,
  standardSkillAmount,
  lowSkillAmount,
}: SkillCategoryMatchingChartProps) => {
  const chartData = [
    {
      label: '초과',
      yLabel: `${skillCategory} 매칭 비율`,
      value: highSkillAmount,
      color: INFORMATIVE_COLOR_PLATTE.success,
    },
    {
      label: '적정',
      yLabel: `${skillCategory} 매칭 비율`,
      value: standardSkillAmount,
      color: INFORMATIVE_COLOR_PLATTE.accent,
    },
    {
      label: '미달',
      yLabel: `${skillCategory} 매칭 비율`,
      value: lowSkillAmount,
      color: INFORMATIVE_COLOR_PLATTE.alert,
    },
  ];

  return (
    <SkillCategoryMatchingChartWrapper skillCategory={skillCategory}>
      <div className="title">
        <span className="skill-category-name">{SKILL_CATEGORY_LABELS[skillCategory]}</span> 매칭 비율
        <Tooltip message={`전체 ${SKILL_CATEGORY_LABELS[skillCategory]} Skill 대비 진단 결과 비율`} />
      </div>
      <PercentBarWrapper>
        <PercentBarChart
          data={chartData}
          config={{
            interactions: [
              {
                type: 'active-region',
                enable: false,
              },
            ],

            xAxis: false,
            yAxis: false,
            legend: false,
            maxBarWidth: 36,
            barStyle: {
              lineWidth: 1,
            },
            label: {
              // TODO: 계산식 확인 필요
              content: (item: { value: number }) => (item.value === 0 ? '' : `${Math.round(item.value * 100)}%`),
            },
            color: [INFORMATIVE_COLOR_PLATTE.success, INFORMATIVE_COLOR_PLATTE.accent, INFORMATIVE_COLOR_PLATTE.alert],
          }}
        />
      </PercentBarWrapper>
      <Legend legendInfo={chartData} />
    </SkillCategoryMatchingChartWrapper>
  );
};

export default SkillCategoryMatchingChart;
