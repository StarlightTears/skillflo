import styled from '@emotion/styled';
import React from 'react';

import { ArrowRight } from '..';
import Button from '../common-renewal/Button';

import type { Notice } from '@/types/common.interface';

import { COURSE_DETAIL_NOTICE_MAX_LENGTH } from '@/shared/policy';
import { dateFormat } from '@/shared/utils/date';
import { homeMedia, textEllipsis, typographyMixin } from '@/styles/mixins';

interface NoticeListProps {
  noticeList: Notice[];
}

const NoticeListBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  ul {
    flex: 1 0 0;
    width: 100%;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${typographyMixin('p2')};

    &:not(:last-of-type) {
      margin-bottom: 0.8rem;
    }

    span:first-of-type {
      max-width: 57.6rem;
      ${textEllipsis(1)};
    }

    span:last-of-type {
      margin-left: 4rem;
      color: var(--color-gray-500);
      ${typographyMixin('p3')};
    }
  }

  .more-view-btn {
    margin-top: 0.8rem;
    color: var(--color-primary-700);
  }

  ${homeMedia('large', 'xlarge')} {
    flex-direction: row;
    justify-content: space-between;

    .more-view-btn {
      flex: 6.9rem 0 0;
      margin-top: 0;
      margin-left: 6.1rem;
    }
  }
`;

const NoticeList = ({ noticeList }: NoticeListProps) => {
  return (
    <NoticeListBlock>
      <ul>
        {noticeList.slice(0, COURSE_DETAIL_NOTICE_MAX_LENGTH).map((notice) => (
          <li key={notice.id}>
            <span>{notice.name}</span>
            <span>{dateFormat(notice.extras.exposedStartedAt)}</span>
          </li>
        ))}
      </ul>
      <Button className="more-view-btn" theme="none" size="xsmall" rightIcon={<ArrowRight />}>
        더보기
      </Button>
    </NoticeListBlock>
  );
};

export default NoticeList;
