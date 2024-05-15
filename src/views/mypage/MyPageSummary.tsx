import styled from '@emotion/styled';
import React from 'react';

import {
  MypageSubPageWrapper,
  MypageSummaryExternalCourse,
  MypageSummaryLearningCalendar,
  MypageSummaryMonthlyChart,
  MypageSummaryRequiredProgress,
  MypageSummaryWeeklyGoal,
  NoticePreview,
} from '@/components';
import { useNoticeList } from '@/shared/hooks/mypage';
import { media } from '@/styles/legacy-mixins';

const MypageSumamryCardListBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--mypage-summary-gap);

  ${media('small')} {
    margin: 0 1.6rem;
  }

  ${media('large')} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BottomWrapper = styled.div`
  ${media('small')} {
    margin: 0 1.6rem;
  }
`;

const MyPageSummary = () => {
  const { data: noticeList } = useNoticeList(true);

  return (
    <MypageSubPageWrapper title="내 수강정보">
      <MypageSumamryCardListBlock>
        <MypageSummaryMonthlyChart />
        <MypageSummaryLearningCalendar />
        <MypageSummaryWeeklyGoal />
      </MypageSumamryCardListBlock>
      <BottomWrapper>
        <MypageSummaryRequiredProgress />
        <MypageSummaryExternalCourse />
        <NoticePreview noticeList={noticeList} />
      </BottomWrapper>
    </MypageSubPageWrapper>
  );
};

export default MyPageSummary;
