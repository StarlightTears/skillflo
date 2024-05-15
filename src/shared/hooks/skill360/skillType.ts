import { useQuery } from '@tanstack/react-query';

import { getSkillTypes } from '@/shared/api/skill360/home';
import { QUERY_KEYS } from '@/shared/policy';

export const useSkillTypes = ({ staleTime }: { staleTime?: number } = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.SKILL_TYPE(),
    queryFn: () => getSkillTypes().then((res) => res.data),
    staleTime: staleTime ?? Infinity,
  });
};
