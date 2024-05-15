import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAppDispatch, useToken } from '@/shared/hooks';
import slices from '@/shared/store/slices';
import { getLogger } from '@/shared/utils/logger';
import { SsoFetcher } from '@/shared/utils/ssoFetcher';
const logger = getLogger('components', 'ExternalSSO');

const ExternalSSOLayout = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code') || undefined;

  const { logout, setMemberTokenByDefaultMember } = useToken();
  const dispatch = useAppDispatch();
  const { setAccessToken, setMemberToken } = slices.actions.auth;

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const ssoFetcher = SsoFetcher.getSsoInstanceByURL(location.href);
      await ssoFetcher.authorize(searchParams);
      const { accessToken, memberToken } = ssoFetcher.getTokens();

      dispatch(setAccessToken(accessToken));

      if (memberToken) {
        dispatch(setMemberToken(memberToken));
      } else {
        await setMemberTokenByDefaultMember(true);
      }

      navigate(ssoFetcher.getRedirectURL(), { replace: true });
    } catch (error) {
      const err = error as Error;
      logger.error('ssoToken 조회 실패', { code }, err);
      logout();
    }
  };

  return <div />;
};

export default ExternalSSOLayout;
