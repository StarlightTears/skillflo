import styled from '@emotion/styled';
import React from 'react';

import SkillAssessmentEndAlert from './EndAlert';
import SkillAssessmentFooter from './Footer';
import SkillAssessmentHeader from './Header';
import SkillAssessmentLevelUpAlert from './LevelUpAlert';
import SkillAssessmentProblem from './problem/Problem';
import SkillAssessmentState from './State';

import { useAssessmentProgressQuery } from '@/shared/hooks/skill360';

const SkillAssessmentLayoutBlock = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-gray-50);

  * > & {
    flex: 0 0 auto;
  }

  .content {
    align-self: center;
    width: calc(100% - 2.4rem);
    max-width: 105.6rem;
    margin: 4rem 0 8rem;
    padding: 3.2rem 2.4rem;
    border: 0.1rem solid var(--color-gray-100);
    border-radius: 0.6rem;
    background-color: var(--color-white);
  }
`;

const SkillAssessmentLayout = () => {
  useAssessmentProgressQuery();

  return (
    <SkillAssessmentLayoutBlock>
      <SkillAssessmentHeader />
      <div className="content">
        <SkillAssessmentState />
        <SkillAssessmentProblem />
      </div>
      <SkillAssessmentFooter />
      <>
        <SkillAssessmentLevelUpAlert />
        <SkillAssessmentEndAlert />
      </>
    </SkillAssessmentLayoutBlock>
  );
};

export default SkillAssessmentLayout;
