import styled from '@emotion/styled';
import React from 'react';

import RingProgress from '../chart/RingProgress';

import { Tooltip } from '@/components';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

const SkillJobMatchingChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.6rem 2.4rem;

  label {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    ${renewalTypographyMixin('caption', 1, true)}
  }
`;

const SkillJobMatchingChart = ({ percent }: { percent: number }) => {
  return (
    <SkillJobMatchingChartWrapper>
      <label>
        직무 스킬 매칭도
        <Tooltip message="직무 전체 핵심 스킬 중 적정/초과 이상을 진단 받은 스킬 비율 (응시자가 표준 레벨 값에 부합하는 정도)" />
      </label>
      <RingProgress percent={percent} size="small" />
    </SkillJobMatchingChartWrapper>
  );
};

export default SkillJobMatchingChart;
