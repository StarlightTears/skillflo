import styled from '@emotion/styled';
import classNames from 'classnames';
import React from 'react';

interface PaginationBarProps {
  barLength: number;
  selectedBarIndex: number;
}

const PaginactionBarBlock = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const Bar = styled.div`
  width: 2rem;
  height: 0.2rem;
  background: rgba(255 255 255 / 30%);

  &.selected {
    background: var(--color-white);
  }
`;

const PaginationBar = ({ barLength, selectedBarIndex }: PaginationBarProps) => {
  return (
    <PaginactionBarBlock>
      {Array.from(Array(barLength), (bar, index) => (
        <Bar key={index} className={classNames({ selected: index === selectedBarIndex })} />
      ))}
    </PaginactionBarBlock>
  );
};

export default PaginationBar;
