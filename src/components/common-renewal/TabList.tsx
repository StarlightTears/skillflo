import styled from '@emotion/styled';
import React from 'react';

import { TabList as FCTabList, TabListProps } from '@fastcampus/fastcomponents';

const TabListWrapper = styled.section`
  .fc-tab-list {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .tab {
      flex-grow: 1;
      margin: 0;
      padding: 1.15rem 0;
      border-bottom: 1px solid var(--color-gray-100);
      font-weight: 400;
      font-size: 1.5rem;
      color: var(--color-gray-800);
      line-height: 140%;
      text-align: center;
      cursor: pointer;
    }

    .tab.selected {
      border-bottom: 2px solid var(--color-blue-600);
      font-weight: 600;
      color: var(--color-blue-600);
    }
  }
`;

const TabList = (tabListProps: TabListProps) => {
  return (
    <TabListWrapper>
      <FCTabList {...tabListProps} />
    </TabListWrapper>
  );
};

export default TabList;
