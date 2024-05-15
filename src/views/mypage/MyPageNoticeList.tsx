import { css } from '@emotion/react';
import classNames from 'classnames';
// import React, { useState, useEffect } from 'react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { NoticeList, PaginationController, MypageSubPageWrapper } from '@/components';
import { useMypageNoticeList } from '@/shared/hooks/mypage';

const NOTICE_COUNT_PER_PAGE = 7;

const MyPageNoticeList = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const currentPageIndex = Number(searchParam.get('offset')) || 0;
  const { noticeList, total } = useMypageNoticeList({
    offset: currentPageIndex * NOTICE_COUNT_PER_PAGE,
    limit: NOTICE_COUNT_PER_PAGE,
  });

  const lastPageIndex = Math.ceil(total / NOTICE_COUNT_PER_PAGE) - 1;

  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === lastPageIndex;

  const movoToPrevPage = () => {
    if (isFirstPage) return;
    setSearchParam({ offset: String(currentPageIndex - 1) });
  };
  const moveToNextPage = () => {
    if (isLastPage) return;
    setSearchParam({ offset: String(currentPageIndex + 1) });
  };
  // const useRelativeTime = (date: Date) => {
  //   const [relativeTime, setRelativeTime] = useState('');

  //   useEffect(() => {
  //     const calculateRelativeTime = () => {
  //       const secondsAgo = Math.floor((Date.now() - date.getTime()) / 1000);

  //       const intervals = [
  //         { label: 'year', seconds: 31536000 },
  //         { label: 'month', seconds: 2592000 },
  //         { label: 'day', seconds: 86400 },
  //         { label: 'hour', seconds: 3600 },
  //         { label: 'minute', seconds: 60 },
  //         { label: 'second', seconds: 1 },
  //       ];

  //       for (let i = 0; i < intervals.length; i++) {
  //         const interval = intervals[i];
  //         const count = Math.floor(secondsAgo / interval.seconds);
  //         if (count >= 1) {
  //           setRelativeTime(`${count} ${interval.label}${count === 1 ? '' : 's'} ago`);
  //           return;
  //         }
  //       }

  //       setRelativeTime('just now');
  //     };

  //     return calculateRelativeTime(); // Initial calculation
  //   }, []);

  //   return relativeTime;
  // };

  // const date = new Date('2024-05-13T09:56:54.000Z'); // Replace with your date
  // const relativeTime = useRelativeTime(date);

  return (
    <MypageSubPageWrapper title="공지사항">
      <NoticeList noticeList={noticeList} />
      <PaginationController
        onClickPrevious={movoToPrevPage}
        onClickNext={moveToNextPage}
        disabledPrevious={isFirstPage}
        disabledNext={isLastPage}
        css={css`
          width: fit-content;
          margin: 4rem auto 0;

          .page-list {
            display: flex;
          }

          .page {
            width: 3.2rem;
            height: 3.2rem;

            line-height: 3.2rem;

            cursor: pointer;

            &.current {
              border-radius: 0.6rem;
              background-color: var(--legacy-color-gray-50);

              font-weight: 700;
              color: var(--legacy-color-gray-900);
            }
          }
        `}
      >
        <ul className="page-list">
          {Array.from({ length: lastPageIndex + 1 }, (_, pageIndex) => (
            <li
              key={pageIndex}
              onClick={() => {
                setSearchParam({ offset: String(pageIndex) });
              }}
              className={classNames('page', {
                current: currentPageIndex === pageIndex,
              })}
            >
              {pageIndex + 1}
            </li>
          ))}
        </ul>
      </PaginationController>
    </MypageSubPageWrapper>
  );
};

export default MyPageNoticeList;
