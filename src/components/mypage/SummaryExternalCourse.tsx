import React from 'react';

import { PagePreviewWrapper, MypageCourseList } from '@/components';
import { useRecentCourseList } from '@/shared/hooks/mypage';

const MypageSummaryExternalCourse = () => {
  const recentCourseList = useRecentCourseList();

  return (
    <PagePreviewWrapper title="최근 수강현황" link="/mypage/recents">
      <MypageCourseList courseProgressList={recentCourseList.slice(0, 3)} />
    </PagePreviewWrapper>
  );
};

export default MypageSummaryExternalCourse;
