import styled from '@emotion/styled';
import React, { SetStateAction } from 'react';

import type { LabelValue } from '@/types/common.interface';

import { ClassroomFold, ClassroomUnfold } from '@/components';
import { useCloseClickOutside } from '@/shared/hooks/useCloseClickOutside';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

type Direction = 'up' | 'down';

interface ClassroomOptionButtonProps {
  direction: Direction;
  className?: string;
  list: LabelValue[];
  selectedItem: LabelValue;
  setListItem: React.Dispatch<SetStateAction<LabelValue>>;
}

const OptionButtonBlock = styled.div<{ isOpenOptionList: boolean; direction: Direction }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 2.4rem;
  padding: 0.4rem 0.4rem 0.4rem 0.8rem;
  font-weight: 700;
  ${legacyTypographyMixin('caption')};
  cursor: pointer;

  ${({ isOpenOptionList, direction }) => {
    if (isOpenOptionList) {
      return `
        background-color: var(--legacy-color-gray-800);
        ${
          direction === 'up' &&
          `
            border-top: 0.1rem solid var(--legacy-color-gray-600);
            border-radius: 0 0 0.4rem 0.4rem;
          `
        };
        ${
          direction === 'down' &&
          `
            border-bottom: 0.1rem solid var(--legacy-color-gray-600);
            border-radius: 0.4rem 0.4rem 0 0;
          `
        };
      `;
    } else {
      return `
        background-color: inherit;
        border-radius: 0.4rem;
        &:hover {
          background-color: var(--legacy-color-gray-700);
        }
      `;
    }
  }}

  svg {
    margin-left: auto;
  }

  .option-list {
    position: absolute;
    left: 0;
    z-index: var(--z-classroom-option-btn);
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0.8rem;
    border-radius: 0.4rem 0.4rem 0 0;
    background-color: var(--legacy-color-gray-800);
    color: var(--legacy-color-gray-300);

    ${({ direction }) => {
      return `
        ${direction === 'up' && 'bottom: 2.5rem; border-radius: 0.4rem 0.4rem 0 0;'};
        ${direction === 'down' && 'top: 2.5rem; border-radius: 0 0 0.4rem 0.4rem;'};
      `;
    }}

    .item {
      padding: 0.4rem 0;

      &:hover {
        color: var(--color-white);
      }
    }
  }
`;

const ClassroomOptionButton = ({
  direction,
  className,
  list,
  selectedItem,
  setListItem,
}: ClassroomOptionButtonProps) => {
  const [elementRef, isOpenOptionList, setIsOpenOptionList] = useCloseClickOutside<HTMLDivElement>();
  return (
    <OptionButtonBlock
      direction={direction}
      className={className}
      isOpenOptionList={isOpenOptionList}
      ref={elementRef}
      onClick={() => setIsOpenOptionList(!isOpenOptionList)}
    >
      {isOpenOptionList && (
        <div className="option-list">
          {list.map((item, index) => (
            <div className="item" key={index} onClick={() => setListItem(item)}>
              {item.label}
            </div>
          ))}
        </div>
      )}
      {selectedItem.label}
      {isOpenOptionList ? <ClassroomFold /> : <ClassroomUnfold />}
    </OptionButtonBlock>
  );
};

export default ClassroomOptionButton;
