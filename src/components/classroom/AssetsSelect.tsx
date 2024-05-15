import styled from '@emotion/styled';
import React from 'react';

import type { Asset } from '@/types/asset.interface';

import { ClassroomAssetsList, ClassroomAssetsListItem } from '@/components';
import { useCloseClickOutside } from '@/shared/hooks/useCloseClickOutside';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface ClassroomAssetsSelectProps {
  className?: string;
  assetsList: Asset[];
  label: string;
  onClickAssetItem: (item: Asset) => void;
}

const ClassroomAssetsSelectBlock = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 4rem;
  margin-left: 0.8rem;
  padding: 0 1.2rem;
  ${legacyTypographyMixin('body2')}
  font-weight: 700;
  cursor: pointer;

  .asset-list-count {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    height: 2rem;
    margin-left: 0.4rem;
    padding: 0.2rem;
    border-radius: 0.4rem;
    background-color: var(--legacy-color-gray-800);
  }
`;

const ClassroomAssetsSelect = ({ className, assetsList, label, onClickAssetItem }: ClassroomAssetsSelectProps) => {
  const [elementRef, isOpenElement, setIsOpenElement] = useCloseClickOutside<HTMLDivElement>();

  return (
    <ClassroomAssetsSelectBlock
      className={className}
      onClick={() => {
        setIsOpenElement(!isOpenElement);
      }}
      ref={elementRef}
    >
      {isOpenElement && assetsList.length > 0 && (
        <ClassroomAssetsList>
          <header>{label}</header>
          {assetsList.map((assetItem, index) => (
            <ClassroomAssetsListItem key={index} assetItem={assetItem} onClick={() => onClickAssetItem(assetItem)} />
          ))}
        </ClassroomAssetsList>
      )}
      {label}
      <span className="asset-list-count">{assetsList.length}</span>
    </ClassroomAssetsSelectBlock>
  );
};

export default ClassroomAssetsSelect;
