import { useState, useEffect } from 'react';

import { BREAK_POINTS_MAP, HomeBreakPoints } from '@/shared/policy';

type BreakPointType = 'classroom' | 'home' | 'default' | 'renewal';

function getViewportByWindowInnerWidth(innerWidth: number, breakPointType: BreakPointType = 'default') {
  const BreakPoint = BREAK_POINTS_MAP[breakPointType];
  const defaultViewPortMap =
    breakPointType === 'home'
      ? { isXLargeViewport: false, isLargeViewport: false, isMediumViewport: false, isSmallViewport: false }
      : {
          isLargeViewport: false,
          isMediumViewport: false,
          isSmallViewport: false,
        };

  if (BreakPoint === HomeBreakPoints) {
    switch (true) {
      case innerWidth >= BreakPoint.XLARGE_MIN: {
        return {
          ...defaultViewPortMap,
          isXLargeViewport: true,
        };
      }
      case innerWidth >= BreakPoint.LARGE_MIN && innerWidth <= BreakPoint.LARGE_MAX: {
        return {
          ...defaultViewPortMap,
          isLargeViewport: true,
        };
      }
      case innerWidth >= BreakPoint.MEDIUM_MIN && innerWidth <= BreakPoint.MEDIUM_MAX: {
        return {
          ...defaultViewPortMap,
          isMediumViewport: true,
        };
      }
      case innerWidth >= BreakPoint.SMALL_MIN && innerWidth <= BreakPoint.SMALL_MAX: {
        return {
          ...defaultViewPortMap,
          isSmallViewport: true,
        };
      }
      default:
        return {
          ...defaultViewPortMap,
        };
    }
  } else {
    switch (true) {
      case innerWidth >= BreakPoint.LARGE_MIN: {
        return {
          ...defaultViewPortMap,
          isLargeViewport: true,
        };
      }
      case innerWidth >= BreakPoint.MEDIUM_MIN && innerWidth <= BreakPoint.MEDIUM_MAX: {
        return {
          ...defaultViewPortMap,
          isMediumViewport: true,
        };
      }
      case innerWidth >= BreakPoint.SMALL_MIN && innerWidth <= BreakPoint.SMALL_MAX: {
        return {
          ...defaultViewPortMap,
          isSmallViewport: true,
        };
      }
      default:
        return {
          ...defaultViewPortMap,
        };
    }
  }
}

export const useViewport = (breakPointType: BreakPointType = 'default') => {
  const [viewport, setViewport] = useState(getViewportByWindowInnerWidth(window.innerWidth, breakPointType));

  const setViewportByWindowResizing = () => {
    setViewport(getViewportByWindowInnerWidth(window.innerWidth, breakPointType));
  };

  useEffect(() => {
    window.addEventListener('resize', setViewportByWindowResizing);

    return function removeViewportEvent() {
      window.removeEventListener('resize', setViewportByWindowResizing);
    };
  }, []);

  return viewport;
};
