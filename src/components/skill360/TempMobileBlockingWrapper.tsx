import React, { PropsWithChildren, useEffect } from 'react';

import { isMobile } from '@day1co/browser-util';

import { useToken } from '@/shared/hooks';

const TempMobileBlockingWrapper = ({ children }: PropsWithChildren) => {
  const { logout } = useToken();

  useEffect(() => {
    if (isMobile) {
      alert('스킬매치 직무진단 서비스는 현재 PC환경에서만 가능합니다.\nPC환경에서 로그인 부탁드립니다.');
      logout();
    }
  }, []);

  if (isMobile) return <></>;

  return <>{children}</>;
};

export default TempMobileBlockingWrapper;
