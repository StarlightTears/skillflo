// * api 적용 전에 react query 코드 반영을 위해 만든 코드
export const createMockPromise = <T>(mockData: T, ms = 500) => {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, ms);
  });
};

export const createMockResponse = <T>(mockData: T, ms = 500) => {
  return createMockPromise(mockData, ms).then((result) => ({ data: result }));
};
