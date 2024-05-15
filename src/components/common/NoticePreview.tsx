import React from 'react';

import NoticeList from './NoticeList';
import PagePreviewWrapper from './PagePreviewWrapper';

import type { Notice } from '@/types/common.interface';

interface NoticePreviewProps {
  className?: string;
  noticeList: Notice[];
}

const NoticePreview = ({ className, noticeList }: NoticePreviewProps) => {
  return (
    <PagePreviewWrapper className={className} title="공지사항" link="/mypage/notice">
      <NoticeList noticeList={noticeList} />
    </PagePreviewWrapper>
  );
};

export default NoticePreview;
