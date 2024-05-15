import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAccountInfo } from '../api/account';
import { QUERY_KEYS } from '../policy';

import { useCurrentMemberGroup } from './useCurrentMemberGroupList';
import { useToken } from './useToken';

export const useAccount = () => {
  const { accessToken, memberToken } = useToken();

  return useQuery(QUERY_KEYS.ACCOUNT(accessToken, memberToken), () => getAccountInfo({}).then((data) => data.data), {
    enabled: Boolean(accessToken && memberToken),
  });
};

export const useAccountEffect = () => {
  const { accessToken, memberToken } = useToken();
  const navigate = useNavigate();

  const { data: account } = useAccount();
  const { isSkill360MemberGroup, isLoading: isCurrentMemberGroupLoading } = useCurrentMemberGroup();

  useEffect(() => {
    if (!accessToken || !memberToken || !account || isCurrentMemberGroupLoading) return;

    if (!account.extras.personalInfoAgreedAt) {
      navigate('/personal-info');
      return;
    }
    if (isSkill360MemberGroup) return;
    if (!account.extras.isInterestsNextTime && !account.extras.mainJobId) {
      navigate('/interests');
      return;
    }
  }, [accessToken, memberToken, account, isSkill360MemberGroup, isCurrentMemberGroupLoading]);

  return { account };
};

export const useInvalidateAccountQuery = () => {
  const { accessToken, memberToken } = useToken();
  const queryClient = useQueryClient();

  return {
    invalidateAccountQuery: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ACCOUNT(accessToken, memberToken) }),
  };
};
