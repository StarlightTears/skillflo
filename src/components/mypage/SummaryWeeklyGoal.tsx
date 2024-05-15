import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import React, { FC, useEffect, useMemo, useState } from 'react';

import { DateUtil } from '@day1co/pebbles';

import {
  PaginationController,
  Badge,
  ArrowDown,
  Dropdown,
  Button,
  MyPagePlaceholderFlag,
  MypageSummaryCard,
  MypageSummaryDataText,
} from '@/components';
import { setGoalTime as setGoalTimeApi } from '@/shared/api/member';
import { useCurrentMember } from '@/shared/hooks';
import { useDailyPlayTime } from '@/shared/hooks/mypage';
import { dateFormat } from '@/shared/utils/date';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface Goal {
  startAt: number;
  endAt: number;
  learningSeconds: number;
}

const GoalSummaryNodeBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5.6rem;

  .dropdown-wrapper {
    display: flex;
    color: var(--color-blue-600);

    .time-dropdown {
      width: fit-content;
      margin-right: 0.4rem;

      & > div {
        display: flex;
        align-items: center;
        font-weight: 700;
        cursor: pointer;
        ${legacyTypographyMixin('headline6')}
      }

      .suffix {
        ${legacyTypographyMixin('body2')}
        font-weight: 400;
      }

      & > ul {
        color: var(--color-black);
      }
    }
  }

  .fc-button {
    width: 6.6rem;
    padding: 0.8rem 1.2rem;
  }
