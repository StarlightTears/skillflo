import styled from '@emotion/styled';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { AttachedList, Button } from '@/components';
import { useViewport } from '@/shared/hooks';
import { useNotice } from '@/shared/hooks/mypage';
import { dateFormat } from '@/shared/utils/date';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';

const NoticeViewBlock = styled.div`
  .page-title {
    padding: 1.6rem 0;

    ${legacyTypographyMixin('body1')}
    font-weight: 700;
    color: var(--legacy-color-gray-900);
  }

  .info {
    padding: 1rem 0 2rem;
  }

  .date {
    ${legacyTypographyMixin('caption')}
    color: var(--legacy-color-gray-400);
  }

  .notice-title {
    margin: 0 0 0.4rem;

    ${legacyTypographyMixin('headline5')}
    font-weight: 700;
    color: var(--legacy-color-gray-900);
  }

  .course-info {
    display: flex;
    gap: 0.8rem;
    margin: 0 0 2rem;

    ${legacyTypographyMixin('body2')}
    color: var(--legacy-color-gray-500);

    .course-title {
      font-weight: 700;
      color: var(--legacy-color-gray-600);
    }
  }

  .file-info {
    display: flex;
    align-items: center;
    margin: 0 0 2rem;
    padding: 0.8rem 0.4rem;

    ${legacyTypographyMixin('body2')}
    color: var(--legacy-color-gray-900);
  }

  .file-icon {
    margin: 0 0.4rem 0 0;
  }

  .info > *:last-child {
    margin-bottom: 0;
  }

  .content {
    margin: 0 0 2rem;
    padding: 2rem 0;
    border-top: 0.1rem solid var(--legacy-color-gray-100);
    border-bottom: 0.1rem solid var(--legacy-color-gray-100);

    ${legacyTypographyMixin('body2')}
    white-space: pre-wrap;
  }

  .list-link-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  .list-link-button {
    width: 8rem;
    height: 4rem;
  }

  ${media('large')} {
    .page-title {
      padding: 2rem 0;
      ${legacyTypographyMixin('headline2')}
    }

    .info-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 0.8rem;
    }

    .date,
    .notice-title {
      margin: 0;
    }

    .content {
      padding: 2rem 1.6rem;
    }
  }
`;

const NoticeView = () => {
  const params = useParams();
  const noticeId = Number(params.noticeId);
  const { data: notice } = useNotice(noticeId);
  const { isLargeViewport } = useViewport();

  if (!notice) return null;

  return (
    <NoticeViewBlock>
      <div className="page-title">공지사항</div>
      <div className="info">
        <div className="info-head">
          {isLargeViewport && <div className="notice-title">{notice.name}</div>}
          <div className="date">{dateFormat(notice.createdAt)}</div>
          {!isLargeViewport && <div className="notice-title">{notice.name}</div>}
        </div>
        <AttachedList hideLabel fileList={notice.extras.attached.map((attached) => attached.url)} />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: notice.extras.content,
        }}
      />
      <div className="list-link-wrapper">
        <Link to="/mypage/notice">
          <Button theme="primary" className="list-link-button">
            목록으로
          </Button>
        </Link>
      </div>
    </NoticeViewBlock>
  );
};

export default NoticeView;
