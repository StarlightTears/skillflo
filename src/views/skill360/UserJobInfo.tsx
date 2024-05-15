import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Tooltip } from '@/components';
import CapsuleBadge from '@/components/common-renewal/CapsuleBadge';
import Chip from '@/components/common-renewal/Chip';
import { textEllipsis } from '@/styles/mixins';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';
import { Competency, Skill } from '@/types/skill360.interface';

interface UserJobInfoProps {
  data: Competency;
  coreSkills: Skill[];
}

const UserJobInfoBlock = styled.section`
  .assessment-job {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-bottom: 0.1rem solid var(--color-semantic-divider-default);

    .job-image {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 0.2rem;
    }

    .job-name {
      display: flex;
      gap: 0.4rem;
      align-items: center;
      ${renewalTypographyMixin('body', 1, true)}
      ${textEllipsis(1)}
    }

    .ncs-wrapper {
      display: flex;
      gap: 0.4rem;
      align-items: center;
      color: var(--color-semantic-informative-teritary);
    }

    .description {
      ${renewalTypographyMixin('caption', 1)}
      ${textEllipsis(4)}
      color: var(--color-semantic-informative-primary);
    }
  }

  .core-skills {
    .core-skill-count {
      ${renewalTypographyMixin('caption', 1, true)}
      color: var(--color-semantic-informative-primary);

      span {
        ${renewalTypographyMixin('label', 5, true)}
        color: var(--color-semantic-informative-accent);
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      margin-top: 0.6rem;
    }
  }
`;

const UserJobInfo = ({ data, coreSkills }: UserJobInfoProps) => {
  const navigate = useNavigate();
  return (
    <UserJobInfoBlock className="content-section">
      <div className="assessment-job aside-content-wrapper">
        <img className="job-image" src={data.extras.iconImage.url} />
        <div className="job-name">
          {data.name}
          <Tooltip message="진단을 위해 맵핑된 표준 직무" />
        </div>
        <div className="ncs-wrapper">
          <CapsuleBadge theme="gray-low" size="medium">
            {data.firstJobName}
          </CapsuleBadge>
          /
          <CapsuleBadge theme="gray-low" size="medium">
            {data.secondJobName}
          </CapsuleBadge>
        </div>

        <p className="description">{data.description}</p>
      </div>
      <div className="core-skills aside-content-wrapper">
        <p className="core-skill-count">
          핵심 스킬 <span>{coreSkills.length > 99 ? '99+' : coreSkills.length}</span>
        </p>
        <ul>
          {coreSkills.map((skill, index) => (
            <li key={index}>
              <Chip onClick={() => navigate(`/skills/${skill.id}`)}>{skill.name}</Chip>
            </li>
          ))}
        </ul>
      </div>
    </UserJobInfoBlock>
  );
};

export default UserJobInfo;
