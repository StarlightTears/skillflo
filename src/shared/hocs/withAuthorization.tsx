import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useToken } from '@/shared/hooks';
import slices from '@/shared/store/slices';

export const withAuthorization = (Component: ReactElement) => {
  return () => {
    const dispatch = useAppDispatch();
    const { setAccessToken, setMemberToken } = slices.actions.auth;
    const { accessToken, memberToken } = useToken();
    const navigate = useNavigate();

    useEffect(() => {
      if (!accessToken || !memberToken) {
        dispatch(setAccessToken(''));
        dispatch(setMemberToken(''));
        navigate('/auth/signin');
      }
    }, []);

    dispatch(setAccessToken(accessToken));
    dispatch(setMemberToken(memberToken));

    return Component;
  };
};
