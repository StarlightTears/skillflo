import { useQueries, useQuery } from '@tanstack/react-query';

import { getCuration } from '@/shared/api/home';
import { getWholeHomeContents } from '@/shared/api/homeContent';
import { QUERY_KEYS } from '@/shared/policy';

const getHomeCurationQuery = (suspense = false) => ({
  queryKey: QUERY_KEYS.HOME_CURATION(),
  queryFn: () => getCuration({}).then(({ data: { data } }) => data),
  suspense,
  useErrorBoundary: false,
});

export const useHomeCuration = () => {
  return useQuery(getHomeCurationQuery());
};

export const useHomeQueries = () => {
  return useQueries({
    queries: [
      getHomeCurationQuery(true),
      {
        queryKey: QUERY_KEYS.WHOLE_HOME_CONTENTS(),
        queryFn: () => getWholeHomeContents(),
        suspense: true,
        useErrorBoundary: false,
      },
    ],
  });
};
