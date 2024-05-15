import styled from '@emotion/styled';
import React from 'react';

import { RadarChart as RadarChartComponent, RadarConfig } from '@fastcampus/fastcomponents';

import type { SKILL_CATEGORY } from '@/types/skill360.interface';

import { Legend } from '@/components';
import { INFORMATIVE_COLOR_PLATTE, SKILL_CATEGORIES, SKILL_CATEGORY_LABELS, SKILL_LEVEL_LABELS } from '@/shared/policy';

interface SkillLevelRadarChartWrapperStyleProps {
  titleColor: string;
}

const SkillLevelRadarChartWrapper = styled.div<SkillLevelRadarChartWrapperStyleProps>`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 100%;
  height: 41.6rem;
  padding: 2rem 1.6rem;

  p {
    font-weight: 600;
    font-size: 1.6rem;
    text-align: center;

    span {
      color: ${({ titleColor }) => titleColor};
    }
  }
`;

const RadarChartWrapper = styled.div`
  width: 100%;
  height: 29.4rem;
  margin: 0 auto;
`;

interface SkillLevelData {
  skill: string;
  level: number;
}

interface SkillLevelRadarChartData {
  userLevel?: SkillLevelData[];
  groupAvgLevel?: SkillLevelData[];
  jobAvgLevel?: SkillLevelData[];
  standardLevel?: SkillLevelData[];
}

type SkillLevelRadarChartType = 'global' | 'standard';

const formatRadarChartData = (data: SkillLevelRadarChartData, chartType: SkillLevelRadarChartType) => {
  const formatSkillLevelData = (key: SKILL_LEVEL_LABELS, skillLevelData: { skill: string; level: number }[]) => {
    const chartData = [];
    for (let i = 0; i < skillLevelData.length; i++) {
      const { skill, level } = skillLevelData[i];
      const newData = { item: skill, name: key, value: level };
      chartData.push(newData);
    }
    return chartData;
  };

  const userLevelData = formatSkillLevelData(SKILL_LEVEL_LABELS.USER_LEVEL, data.userLevel || []);

  switch (chartType) {
    case 'global': {
      const groupAvgLevelData = formatSkillLevelData(SKILL_LEVEL_LABELS.GROUP_AVG_LEVEL, data.groupAvgLevel || []);
      const jobAvgLevelData = formatSkillLevelData(SKILL_LEVEL_LABELS.JOB_AVG_LEVEL, data.jobAvgLevel || []);
      return [...userLevelData, ...groupAvgLevelData, ...jobAvgLevelData];
    }
    case 'standard': {
      const standardLevelData = formatSkillLevelData(SKILL_LEVEL_LABELS.STANDARD_LEVEL, data.standardLevel || []);
      return [...standardLevelData, ...userLevelData];
    }
    default: {
      return [...userLevelData];
    }
  }
};

const SkillLevelRadarChart = ({
  skillCategory,
  chartType,
  data,
  config,
  ...restProps
}: {
  chartType: SkillLevelRadarChartType;
  skillCategory: SKILL_CATEGORY;
  data: SkillLevelRadarChartData;
  config?: RadarConfig;
}) => {
  const legendInfo =
    chartType === 'global'
      ? [
          { label: SKILL_LEVEL_LABELS.USER_LEVEL, color: INFORMATIVE_COLOR_PLATTE.accent },
          { label: SKILL_LEVEL_LABELS.GROUP_AVG_LEVEL, color: INFORMATIVE_COLOR_PLATTE.success },
          { label: SKILL_LEVEL_LABELS.JOB_AVG_LEVEL, color: SKILL_CATEGORIES[skillCategory].mainColor },
        ]
      : [
          { label: SKILL_LEVEL_LABELS.STANDARD_LEVEL, color: SKILL_CATEGORIES[skillCategory].mainColor },
          { label: SKILL_LEVEL_LABELS.USER_LEVEL, color: INFORMATIVE_COLOR_PLATTE.accent },
        ];

  return (
    <SkillLevelRadarChartWrapper titleColor={SKILL_CATEGORIES[skillCategory].mainColor} {...restProps}>
      <p>
        <span>{SKILL_CATEGORY_LABELS[skillCategory]}</span> 스킬{chartType === 'standard' && ' 갭'}
      </p>
      <RadarChartWrapper>
        <RadarChartComponent
          data={formatRadarChartData(data, chartType)}
          config={{
            ...config,
            meta: {
              value: {
                min: 0,
                max: 5,
              },
            },
            color:
              chartType === 'global'
                ? [
                    INFORMATIVE_COLOR_PLATTE.accent,
                    INFORMATIVE_COLOR_PLATTE.success,
                    SKILL_CATEGORIES[skillCategory].mainColor,
                  ]
                : [SKILL_CATEGORIES[skillCategory].mainColor, INFORMATIVE_COLOR_PLATTE.accent],
            legend: false,
            xAxis: {
              label: {
                style: {
                  fontSize: 10,
                  fill: '#2D3136',
                  textBaseline: 'bottom',
                },
                formatter: (value: string) => {
                  const MAX_LENGTH_PER_LINE = 9;
                  const MAX_LINES = 2;
                  const words = value.split(' ');
                  let resultText = '';
                  let currentLine = 1;
                  let currentLineLength = 0;

                  for (let i = 0; i < words.length; i++) {
                    if (i === 0) {
                      currentLineLength += words[i].length;
                      resultText += words[i] + ' ';
                      continue;
                    }
                    if (currentLineLength + words[i].length > MAX_LENGTH_PER_LINE) {
                      if (currentLine === MAX_LINES) {
                        resultText = resultText.slice(0, -1);
                        resultText += '...';
                        break;
                      }
                      resultText += '\n';
                      currentLine++;
                      currentLineLength = 0;
                    }
                    resultText += words[i] + ' ';
                    currentLineLength += words[i].length;
                  }

                  return resultText;
                },
              },
              grid: {
                line: {
                  style: {
                    lineWidth: 1,
                  },
                },
                alternateColor: [],
              },
            },
            yAxis: {
              label: false,
              grid: {
                line: {
                  style: {
                    lineWidth: 1,
                  },
                },
              },
            },
          }}
        />
      </RadarChartWrapper>
      <Legend legendInfo={legendInfo} />
    </SkillLevelRadarChartWrapper>
  );
};

export default SkillLevelRadarChart;
