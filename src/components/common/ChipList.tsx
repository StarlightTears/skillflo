import React from 'react';

import Chip from './Chip';

import type { Item } from '@/types/common.interface';
import type { PropsWithStyle } from '@/types/component.interface';

interface ChipListProps {
  chipList: Item[];
  selectedChip: Item;
  onClick: (chip: Item, event: React.MouseEvent) => void;
}

const ChipList = ({ className, chipList, selectedChip, onClick }: PropsWithStyle<ChipListProps>) => {
  return (
    <div className={className}>
      {chipList.map((chip, index) => {
        return (
          <Chip
            key={index}
            className={chip.id === selectedChip.id ? 'focus' : ''}
            onClick={(event) => onClick(chip, event)}
          >
            {chip.name}
          </Chip>
        );
      })}
    </div>
  );
};

export default ChipList;
