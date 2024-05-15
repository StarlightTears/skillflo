import styled from '@emotion/styled';
import React, { FC } from 'react';

import { EmptyNoticeBlue } from '..';
import EmptyPlaceholder from '../mypage/EmptyPlaceholder';

import Badge from './Badge';
import Link from './Link';

import { useViewport } from '@/shared/hooks';
import { dateFormat } from '@/shared/utils/date';
import { getNoticeTypeLabel } from '@/shared/utils/notice';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';
import { NoticePriority, type Notice } from '@/types/common.interface';

interface NoticeListProps {
  noticeList: Notice[];
}

const NoticeListBlock = styled.ul`
  ${media('small')} {
    margin: 0 1.6rem;
  }

  .notice {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem 1rem;
    align-items: center;
    padding: 2rem 0;
    border-bottom: 0.1rem solid var(--legacy-color-gray-100);

    ${legacyTypographyMixin('caption')}
    color: var(--legacy-color-gray-500);
    text-decoration: none;

    .title {
      width: 100%;

      ${legacyTypographyMixin('body2')}
      font-weight: 700;
      color: var(--legacy-color-gray-900);
    }

    ${media('large')} {
      flex-wrap: nowrap;
      gap: 0;
      padding: 1.6rem 1rem;

      .badge {
        flex: 0 0 auto;
        grid-row: 1rem;
        margin: 0 1rem 0 0;
      }

      .title {
        flex: 1 1 auto;
        width: auto;
        margin: 0 4rem 0 0;
      }

      .notice-type {
        width: 5rem;
        margin: 0 4rem 0 0;

        text-align: right;
      }

      .date {
        width: 7rem;
        text-align: right;
      }
    }
  }
`;

const NoticeList: FC<NoticeListProps> = ({ noticeList }) => {
  const { isLargeViewport } = useViewport();

  if (!noticeList.length) {
    return (
      <EmptyPlaceholder>
        <EmptyNoticeBlue />
        공지사항이 없습니다.
      </EmptyPlaceholder>
    );
  }

  return (
    <NoticeListBlock>
      {noticeList.map((notice) => {
        const priorityBadgeNode = notice.extras.priority === NoticePriority.PRODUCT_PRIMARY && (
          <Badge theme="lightblue" className="badge">
            필독
          </Badge>
        );

        return (
          <li key={notice.id} className="notice-item">
            <Link to={`/notice/${notice.id}`} disabledUnderLine className="notice">
              {isLargeViewport && priorityBadgeNode}
              <div className="title">{notice.name}</div>
              {!isLargeViewport && priorityBadgeNode}
              <div className="notice-type">{getNoticeTypeLabel(notice.extras.tags)}</div>
              <div className="date">{dateFormat(notice.createdAt)}</div>
            </Link>
          </li>
        );
      })}
    </NoticeListBlock>
  );
};

export default NoticeList;
