import { useQuery } from '@tanstack/react-query';
import React, { FC, useEffect, useMemo, useState } from 'react';

import { ColumnChart, ColumnChartData, ColumnConfig } from '@fastcampus/fastcomponents';

import { PaginationController, MypageSummaryCard, MypageTimeDataRow } from '@/components';
import { getMonthlyPlayTime } from '@/shared/api/statistic';
import { useCurrentMember, useCurrentMemberGroup } from '@/shared/hooks';
import { useMonthPagination, useRecentCourseList } from '@/shared/hooks/mypage';
import { EXTRAS_TAGS, QUERY_KEYS, RANGE_OF_MONTH } from '@/shared/policy';
import { dateFormat } from '@/shared/utils/date';

const Chartconfig: Partial<ColumnConfig> = {
  height: 232,
  label: false,
  yAxis: false,
  xAxis: {
    tickLine: {
      length: 0,
    },
  },
  tooltip: false,
};

const MypageSummaryMonthlyChart: FC = () => {
  const {
    monthText,
    isFirstMonth,
    isLastMonth,
    chartData,
    moveMonth,
    memberCreatedAtSubscription,
    totalLearningTime,
    totalIncreaseLearningTime,
    totalCompletionCertificateLearningTime,
  } = useSummaryMonthlyChart();

  const { data: currentMemberGroupData } = useCurrentMemberGroup();
  const isCompletionCertificateLearningTimeExposed = currentMemberGroupData?.extras.tags?.includes(
    EXTRAS_TAGS.COMPLETION_CERTIFICATE_EXPOSE
  );

  const monthlyChartInfoList = [
    {
      title: '수강시간',
      content: '영상을 재생하여 수강한 총 시간입니다. 반복한 구간은 포함되지 않습니다.',
    },
    isCompletionCertificateLearningTimeExposed
      ? {
          title: '수료인정 수강시간',
          content: '수료인정 강의를 재생하여 수강한 총시간입니다. 반복한 구간은 포함되지 않습니다.',
        }
      : { title: '누적 수강시간', content: '영상을 반복하여 재생한 시간까지 포함하는 수강시간입니다.' },
  ];

  return (
    <MypageSummaryCard
      title="학습시간"
      head={
        <>
          <span className="create-date-text">{memberCreatedAtSubscription}</span>
          <MypageTimeDataRow title="수강시간" value={totalLearningTime || 0} />
          {isCompletionCertificateLearningTimeExposed ? (
            <MypageTimeDataRow title="수료인정 수강시간" value={totalCompletionCertificateLearningTime} />
          ) : (
            <MypageTimeDataRow title="누적 수강시간" value={totalIncreaseLearningTime} />
          )}
        </>
      }
      infoIconContentList={monthlyChartInfoList}
      style={{ overflow: 'hidden' }}
    >
      <PaginationController
        disabledPrevious={isFirstMonth}
        disabledNext={isLastMonth}
        onClickPrevious={() => moveMonth(-1)}
        onClickNext={() => moveMonth(1)}
      >
        {monthText}
      </PaginationController>
      <div style={{ height: '1.2rem' }} />
      <ColumnChart data={chartData} config={Chartconfig} />
    </MypageSummaryCard>
  );
};

const useSummaryMonthlyChart = () => {
  const { member } = useCurrentMember();
  const DIFF_MONTH_FROM_RANGE_END_MONTH = RANGE_OF_MONTH - 1;
  const [chartData, setChartData] = useState<ColumnChartData[]>([]);

  const firstMonth = useMemo(() => {
    if (!member?.created_at) return 0;

    const currentDate = new Date();
    const result = new Date(member.created_at);
    result.setMonth(result.getMonth() + DIFF_MONTH_FROM_RANGE_END_MONTH);

    return result < currentDate ? result : new Date(member.created_at);
  }, [member?.created_at]);

  const {
    date: endDate,
    monthText: endMonthText,
    isFirstMonth,
    isLastMonth,
    moveMonth,
  } = useMonthPagination({ firstMonth });

  const startDate = useMemo(() => {
    const startMonth = new Date(endDate);
    startMonth.setMonth(startMonth.getMonth() - DIFF_MONTH_FROM_RANGE_END_MONTH);

    return startMonth;
  }, [member?.created_at, endDate]);

  const monthText = useMemo(() => {
    const startMonthText = dateFormat(startDate, 'YYYY년 M월');

    return `${startMonthText} - ${endMonthText}`;
  }, [startDate, endDate]);

  const memberCreatedAtSubscription = `${dateFormat(new Date(member?.created_at || 0), 'YYYY년 MM월 DD일')} 이후`;

  const since = dateFormat(new Date(member?.created_at || 0), 'YYYY-MM-DD');
  const nextDay = new Date().setDate(new Date().getDate() + 1);
  const until = dateFormat(nextDay, 'YYYY-MM-DD');

  const { data: monthlyMemberLearningTime = { normal: {}, increase: {} } } = useQuery(
    QUERY_KEYS.MONTHLY_MEMBER_LEARNING_TIME(member?.id, since, until),
    () => getMonthlyPlayTime(since, until).then((data) => data?.data?.data),
    {
      enabled: !!member,
    }
  );

  useEffect(() => {
    if (!(startDate && endDate && monthlyMemberLearningTime)) return;

    const list: ColumnChartData[] = [];

    // 차트 데이터 생성
    const startMonth = startDate.getMonth();
    for (let i = 0; i < RANGE_OF_MONTH; i++) {
      const date = new Date(startDate);
      date.setMonth(startMonth + i);
      const key = dateFormat(date, 'YYYY-MM');

      list.push({
        label: dateFormat(date, 'YY.MM'),
        value: monthlyMemberLearningTime.increase[key] > 0 ? monthlyMemberLearningTime.increase[key] : 0,
      });
    }
    setChartData(list);
  }, [startDate, endDate, monthlyMemberLearningTime]);

  const totalLearningTime = Object.values(monthlyMemberLearningTime.normal).reduce(
    (totalLearningTime, learningTime) => totalLearningTime + learningTime,
    0
  );

  const totalIncreaseLearningTime = Object.values(monthlyMemberLearningTime.increase).reduce(
    (totalIncreaseLearningTime, learningTime) => totalIncreaseLearningTime + learningTime,
    0
  );

  const recentCourseList = useRecentCourseList();

  const completionCertificateCourses = recentCourseList
    .filter((course) => course.extras.tags?.includes(EXTRAS_TAGS.COMPLETION_CERTIFICATE))
    .map((course) => course.id);

  const { data: monthlyCompletionCertificateLearningTime = { normal: {}, increase: {} } } = useQuery(
    QUERY_KEYS.MONTHLY_MEMBER_LEARNING_TIME(member?.id, since, until, completionCertificateCourses),
    () => getMonthlyPlayTime(since, until, undefined, completionCertificateCourses).then((data) => data?.data?.data),
    {
      enabled: !!member && completionCertificateCourses.length > 0,
    }
  );

  const totalCompletionCertificateLearningTime = Object.values(monthlyCompletionCertificateLearningTime.normal).reduce(
    (totalLearningTime, learningTime) => totalLearningTime + learningTime,
    0
  );

  return {
    monthText,
    isFirstMonth,
    isLastMonth,
    chartData,
    moveMonth,
    memberCreatedAtSubscription,
    totalLearningTime,
    totalIncreaseLearningTime,
    totalCompletionCertificateLearningTime,
  };
};

export default MypageSummaryMonthlyChart;
