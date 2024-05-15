import styled from '@emotion/styled';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { ArrowRight, ArrowLeft, Button } from '@/components';
import { useViewport } from '@/shared/hooks';
import { legacyTypographyMixin, media } from '@/styles/legacy-mixins';

interface PrevNextPaginationProps {
  firstId: number;
  lastId: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

const PrevNextPaginationBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4rem;
  margin-bottom: 9.6rem;

  .fc-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    margin-left: 1.6rem;
    padding: 0.8rem 0;
    ${legacyTypographyMixin('body2')}

    &.left {
      padding-right: 1.6rem;
      padding-left: 0.4rem;
    }

    &.right {
      padding-right: 0.4rem;
      padding-left: 1.6rem;
    }

    ${media('large')} {
      width: 9.6rem;
      height: 4rem;
    }
  }
`;

const PrevNextPagination = ({ firstId, lastId, isFirstPage, isLastPage }: PrevNextPaginationProps) => {
  const { isLargeViewport } = useViewport();
  const [searchParams, setSearchParams] = useSearchParams();

  const movePrevPage = () => {
    searchParams.set('mode', 'prev');
    searchParams.set('lastId', String(firstId));
    setSearchParams(searchParams);
  };

  const moveNextPage = () => {
    searchParams.set('mode', 'next');
    searchParams.set('lastId', String(lastId));
    setSearchParams(searchParams);
  };

  return (
    <PrevNextPaginationBlock>
      <Button theme="outline" className="left" disabled={isFirstPage} onClick={movePrevPage}>
        <ArrowLeft />
        {isLargeViewport ? '이전목록' : '이전'}
      </Button>
      <Button theme="outline" className="right" disabled={isLastPage} onClick={moveNextPage}>
        {isLargeViewport ? '다음목록' : '다음'}
        <ArrowRight />
      </Button>
    </PrevNextPaginationBlock>
  );
};

export default PrevNextPagination;
