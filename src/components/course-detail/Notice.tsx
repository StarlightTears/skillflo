import React, { useState } from 'react';

import type { Notice } from '@/types/common.interface';
import type { PropsWithStyle } from '@/types/component.interface';

import { Modal } from '@/components';
import Description from '@/components/course-detail/Description';
import NoticeList from '@/components/course-detail/NoticeList';
import NoticeModalContent from '@/components/course-detail/NoticeModalContent';

interface NoticeProps {
  noticeList?: Notice[];
}

const Notice = ({ className, noticeList }: PropsWithStyle<NoticeProps>) => {
  const [isOpenNoticeModal, setIsOpenNoticeModal] = useState(false);

  if (!noticeList || !noticeList.length) return;

  return (
    <>
      <Description
        className={className}
        term="강의 공지"
        description={<NoticeList noticeList={noticeList} />}
        onClick={() => setIsOpenNoticeModal(true)}
      />
      {isOpenNoticeModal && (
        <Modal
          size="fit"
          title="강의 공지"
          content={<NoticeModalContent noticeList={noticeList} />}
          onCloseModal={() => setIsOpenNoticeModal(false)}
          hasContentHr
          hasCloseButton
          hideFooter
          fullScreen
        />
      )}
    </>
  );
};

export default Notice;
