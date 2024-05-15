export const getElapsedTime = (date: string) => {
  const targetDate = new Date(date);
  const currentDate = new Date();

  const diffSec = (+currentDate - +targetDate) / 1000;

  if (diffSec < 60) {
    return '방금 전';
  } else if (diffSec > 60 && diffSec < 3600) {
    return `${Math.round(diffSec / 60)}분 전`;
  } else if (diffSec > 3600 && diffSec < 86400) {
    return `${Math.round(diffSec / 3600)}시간 전`;
  } else if (diffSec > 86400) {
    return `${Math.round(diffSec / 86400)}일 전`;
  } else {
    return;
  }
};
