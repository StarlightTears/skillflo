import { useNavigate } from 'react-router-dom';

import { getLogger } from '../utils/logger';

import type { Member } from '@/types/member.interface';

import { getMemberToken } from '@/shared/api/auth';
import { revokeAccessToken, revokeMemberToken } from '@/shared/api/auth';
import { getSsoMemberListForLogin, getMemberListForLogin } from '@/shared/api/member';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import slices from '@/shared/store/slices';

const logger = getLogger('hooks', 'useToken');

export const useToken = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const memberToken = useAppSelector((state) => state.auth.memberToken);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    members: { setMembers, setCurrentMember },
    auth: { setAccessToken, setMemberToken },
  } = slices.actions;

  const getDefaultMember = async (isSso: boolean) => {
    const { data: memberList } = isSso
      ? await getSsoMemberListForLogin({ state: 'NORMAL', limit: 100 })
      : await getMemberListForLogin({ state: 'NORMAL', limit: 100 });
    const memberListHasSignedIn = memberList.filter((member) => {
      return !!member.extras.lastSignInDate;
    });

    if (memberListHasSignedIn.length === 0) {
      return memberList[0];
    }

    return memberListHasSignedIn.sort((a, b) => {
      const dateA = new Date(a.extras.lastSignInDate as string);
      const dateB = new Date(b.extras.lastSignInDate as string);
      if (dateA > dateB) {
        return -1;
      } else if (dateA === dateB) {
        return 0;
      } else {
        return 1;
      }
    })[0];
  };

  const setMemberTokenByDefaultMember = async (isSso = false) => {
    const defaultMember = await getDefaultMember(isSso);
    await getMemberTokenBySelectedMember(defaultMember);
  };

  const getMemberTokenBySelectedMember = async (member: Member, onError?: () => void) => {
    try {
      const response = await getMemberToken({ memberId: member.id });
      const {
        data: { access_token },
      } = response;

      dispatch(setMemberToken(access_token));
    } catch (error) {
      if (onError) onError();
    }
  };

  const revokeAllTokens = async () => {
    await Promise.all([revokeMemberToken(), revokeAccessToken()]);
  };

  const logout = async (navigateQueryString = '') => {
    try {
      if (accessToken && memberToken) {
        await revokeAllTokens();
      }
    } catch (error) {
      const err = error as Error;
      logger.info('fail to revoke tokens', err);
    } finally {
      dispatch(setMembers([]));
      dispatch(setCurrentMember(null));
      dispatch(setAccessToken(''));
      dispatch(setMemberToken(''));
      navigate('/auth/signin' + navigateQueryString);
    }
  };

  const logoutWithoutRevokeTokens = (navigateQueryString = '') => {
    dispatch(setMembers([]));
    dispatch(setCurrentMember(null));
    dispatch(setAccessToken(''));
    dispatch(setMemberToken(''));
    navigate('/auth/signin' + navigateQueryString);
  };

  return {
    accessToken,
    memberToken,
    revokeAccessToken,
    revokeMemberToken,
    revokeAllTokens,
    logout,
    logoutWithoutRevokeTokens,
    getMemberTokenBySelectedMember,
    setMemberTokenByDefaultMember,
  };
};
