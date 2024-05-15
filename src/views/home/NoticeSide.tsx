import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';

import type { Notice } from '@/types/common.interface';

import { Badge } from '@/components';
import ViewAllListLink from '@/components/common/ViewAllListLink';
import { dateFormat } from '@/shared/utils/date';
import { isPrimaryNotice } from '@/shared/utils/notice';
import { NoticePrimaryBadgeStyle } from '@/styles/custom';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface NoticeSideProps {
  noticeList: Notice[];
}

const NoticeWrapper = styled.section`
  .section-title {
    ${legacyTypographyMixin('XLarge')}
    padding-bottom: 1.2rem;
    font-weight: 700;
  }

  ul {
    display: flex;
    flex-flow: column wrap;
    gap: 2rem;
  }

  .title {
    ${legacyTypographyMixin('Medium')}
    font-weight: 500;
    color: var(--color-text-black);

    :hover {
      text-decoration: underline;
    }
  }

  .date {
    ${legacyTypographyMixin('XSmall')}
    color: var(--color-text-gray)
  }
`;

const NoticeSide = ({ noticeList }: NoticeSideProps) => {
  return (
    <NoticeWrapper>
      <div className="section-title">공지사항</div>
      <ul>
        {noticeList.map((notice) => {
          return (
            <li key={notice.id}>
              <Link to={`/notice/${notice.id}`} data-e2e="notice">
                <div className="title">
                  {isPrimaryNotice(notice.extras.priority) && (
                    <Badge theme="whiteblue" css={NoticePrimaryBadgeStyle}>
                      필독
                    </Badge>
                  )}
                  {notice.name}
                </div>
                <div className="date">{dateFormat(notice.createdAt)}</div>
              </Link>
            </li>
          );
        })}
      </ul>
      <ViewAllListLink to={'/mypage/notice'} e2eTestId="notice-all" />
    </NoticeWrapper>
  );
};

export default NoticeSide;
