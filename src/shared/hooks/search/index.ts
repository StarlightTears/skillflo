import { useQuery } from '@tanstack/react-query';

import { getSearchResult } from '@/shared/api/search';
import { useCurrentMemberGroup, useRoleListByIds } from '@/shared/hooks';
import { QUERY_KEYS } from '@/shared/policy';

export const useRecommendedKeywordList = () => {
  const { data: memberGroup } = useCurrentMemberGroup();

  const { data: roleList } = useRoleListByIds(memberGroup?.extras?.recSearchIds ?? []);

  return roleList?.map((role) => role.name) ?? [];
};

export const useSearch = (keyword: string) => {
  return useQuery(QUERY_KEYS.SEARCH(keyword), () => getSearchResult(keyword), {
    suspense: true,
    useErrorBoundary: false,
  });
};
