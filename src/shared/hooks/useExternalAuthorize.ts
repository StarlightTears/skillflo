import { useQuery } from '@tanstack/react-query';

import { getSsoChanelToken } from '../api/external';
import { QUERY_KEYS } from '../policy';

export const useExternalChanel = (
  params: { productId: number; courseId: number; associationCode: string },
  enabled: boolean
) => {
  return useQuery(QUERY_KEYS.EXTERNAL_AUTHORIZE(), () => getSsoChanelToken(params).then((data) => data.data), {
    enabled,
  });
};
