import styled from '@emotion/styled';
import React, { useState } from 'react';

import { Tab } from '@fastcampus/fastcomponents';

import TabList from '../common-renewal/TabList';

const SkillLevelTabListWrapper = styled.section`
  border-radius: 0.6rem;
  background-color: #f5f6f7;

  pre {
    padding: 1.6rem;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 150%;
    letter-spacing: -0.15px;
    white-space: pre-wrap;
  }
`;

const SkillLevelTabList = ({
  userLevel,
  descriptions,
  maxLevel = 5,
}: {
  userLevel: number;
  descriptions: string[];
  maxLevel?: number;
}) => {
  const tabList = Array.from({ length: maxLevel + 1 }, (_, idx) => ({
    id: idx.toString(),
    name: `Lv.${idx.toString()}`,
  }));

  const [selectedTab, setSelectedTab] = useState<Tab>(tabList[userLevel]);

  return (
    <SkillLevelTabListWrapper>
      <TabList
        className="skill-level-tab-list"
        tabList={tabList}
        selectedTab={selectedTab}
        onTabClick={(tab) => {
          setSelectedTab(tab);
        }}
      />
      <pre>{descriptions[Number(selectedTab.id)]}</pre>
    </SkillLevelTabListWrapper>
  );
};

export default SkillLevelTabList;
