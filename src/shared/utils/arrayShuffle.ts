export const arrayShuffle = <T>(array: T[]) => {
  const copiedArray = [...array];
  const result: T[] = [];

  while (copiedArray.length) {
    const targetIndex = Math.floor(Math.random() * copiedArray.length);
    result.push(copiedArray.splice(targetIndex, 1)[0]);
  }

  return result;
};
