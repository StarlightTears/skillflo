import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import SkillCard, { SkillCardProps } from '../../components/skill360/SkillCard';

import Button from '@/components/common-renewal/Button';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

const RequiredSkillListSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  p {
    ${renewalTypographyMixin('body', 1, true)}
    span {
      color: var(--color-semantic-informative-accent);

      &.required-skill-count {
        ${renewalTypographyMixin('body', 2, true)}
      }
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  hr {
    width: 100%;
    height: 0.1rem;
    margin: 1.2rem 0;
    border: 0;
    background: var(--color-semantic-divider-default);
  }
`;

const RequiredSkillListSection = ({
  userName,
  requiredSkillList,
}: {
  userName: string;
  requiredSkillList: SkillCardProps[];
}) => {
  const navigate = useNavigate();
  const requiredSkillCount = requiredSkillList.length;
  return (
    <RequiredSkillListSectionWrapper>
      <p>
        <span>{userName}</span>님의 진단 필요 핵심 스킬{' '}
        <span className="required-skill-count">{requiredSkillCount < 100 ? requiredSkillCount : '99+'}</span>
      </p>
      <ul>
        {requiredSkillList.map(({ skillName, skillCategory, completedAt, id }) => (
          <SkillCard
            key={`skill-list-${skillName}`}
            skillName={skillName}
            skillCategory={skillCategory}
            completedAt={completedAt}
            onClick={() => navigate(`/skills/${id}`)}
          />
        ))}
      </ul>
      <hr />
      <Button theme={'outline'} size={'medium'} onClick={() => navigate('/skills')}>
        홈으로
      </Button>
    </RequiredSkillListSectionWrapper>
  );
};

export default RequiredSkillListSection;
