import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import type { BadgeSize } from '@/types/design-system.type';

import { SKILL_CATEGORY_LABELS } from '@/shared/policy';
import { SKILL_CATEGORY } from '@/types/skill360.interface';

interface SkillCategoryBadgeProps {
  category: SKILL_CATEGORY;
  size?: BadgeSize;
  className?: string;
}

const getBadgeTypeStyle = ({ category }: SkillCategoryBadgeProps) => {
  switch (category) {
    case 'TECHNICAL': {
      return css`
        background-color: var(--color-lightpurple-background);
        color: var(--color-semantic-purple);
      `;
    }
    case 'WORKPLACE': {
      return css`
        background-color: var(--color-lightpink-background);
        color: var(--color-semantic-pink);
      `;
    }
    case 'DX_ESSENTIAL': {
      return css`
        background-color: var(--color-lightgreen-new-background);
        color: var(--color-semantic-green-new);
      `;
    }
    default:
      return css``;
  }
};

const getBadgeSizeStyle = ({ size }: SkillCategoryBadgeProps) => {
  switch (size) {
    case 'medium':
      return css`
        height: 2.1rem;
      `;
    case 'small':
    default:
      return css`
        height: 1.8rem;
      `;
  }
};

const SkillCategoryBadgeInline = styled.span`
  ${getBadgeTypeStyle}
  ${getBadgeSizeStyle}
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.6rem;
  border-radius: 999rem;
  font-weight: 600;
`;

const SkillCategoryBadge = ({ category, size = 'small', className }: SkillCategoryBadgeProps) => {
  return (
    <SkillCategoryBadgeInline category={category} className={className} size={size}>
      {SKILL_CATEGORY_LABELS[category]}
    </SkillCategoryBadgeInline>
  );
};

export default SkillCategoryBadge;
