import { useQuery } from '@tanstack/react-query';

import { getAccountInfo } from '../api/account';

const queryKey = ['CURRENT_ACCOUNT'];

export const useCurrentAccount = () => {
  return useQuery(queryKey, () => getAccountInfo({}).then(({ data }) => data));
};
