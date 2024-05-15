import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { MemberGroupChannelIO } from '@/components';
import { setAccessTokenInRequestHeaders, setMemberTokenInRequestHeaders } from '@/shared/api';
import { useAppDispatch, useCurrentMember, useToken } from '@/shared/hooks';
import slices from '@/shared/store/slices';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { accessToken, memberToken } = useToken();
  const { setAccessToken, setMemberToken } = slices.actions.auth;
  const navigate = useNavigate();
  const { isSuccess } = useCurrentMember();

  if (accessToken && memberToken) {
    setAccessTokenInRequestHeaders(accessToken);
    setMemberTokenInRequestHeaders(memberToken);
  }

  useEffect(() => {
    if (!accessToken || !memberToken) {
      dispatch(setAccessToken(''));
      dispatch(setMemberToken(''));
      navigate('/auth/signin');
      return;
    }
  }, [accessToken, memberToken]);

  if (!isSuccess) return null;

  return (
    <>
      <MemberGroupChannelIO />
      {children}
    </>
  );
};

export default RequireAuth;
