import { useQueries } from '@tanstack/react-query';

import { getHomeData, getCoworkerCount } from '@/shared/api/skill360/home';
import { QUERY_KEYS } from '@/shared/policy';

export const useAssessmentHomeQueries = ({ enabled = true }: { enabled?: boolean } = {}) => {
  return useQueries({
    queries: [
      {
        queryKey: QUERY_KEYS.SKILL360_HOME(),
        queryFn: () => getHomeData().then((res) => res.data.data),
        enabled: enabled,
      },
      {
        queryKey: QUERY_KEYS.COWORKER_COUNT(),
        queryFn: () => getCoworkerCount().then((res) => res.data.data),
        enabled: enabled,
      },
    ],
  });
};
