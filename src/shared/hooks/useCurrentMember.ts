import { getCurrentMember } from '../api/member';
import { QUERY_KEYS } from '../policy';
import { isHttpClientError } from '../utils/api';

import type { Member } from '@/types/member.interface';

import { useToken, useBpoQuery } from '@/shared/hooks';

export const useCurrentMember = ({ onSuccess }: { onSuccess?: (member: Member) => void } = {}) => {
  const { logout, logoutWithoutRevokeTokens } = useToken();

  // ?: 우선 react hook으로 가져오도록 했지만 redux에서도 현재 저장중이다. 바꾸는 것이 좋을까??
  const { data: member, ...rest } = useBpoQuery(
    QUERY_KEYS.CURRENT_MEMBER(),
    () => getCurrentMember({}).then(({ data }) => data),
    {
      onSuccess,
      async onError(error) {
        if (!isHttpClientError(error)) return;

        const statusCode = error?.response?.data?.statusCode;

        switch (statusCode) {
          case 401:
            logoutWithoutRevokeTokens();
            break;
          case 404:
            await logout();
            break;
          default:
            break;
        }
      },
    }
  );

  return { ...rest, member };
};
