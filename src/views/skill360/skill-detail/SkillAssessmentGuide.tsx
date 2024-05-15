import styled from '@emotion/styled';
import React from 'react';

import SkillAssessmentCheckList from '@/components/skill360/SkillAssessmentCheckList';
import { useSkillQueryOnPage } from '@/shared/hooks/skill360';
import { MAX_SKILL_ASSESSMENT_LEVEL } from '@/shared/policy';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

const SkillAssessmentGuideBlock = styled.div`
  color: var(--color-gray-800);

  .guide-title {
    margin: 0 0 0.8rem;
    ${renewalTypographyMixin('body', 2, true)}
  }

  .guides {
    display: flex;
    gap: 1.2rem;
    margin: 0 0 2rem;
    padding: 1.2rem;
    border: 0.1rem solid var(--color-semantic-divider-default);
    border-radius: 0.6rem;

    .guide {
      flex: 0 0 17.5rem;
    }

    .label {
      margin: 0 0 0.4rem;
      color: var(--color-semantic-informative-secondary);
      ${renewalTypographyMixin('caption', 1)}
    }

    .value {
      ${renewalTypographyMixin('body', 2, true)}
    }

    .divider {
      flex: 0 0 0.1rem;
      background-color: var(--color-semantic-divider-default);
    }
  }
`;

// ?: DiagnosisCheckList과 통합 가능??
const SkillAssessmentGuide = () => {
  const { data } = useSkillQueryOnPage();
  const { skill } = data || {};

  return (
    <SkillAssessmentGuideBlock>
      <h3 className="guide-title">진단 안내</h3>
      <div className="guides">
        <div className="guide">
          <div className="label">소요시간</div>
          <div className="value">최대 {skill?.extras?.timeLimit ?? 0}분</div>
        </div>
        <div className="divider" />
        <div className="guide">
          <div className="label">문항 수</div>
          <div className="value">최대 {(skill?.questionCount || 0) * MAX_SKILL_ASSESSMENT_LEVEL}문항</div>
        </div>
        <div className="divider" />
        <div className="guide">
          <div className="label">문항 유형</div>
          <div className="value">단일선택, 복수선택</div>
        </div>
      </div>
      <SkillAssessmentCheckList />
    </SkillAssessmentGuideBlock>
  );
};

export default SkillAssessmentGuide;
