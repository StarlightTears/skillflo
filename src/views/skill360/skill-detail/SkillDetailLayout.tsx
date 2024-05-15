import styled from '@emotion/styled';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SkillAssessmentGuide from './SkillAssessmentGuide';
import SkillAssessmentLink from './SkillAssessmentLink';
import SkillIntro from './SkillIntro';
import SkillLevelSummary from './SkillLevelSummary';

import { RenewalButton as Button } from '@/components';
import { useSkillQueryOnPage } from '@/shared/hooks/skill360';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

const SkillDetailBlock = styled.div`
  position: relative;
  padding: 4rem 0 0;

  & > .container {
    width: 60rem;
    margin: 0 auto 4rem;

    & > hr {
      height: 0.1rem;
      margin: 2.4rem 0;
      border: 0;
      background-color: var(--color-gray-100);
    }
  }

  .home-link {
    height: 4rem;
    outline-color: var(--color-semantic-divider-default);

    color: var(--color-semantic-informative-primary);
    ${renewalTypographyMixin('label', 3, true)}
  }

  &.is-completed {
    padding: 4rem 0;

    .container {
      margin-top: 0;
    }
  }
`;

const SkillDetailLayout = () => {
  const navigate = useNavigate();
  const { data, error } = useSkillQueryOnPage();

  useEffect(() => {
    if (error) {
      alert('유효하지 않은 스킬입니다.');
      navigate('/skills');
    }
  }, [error]);

  const { skillCompletion } = data || {};
  const isCompleted = !!skillCompletion;

  return (
    <SkillDetailBlock className={classNames({ 'is-completed': isCompleted })}>
      <div className="container">
        <SkillIntro />
        <hr />
        <SkillLevelSummary />
        <hr />
        {isCompleted ? (
          <Button theme="outline" size="medium" className="home-link" onClick={() => navigate('/skills')}>
            진단 홈으로
          </Button>
        ) : (
          <SkillAssessmentGuide />
        )}
      </div>
      {!isCompleted && <SkillAssessmentLink />}
    </SkillDetailBlock>
  );
};

export default SkillDetailLayout;