`;

const MypageSummaryWeeklyGoalBlock = styled.div`
  .placeholder {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    align-items: center;
    padding: 7.5rem 0;
    border-radius: 0.6rem;

    background-color: rgba(38 107 255 / 5%);

    text-align: center;
  }

  .placeholder-1 {
    ${legacyTypographyMixin('body2')}
    font-weight: 700;
    color: var(--legacy-color-gray-700);
  }

  .placeholder-2 {
    ${legacyTypographyMixin('caption')}
    color: var(--legacy-color-gray-300);
  }

  .panel {
    margin: 0 0 1.6rem;
  }

  .goal-list {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  .goal {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    height: 2.4rem;
  }

  .label-wrapper {
    display: flex;
    flex: 0 0 4.8rem;
    align-items: center;
    white-space: nowrap;
  }

  .time {
    flex: 1 1 auto;

    ${legacyTypographyMixin('caption')}
    font-weight: bold;
    line-height: 2.4rem;
  }

  .date {
    flex: 1 0 auto;

    ${legacyTypographyMixin('body2')}
    line-height: 2.4rem;
    text-align: right;
  }
`;

const MypageSummaryWeeklyGoal: FC = () => {
  const {
    monthText,
    goalHour,
    setGoalHour,
    goalMinute,
    setGoalMinute,
    goalTime,
    saveGoalTime,
    isFirstPage,
    isLastPage,
    movePage,
    goalList,
  } = useSummaryWeeklyGoal();

  const goalSummaryNode = (
    <GoalSummaryNodeBlock>
      <div className="dropdown-wrapper">
        <Dropdown
          className="time-dropdown"
          dropdownContents={[
            { text: '00', onClick: () => setGoalHour('00') },
            { text: '01', onClick: () => setGoalHour('01') },
            { text: '02', onClick: () => setGoalHour('02') },
            { text: '03', onClick: () => setGoalHour('03') },
            { text: '04', onClick: () => setGoalHour('04') },
            { text: '05', onClick: () => setGoalHour('05') },
            { text: '06', onClick: () => setGoalHour('06') },
            { text: '07', onClick: () => setGoalHour('07') },
            { text: '08', onClick: () => setGoalHour('08') },
          ]}
          isContentAlignCenter={false}
          isFixHeight={true}
        >
          <MypageSummaryDataText value={goalHour} suffix="시간" />
          <ArrowDown />
        </Dropdown>
        <Dropdown
          className="time-dropdown"
          dropdownContents={[
            { text: '00', onClick: () => setGoalMinute('00') },
            { text: '30', onClick: () => setGoalMinute('30') },
          ]}
          isContentAlignCenter={false}
        >
          <MypageSummaryDataText value={goalMinute} suffix="분" />
          <ArrowDown />
        </Dropdown>
      </div>
      <Button theme="primary" onClick={() => saveGoalTime(goalHour, goalMinute)}>
        설정저장
      </Button>
    </GoalSummaryNodeBlock>
  );

  return (
    <MypageSummaryCard
      title="나의 주간목표"
      head={
        <>
          <div className="head-title">한 주의 학습 목표 시간을 설정해주세요.</div>
          {goalSummaryNode}
        </>
      }
    >
      <MypageSummaryWeeklyGoalBlock>
        {goalTime ? (
          <>
            <PaginationController
              disabledPrevious={isFirstPage}
              disabledNext={isLastPage}
              onClickPrevious={() => movePage(-1)}
              onClickNext={() => movePage(1)}
              className="panel"
            >
              {monthText}
            </PaginationController>
            <ul css={undefined} className="goal-list">
              {goalList.map((goal, index) => {
                const success = goal.learningSeconds / 60 >= goalTime;
                const timeFormat = (seconds: number) => {
                  const minutes = Math.floor(seconds / 60);

                  return `${Math.floor(minutes / 60)}시간 ${minutes % 60}분`;
                };

                return (
                  <li className="goal" key={index}>
                    <div className="label-wrapper">
                      <Badge theme={success ? 'lightgreen' : 'lightred'} size="medium">
                        {success ? '달성' : '미달성'}
                      </Badge>
                    </div>
                    <div className="time">{timeFormat(goal.learningSeconds)}</div>
                    <div className="date">
                      {dateFormat(goal.startAt, 'MM.DD')} ~ {dateFormat(goal.endAt, 'MM.DD')}
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <div className="placeholder">
            <MyPagePlaceholderFlag />
            <p className="placeholder-1">
              주간 목표를 설정하여
              <br />
              진행 상황을 확인하세요.
            </p>
            <p className="placeholder-2">목표를 설정하면 내용이 표시됩니다.</p>
          </div>
        )}
      </MypageSummaryWeeklyGoalBlock>
    </MypageSummaryCard>
  );
};

// * 다음주 일요일 0시 0분 0초를 반환
const getNextWeekSunday = (date: Date) => {
  const DAY_COUNT_PER_WEEK = 7;
  const nextSunday = DateUtil.calcDatetime(date, { day: DAY_COUNT_PER_WEEK - date.getDay() });
  return DateUtil.startOf(nextSunday, 'day');
};

const useSummaryWeeklyGoal = () => {
  const [goalHour, setGoalHour] = useState<string>('00');
  const [goalMinute, setGoalMinute] = useState<string>('00');
  const [goalTime, setGoalTime] = useState<number>(0);
  const { member } = useCurrentMember();
  const dateCreatedMember = member?.created_at ? new Date('2024-02-17T07:27:49.968Z') : new Date();
  const timeCreatedMember = dateCreatedMember.getTime();

  const WEEK_PER_PAGE = 5;

  // * 현재 시각으로부터 4주전 일요일
  const sundayBeforeFourWeekOnCurrentDate = (() => {
    const currentDate = DateUtil.startOf(new Date(), 'day');

    return DateUtil.calcDatetime(currentDate, { day: -(currentDate.getDay() + (WEEK_PER_PAGE - 1) * 7) });
  })();

  // * 현재 페이지에서 학습기록 시작 날짜
  const [startDateOnCurrentPage, setStartDateOnCurrentPage] = useState(sundayBeforeFourWeekOnCurrentDate);
  // * startDateOnCurrentPage로 부터 4주 뒤 월요일까지 저장한 목록
  // * 회원이 생성된 이후의 날짜가 포함되어 있지 않는 주의 월요일은 필터링
  const sundayList = Array.from({ length: WEEK_PER_PAGE }, (_, index) =>
    DateUtil.calcDatetime(startDateOnCurrentPage, { week: index })
  ).filter((date) => {
    if (!member?.created_at) return true; // * 아직 데이터를 불러오지 않았다면 일단 날짜를 보여주기로.

    return timeCreatedMember < getNextWeekSunday(date).getTime();
  });
  const monthText = dateFormat(startDateOnCurrentPage, 'YYYY년 M월');
  // console.log(startDateOnCurrentPage);

  // * 5주 간격으로 날짜를 이동
  const movePage = (pageCountToMove: number) => {
    setStartDateOnCurrentPage((date) => DateUtil.calcDatetime(date, { week: WEEK_PER_PAGE * pageCountToMove }));
  };

  const since = sundayList[0];
  const until = getNextWeekSunday(sundayList[sundayList.length - 1]);

  const isDateBetweenPeriod = (date: Date) => {
    const dateTime = date.getTime();

    return since.getTime() <= dateTime && dateTime <= until.getTime();
  };
  const isFirstPage = isDateBetweenPeriod(dateCreatedMember);
  const isLastPage = isDateBetweenPeriod(new Date());
  const { data: dailyPlayTimeList = [] } = useDailyPlayTime({
    since: dateFormat(since, 'YYYY-MM-DD'),
    until: dateFormat(until, 'YYYY-MM-DD'),
    enabled: !!member?.created_at,
  });

  const goalList = useMemo(() => {
    return sundayList.reduce((goalList, sundayDate) => {
      const nextSunday = getNextWeekSunday(sundayDate);
      const sunDayTime = sundayDate.getTime();
      const nextSundayTime = nextSunday.getTime();

      const sumSecond = dailyPlayTimeList
        .filter((dailyPlayTime) => {
          const playTimeDateTime = new Date(dailyPlayTime.day).getTime();
          return sunDayTime <= playTimeDateTime && playTimeDateTime < nextSundayTime;
        })
        .reduce((seconds, dailyPlayTime) => seconds + dailyPlayTime.increase, 0); // increase가 초단위

      goalList.push({
        startAt: sundayDate.getTime(),
        endAt: nextSunday.getTime() - 1,
        learningSeconds: sumSecond,
      });
      return goalList;
    }, [] as Goal[]);
  }, [startDateOnCurrentPage, dailyPlayTimeList]);

  const { mutateAsync } = useMutation((goalTime: string) => {
    return setGoalTimeApi({ goalTime });
  });

  const saveGoalTime = async (hour: string, minute: string) => {
    const goalMinute = Number(hour) * 60 + Number(minute);
    await mutateAsync(hour + minute);
    setGoalTime(goalMinute);
  };

  useEffect(() => {
    if (member?.extras.goalTime) {
      const hour = member.extras.goalTime.slice(0, 2);
      const minute = member.extras.goalTime.slice(2, 4);
      setGoalHour(member.extras.goalTime.slice(0, 2));
      setGoalMinute(member.extras.goalTime.slice(2, 4));
      setGoalTime(Number(hour) * 60 + Number(minute));
    }
  }, [member]);

  return {
    monthText,
    goalHour,
    setGoalHour,
    goalMinute,
    setGoalMinute,
    goalTime,
    saveGoalTime,
    movePage,
    isFirstPage,
    isLastPage,
    goalList,
  };
};

export default MypageSummaryWeeklyGoal;
