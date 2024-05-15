import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import React, { FC, useMemo } from 'react';

import { DateUtil } from '@day1co/pebbles';
import { Calendar } from '@fastcampus/fastcomponents';

import {
  PaginationController,
  MypageSummaryCard,
  MypageTimeDataRow,
  MypageDataRow,
  MypageSummaryDataText,
} from '@/components';
import { getDailyPlayTime } from '@/shared/api/statistic';
import { useCurrentMember } from '@/shared/hooks';
import { useMonthPagination } from '@/shared/hooks/mypage';
import { MIN_SECOND_OF_LEARNING_DAY, QUERY_KEYS } from '@/shared/policy';
import { dateFormat } from '@/shared/utils/date';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const MypageSummaryLearningCalendarContentBlock = styled.div`
  .panel {
    margin: 0 0 1.2rem;
  }

  .fc-calendar {
    height: 21.2rem;
  }

  .week-calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.1rem;
  }

  .date-calendar {
    ${legacyTypographyMixin('body2')}
    line-height: 3.2rem;
    text-align: center;

    &.focused {
      position: relative;

      font-weight: 700;
      color: var(--color-blue-600);

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 1.6rem;

        background-color: var(--color-blue-600);
        opacity: 0.15;
        transform: translate(-50%, -50%);
      }
    }
  }

  .day-calendar {
    padding: 0 0 0.4rem;
    ${legacyTypographyMixin('caption')}
  }

  .description {
    margin: 0.4rem 0 0;

    ${legacyTypographyMixin('caption')}
    color: var(--legacy-color-gray-300);
  }
`;

const learningCalendarInfoList = [
  {
    title: '학습일수',
    content: '하루 10분 이상 학습한 경우, 해당 일자가 동그라미로 표시되며 1일로 집계됩니다.',
  },
  {
    title: '총 수강시간',
    content: '이번 달에 영상을 재생하여 총 수강한 시간을 합산한 시간입니다.',
  },
  {
    title: '총 누적 수강 시간',
    content: '이번 달에 영상을 반복하여 재생한 시간까지 포함하는 수강 시간을 합산한 시간입니다.',
  },
];

const MypageSummaryLearningCalendar: FC = () => {
  const {
    totalIncreaseLearningTime,
    totalLearningTime,
    focusedDates,
    learningDayCount,
    monthText,
    isFirstMonth,
    isLastMonth,
    calendarLocation,
    moveMonth,
  } = useLearningCalendar();

  return (
    <MypageSummaryCard
      title="일자별 학습현황"
      head={
        <>
          <MypageDataRow title="학습일수" value={<MypageSummaryDataText value={learningDayCount} suffix="일" />} />
          <MypageTimeDataRow title="총 수강시간" value={totalLearningTime} />
          <MypageTimeDataRow title="총 누적 수강 시간" value={totalIncreaseLearningTime} />
        </>
      }
      infoIconContentList={learningCalendarInfoList}
    >
      <MypageSummaryLearningCalendarContentBlock>
        <PaginationController
          onClickPrevious={() => moveMonth(-1)}
          onClickNext={() => moveMonth(1)}
          disabledPrevious={isFirstMonth}
          disabledNext={isLastMonth}
          className="panel"
        >
          {monthText}
        </PaginationController>
        <Calendar calendarLocation={calendarLocation} dayColumns focusedDates={focusedDates} />
        <div className="description">10분 이상 학습시에만 기록됩니다.</div>
      </MypageSummaryLearningCalendarContentBlock>
    </MypageSummaryCard>
  );
};

const useLearningCalendar = () => {
  const { member } = useCurrentMember();
  const { date, isFirstMonth, isLastMonth, monthText, moveMonth } = useMonthPagination({
    firstMonth: member?.created_at,
  });

  const calendarLocation = useMemo(
    () => ({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    }),
    [date]
  );

  const since = useMemo(() => dateFormat(DateUtil.startOf(date, 'month'), 'YYYY-MM-DD'), [date]);
  const until = useMemo(
    () => dateFormat(DateUtil.startOf(DateUtil.calcDatetime(date, { month: +1 }), 'month'), 'YYYY-MM-DD'),
    [date]
  );

  const { data: dailyPlayTime = [] } = useQuery(QUERY_KEYS.MONTHLY_MEMBER_LEARNING_DATE(since, until), () =>
    getDailyPlayTime(since, until).then((data) => data.data.data)
  );

  const { totalIncreaseLearningTime, totalLearningTime } = useMemo(() => {
    return dailyPlayTime.reduce(
      (result, { day, increase, normal }) => {
        if (new Date(day).getMonth() !== new Date(date).getMonth()) return result;

        result.totalIncreaseLearningTime += increase;
        result.totalLearningTime += normal;
        return result;
      },
      { totalIncreaseLearningTime: 0, totalLearningTime: 0 }
    );
  }, [dailyPlayTime]);

  const focusedDates = useMemo(() => {
    return dailyPlayTime
      .filter(
        (item) =>
          new Date(item.day).getMonth() === new Date(date).getMonth() && item.increase >= MIN_SECOND_OF_LEARNING_DAY
      )
      .map((item) => new Date(item.day).getDate());
  }, [dailyPlayTime]);

  const learningDayCount = useMemo(() => focusedDates?.length || 0, [focusedDates]);

  return {
    totalIncreaseLearningTime,
    totalLearningTime,
    focusedDates,
    learningDayCount,
    monthText,
    isFirstMonth,
    isLastMonth,
    moveMonth,
    calendarLocation,
  };
};

export default MypageSummaryLearningCalendar;
