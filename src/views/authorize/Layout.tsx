import React, { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { getExternalApiUrl } from '@/shared/api';
import { getSsoToken } from '@/shared/api/auth';
import { useAppDispatch, useToken } from '@/shared/hooks';
import slices from '@/shared/store/slices';
import { getLogger } from '@/shared/utils/logger';
const logger = getLogger('components', 'ExternalSSO');

const ExternalAuthorizeLayout = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const replaceText = search.match(/%26|\\u0026/g);

  if (replaceText) {
    location.replace(search.replaceAll(replaceText[0], '&'));
  }
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId') || undefined;
  const courseId = searchParams.get('courseId') || undefined;
  const associationCode = searchParams.get('associationCode') || undefined;
  const code = searchParams.get('code') || undefined;

  const { logout } = useToken();
  const dispatch = useAppDispatch();
  const { setAccessToken, setMemberToken } = slices.actions.auth;

  useEffect(() => {
    if (associationCode && productId && courseId) {
      window.location.href = `${getExternalApiUrl()}/sso/chanel?associationCode=${associationCode}&productId=${productId}&courseId=${courseId}`;
    }
  }, [associationCode, productId, courseId]);

  useEffect(() => {
    if (!code) {
      return;
    }
    checkToken();
  }, [code]);

  const checkToken = async () => {
    try {
      const {
        data: { authToken, memberToken, productId, courseId },
      } = await getSsoToken({ code });

      dispatch(setAccessToken(authToken));
      dispatch(setMemberToken(memberToken));

      if (productId && courseId) {
        navigate(`/classroom/${productId}/${courseId}`, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (error) {
      const err = error as Error;
      logger.error('샤넬 ssoToken 조회 실패', { code }, err);
      logout();
    }
  };

  return <div />;
};

export default ExternalAuthorizeLayout;
