import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { TabList as FCTabList } from '@fastcampus/fastcomponents';
import type { TabListProps } from '@fastcampus/fastcomponents';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const TabListBlock = styled.div``;

const tabListStyle = css`
  display: flex;

  .tab {
    ${legacyTypographyMixin('body1')}
    padding-bottom: 0.6rem;
    font-weight: 700;
    cursor: pointer;

    &:not(:last-of-type) {
      margin-right: 1.6rem;
    }

    &.selected {
      border-bottom: 0.2rem solid var(--color-white);
    }
  }
`;

const TabList = ({ className, tabList, selectedTab, onTabClick }: TabListProps) => {
  return (
    <TabListBlock>
      <FCTabList
        css={tabListStyle}
        className={className}
        tabList={tabList}
        onTabClick={onTabClick}
        selectedTab={selectedTab}
      ></FCTabList>
    </TabListBlock>
  );
};

export default TabList;
