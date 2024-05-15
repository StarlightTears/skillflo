import styled from '@emotion/styled';
import React from 'react';

import AttachedList from '../common/AttachedList';

import type { Notice } from '@/types/common.interface';

import { dateFormat } from '@/shared/utils/date';
import { typographyMixin } from '@/styles/mixins';

interface NoticeModalContentProps {
  noticeList: Notice[];
}

const NoticeModalContentBlock = styled.ul`
  padding: 2rem 0;

  li {
    &:not(:last-of-type) {
      margin-bottom: 2rem;
    }

    .notice-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 0.8rem;

      span:first-of-type {
        word-break: break-all;
        ${typographyMixin('p1', 'bold')};
      }

      span:last-of-type {
        color: var(--color-gray-500);
        ${typographyMixin('p3')};
      }
    }

    .divider {
      margin-top: 1.2rem;
      border-bottom: 0.1rem solid var(--color-gray-100);
    }

    .notice-content {
      padding: 2rem 1.6rem;
      color: var(--color-gray-600);
      white-space: pre-line;
      word-break: break-all;
    }
  }
`;

const NoticeModalContent = ({ noticeList }: NoticeModalContentProps) => {
  return (
    <NoticeModalContentBlock>
      {noticeList.map((notice) => {
        return (
          <li key={notice.id}>
            <div className="notice-header">
              <span>{notice.name}</span>
              <span>{dateFormat(notice.extras.exposedStartedAt)}</span>
            </div>
            <AttachedList hideLabel fileList={notice.extras.attached.map((attached) => attached.url)} />
            <div className="divider" />
            <div className="notice-content">{notice.extras.content}</div>
          </li>
        );
      })}
    </NoticeModalContentBlock>
  );
};

export default NoticeModalContent;
