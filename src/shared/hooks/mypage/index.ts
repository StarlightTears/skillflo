import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { DateUtil } from '@day1co/pebbles';

import type { UpdateUserInfoBody } from '@/types/mypage.interface';
import type { PhoneCertificationBody } from '@/types/mypage.interface';

import {
  getCourseProgressList,
  getRecentCourseList,
  getLearningRecordList,
  getNotice,
  getNoticeList,
  getMemberInfo,
  updateUserInfo,
  sendPhoneCertification,
  verifyPhoneCode,
  getMypageNoticeList,
} from '@/shared/api/mypage';
import { getDailyPlayTime } from '@/shared/api/statistic';
import { QUERY_KEYS } from '@/shared/policy';
import { dateFormat } from '@/shared/utils/date';

// TODO: 추후에 수정 예정.
export const useLearningRecord = () => {
  const {
    data = [],
    isLoading,
    isFetching,
  } = useQuery(QUERY_KEYS.MYPAGE_SUMMARY_LEARNING_RECORD(), () =>
    getLearningRecordList().then(({ data }) => data.data.learningRecordList)
  );

  return { data: isLoading || isFetching ? [] : data };
};

interface UseDailyPlayTimePayload {
  since: string;
  until: string;
  enabled: boolean;
}

export const useDailyPlayTime = ({ since, until, enabled }: UseDailyPlayTimePayload) => {
  return useQuery(
    QUERY_KEYS.MONTHLY_MEMBER_LEARNING_DATE(since, until),
    () => getDailyPlayTime(since, until).then((data) => data.data.data),
    {
      enabled: enabled,
    }
  );
};

export const useMonthPagination = ({ firstMonth }: { firstMonth?: number | string | Date } = {}) => {
  // * 데이터가 아직 존재하지 않는 경우 0을 넣어서 1970년대를 가리키도록
  const createAt = firstMonth || 0;
  const [targetDate, setTargetDate] = useState(DateUtil.startOf(new Date(), 'month'));

  const { monthText, isFirstMonth, isLastMonth } = useMemo(
    () => ({
      monthText: dateFormat(targetDate, 'YYYY년 M월'),
      isFirstMonth: targetDate.getTime() === DateUtil.startOf(new Date(createAt), 'month').getTime(),
      isLastMonth: targetDate.getTime() === DateUtil.startOf(new Date(), 'month').getTime(),
    }),
    [createAt, targetDate]
  );

  const moveMonth = (unitToMoveMonth: number) => {
    const dateToChange = new Date(targetDate);
    dateToChange.setMonth(dateToChange.getMonth() + unitToMoveMonth);
    setTargetDate(dateToChange);
  };

  return {
    date: targetDate,
    monthText,
    isFirstMonth,
    isLastMonth,
    moveMonth,
  };
};

export const useRecentCourseList = () => {
  const { data } = useQuery(QUERY_KEYS.MYPAGE_RECENT_COURSE_PROGRESS_LIST(), () =>
    getRecentCourseList().then((data) => {
      return data.data.data.recentCourses;
    })
  );

  return data ? data : [];
};

export const useCourseProgressList = (isSummaryPageList = false) => {
  const {
    data = { ongoingCourses: [], endedCourses: [] },
    isLoading,
    isFetching,
  } = useQuery(QUERY_KEYS.MYPAGE_SUMMARY_COURSE_PROGRESS_LIST(isSummaryPageList), () =>
    getCourseProgressList().then((data) => data.data.data)
  );

  return { data: isLoading || isFetching ? { ongoingCourses: [], endedCourses: [] } : data };
};

export const useNoticeList = (isSummaryPageList = false) => {
  const {
    data = [],
    isLoading,
    isFetching,
  } = useQuery([QUERY_KEYS.NOTICE_LIST(isSummaryPageList)], () =>
    getNoticeList()
      .then(({ data }) => data.data)
      .then(({ noticeList }) => {
        return isSummaryPageList ? noticeList.slice(0, 3) : noticeList;
      })
  );

  return { data: isLoading || isFetching ? [] : data };
};

export const useMypageNoticeList = ({ offset, limit }: { offset: number; limit: number }) => {
  const { data } = useQuery(QUERY_KEYS.MYPAGE_NOTICE_LIST(offset), () => getMypageNoticeList({ offset, limit }));

  return { noticeList: data?.data.data || [], total: data?.data.meta.total || 0 };
};

export const useNotice = (noticeId: number) => {
  return useQuery(QUERY_KEYS.NOTICE_VIEW(noticeId), () => getNotice(noticeId).then(({ data }) => data.data));
};

export const useUserInfo = () => {
  const { data, isLoading, isFetching } = useQuery(QUERY_KEYS.MYPAGE_MEMBER_INFO(), () =>
    getMemberInfo().then(({ data }) => data.data)
  );

  return { data: isLoading || isFetching ? null : data };
};

export const useUserInfoForm = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation((data: UpdateUserInfoBody) => {
    return updateUserInfo({}, data);
  });

  return {
    updateUserInfo: async (data: UpdateUserInfoBody) => {
      await mutateAsync(data);
      queryClient.invalidateQueries(QUERY_KEYS.MYPAGE_MEMBER_INFO());
    },
  };
};

export const usePhoneCertification = () => {
  const { mutateAsync: send } = useMutation((data: PhoneCertificationBody) => {
    return sendPhoneCertification({}, data);
  });
  const { mutateAsync: verify } = useMutation((data: PhoneCertificationBody) => {
    return verifyPhoneCode({}, data);
  });

  return {
    send,
    verify,
  };
};
