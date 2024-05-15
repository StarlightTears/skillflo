import { DateUtil } from '@day1co/pebbles';

export const getBeforeDateString = (beforeDateString: string) => {
  const beforeDate = new Date(beforeDateString);
  const currentDate = new Date();

  const minuteDiff = DateUtil.diff(beforeDate, currentDate, 'minute');
  if (minuteDiff < 60) return `${minuteDiff}분전`;

  const hourDiff = DateUtil.diff(beforeDate, currentDate, 'hour');
  if (hourDiff < 24) return `${hourDiff}시간전`;

  const dateDiff = DateUtil.diff(beforeDate, currentDate, 'day');
  return `${dateDiff}일전`;
};

export const dateFormat = (dateValue: Date | string | number, format = 'YYYY.MM.DD') => {
  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);

  return DateUtil.format(date, {
    format,
    timeZone: 'Asia/Seoul',
    isUtc: false,
  });
};

export const getMinuteSecondStringFromSeconds = (totalSeconds: number) => {
  const splitTimeText = DateUtil.getTimeStringFromSeconds(totalSeconds).split(':');

  return `${Number(splitTimeText[0])}시간 ${Number(splitTimeText[1])}분`;
};
