import styled from '@emotion/styled';
import React from 'react';

import SkillCategoryBadge from '../../../components/skill360/SkillCategoryBadge';

import { useSkillQueryOnPage } from '@/shared/hooks/skill360';
import { dateFormat } from '@/shared/utils/date';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

const SkillIntroBlock = styled.div`
  .other-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 1.2rem;

    ${renewalTypographyMixin('label', 4)}

    .completed-at {
      color: var(--color-gray-600);
    }

    .need-completed-at {
      color: var(--color-primary-700);
    }
  }

  .title {
    margin: 0 0 1rem;
    word-break: keep-all;
    ${renewalTypographyMixin('title', 2)}
  }

  .description {
    margin: 0 0 2rem;
    word-break: keep-all;
    ${renewalTypographyMixin('body', 3)}
  }

  .keyword-list-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.4rem;
  }

  .keyword-list {
    flex: 1 1 auto;

    color: var(--color-gray-800);

    .name {
      margin: 0 0 0.8rem;

      ${renewalTypographyMixin('body', 2, true)}
    }

    .keywords {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;

      span {
        flex: 0 0 auto;
        padding: 0.2rem 0.8rem;
        border-radius: 999rem;
        background-color: var(--color-gray-50);

        ${renewalTypographyMixin('label', 4, true)}
      }
    }
  }
`;

const SkillIntro = () => {
  const { data } = useSkillQueryOnPage();
  const { skill, competencies, skillCompletion } = data || {};

  return (
    <SkillIntroBlock>
      <div className="other-info">
        {skill?.type && <SkillCategoryBadge category={skill?.type} />}
        {skillCompletion ? (
          <span className="completed-at">{dateFormat(skillCompletion?.earnedAt, 'YYYY-MM-DD')} 진단 완료</span>
        ) : (
          <span className="need-completed-at">진단 필요</span>
        )}
      </div>
      <div className="title">{skill?.name}</div>
      <div className="description">{skill?.description}</div>
      <div className="keyword-list-wrapper">
        <div className="keyword-list">
          <div className="name">연관 직무</div>
          {competencies && (
            <div className="keywords">
              {competencies
                .toSorted((a, b) => a.localeCompare(b))
                .map((job) => (
                  <span key={job}>{job}</span>
                ))}
            </div>
          )}
        </div>
        <div className="keyword-list">
          <div className="name">스킬 스택</div>
          {skill?.skillStack && (
            <div className="keywords">
              {skill?.skillStack
                .toSorted((a, b) => a.localeCompare(b))
                .map((skillStack) => <span key={skillStack}>{skillStack}</span>)}
            </div>
          )}
        </div>
      </div>
    </SkillIntroBlock>
  );
};

export default SkillIntro;
