import { useCallback, useEffect, useRef, DependencyList } from 'react';

export const useInterval = (effect: () => void, dependencies = [] as DependencyList, milliSecond = 0) => {
  const timer = useRef<number>();
  const effectCallback = useCallback(effect, dependencies);

  useEffect(() => {
    effectCallback();
    timer.current = setInterval(effectCallback, milliSecond) as unknown as number;

    return () => {
      clearInterval(timer.current);
    };
  }, [effectCallback]);
};
