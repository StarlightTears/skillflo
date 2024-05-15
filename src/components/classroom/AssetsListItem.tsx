import styled from '@emotion/styled';
import React from 'react';

import type { Asset } from '@/types/asset.interface';

import { ClassroomLink, Download } from '@/components';

interface AssetsListItemProps {
  assetItem: Asset;
  onClick: () => void;
}

const AssetsListItemBlock = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0.8rem;
  border-radius: 0.6rem;
  background-color: var(--legacy-color-gray-800);
  font-weight: 500;

  svg {
    flex: 0 0 2rem;
    margin-right: 0.4rem;
  }

  span {
    min-width: 0;
    word-wrap: break-word;
  }

  &:not(:last-of-type) {
    margin-bottom: 0.4rem;
  }
`;

const getIconByAssetItemType = (type: string) => {
  switch (type) {
    case 'link':
      return <ClassroomLink />;
    case 'file':
      return <Download />;
    default:
      return <></>;
  }
};

const AssetsListItem = ({ assetItem, onClick }: AssetsListItemProps) => {
  return (
    <AssetsListItemBlock onClick={onClick}>
      {assetItem.type && getIconByAssetItemType(assetItem.type)}
      <span>{assetItem.name}</span>
    </AssetsListItemBlock>
  );
};

export default AssetsListItem;
