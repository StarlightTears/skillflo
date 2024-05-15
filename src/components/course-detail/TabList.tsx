import styled from '@emotion/styled';
import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import type { LabelValue } from '@/types/common.interface';

import { homeMedia, typographyMixin } from '@/styles/mixins';

interface TabListProps {
  tabList: LabelValue[];
}

const TabListBlock = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  box-sizing: border-box;
  margin-bottom: 1.6rem;
  padding: 1.2rem 2rem 0;
  border-bottom: 0.2rem solid var(--color-gray-100);

  li {
    padding-bottom: 0.8rem;
    cursor: pointer;
    transform: translateY(0.2rem);
    ${typographyMixin('p1')};

    &.selected {
      border-bottom: 0.2rem solid var(--color-primary-700);
      color: var(--color-primary-700);
      ${typographyMixin('p1', 'bold')};
    }
  }

  ${homeMedia('large', 'xlarge')} {
    flex-direction: column;
    align-self: start;
    margin-bottom: 0;
    padding: 0;
    border-bottom: 0;
    border-left: 0.2rem solid var(--color-gray-100);

    li {
      width: 16rem;
      padding-left: 2.4rem;
      transform: translateX(-0.2rem);

      &.selected {
        border-bottom: 0;
        border-left: 0.2rem solid var(--color-primary-700);
      }
    }
  }
`;

const TabList = ({ tabList }: TabListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <TabListBlock>
      {tabList.map((tab) => (
        <li
          key={tab.value}
          className={classNames({ selected: tab.value === searchParams.get('tab') })}
          onClick={() => setSearchParams({ tab: tab.value as string })}
        >
          {tab.label}
        </li>
      ))}
    </TabListBlock>
  );
};

export default TabList;
