import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

interface MypageDataRowProps {
  title: ReactNode;
  value: ReactNode;
}

const MypageDataRowBlock = styled.div`
  display: flex;
  justify-content: space-between;
  height: 2.4rem;

  .title {
    color: var(--legacy-color-gray-400);
  }
`;

const MypageDataRow = ({ title, value }: MypageDataRowProps) => {
  return (
    <MypageDataRowBlock>
      <span className="title">{title}</span>
      <span className="value">{value}</span>
    </MypageDataRowBlock>
  );
};

export default MypageDataRow;
