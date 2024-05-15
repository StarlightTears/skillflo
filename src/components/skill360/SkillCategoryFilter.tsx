import styled from '@emotion/styled';
import React from 'react';

import { TabList } from '@fastcampus/fastcomponents';

import type { SKILL_CATEGORY } from '@/types/skill360.interface';

import { SKILL_CATEGORIES, SKILL_CATEGORY_LABELS } from '@/shared/policy';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

const SkillCategoryFilterWrapper = styled.div`
  .skill-type-filter-tab-list {
    display: flex;
    gap: 0.6rem;
    align-items: center;

    div.tab {
      padding: 0.8rem 1.4rem;
      border: 0.1rem solid var(--color-semantic-divider-default);
      border-radius: 3rem;
      background-color: #fff;
      color: var(--color-semantic-informative-primary);
      cursor: pointer;

      ${renewalTypographyMixin('label', 3)}

      &:hover {
        background-color: var(--color-semantic-informative-contrast);
      }

      &.selected {
        background-color: var(--color-semantic-informative-accent);
        color: var(--color-white);

        &:hover {
          background-color: var(--color-semantic-informative-accent-hover);
        }
      }
    }
  }
`;

export type SkillCategoryFilterNameType = '전체보기' | SKILL_CATEGORY;

type SkillCategoryFilterType = {
  id: SkillCategoryFilterNameType;
  name: (typeof SKILL_CATEGORY_LABELS)[SKILL_CATEGORY];
};

interface SkillCategoryFilterProps {
  selectedCategory: SkillCategoryFilterNameType;
  isAllDisabled?: boolean;
  onTabClickHandler: (selectedCategory: SkillCategoryFilterNameType) => void;
}

const SkillCategoryFilter = ({
  selectedCategory,
  onTabClickHandler,
  isAllDisabled = false,
}: SkillCategoryFilterProps) => {
  const categoryAll = { id: '전체보기', name: '전체보기' };
  const skillCategories = [
    ...Object.keys(SKILL_CATEGORIES).map((key) => ({ id: key, name: SKILL_CATEGORY_LABELS[key as SKILL_CATEGORY] })),
  ];

  return (
    <SkillCategoryFilterWrapper>
      <TabList
        className="skill-type-filter-tab-list"
        tabList={isAllDisabled ? skillCategories : [categoryAll, ...skillCategories]}
        selectedTab={{
          name: SKILL_CATEGORY_LABELS[selectedCategory as SKILL_CATEGORY] ?? '전체보기',
        }}
        onTabClick={(tab) => {
          onTabClickHandler((tab as SkillCategoryFilterType).id);
        }}
      />
    </SkillCategoryFilterWrapper>
  );
};

export default SkillCategoryFilter;
