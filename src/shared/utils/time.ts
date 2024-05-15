export const secondsToTime = (seconds: number) => {
  const hh = Math.floor(seconds / 3600);
  const mm = Math.floor((seconds % 3600) / 60);
  const ss = seconds % 60;
  return [hh, mm > 9 ? mm : hh ? '0' + mm : mm || '0', ss > 9 ? ss : '0' + ss].filter((a) => a).join(':');
};

/**
 *
 * @param playSecond 텍스트로 표시할 시간 값. (단위: 초)
 * @returns playSecond의 텍스트
 */
export const writePlayTime = (playSecond: number) => {
  const playTimeHour = Math.round(playSecond / 3600);

  if (playTimeHour > 0) return `${playTimeHour}시간`;
  return `${Math.round(playSecond / 60)}분`;
};
