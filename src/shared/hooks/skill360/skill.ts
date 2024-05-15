import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getSkillDetail } from '@/shared/api/skill360/skill-detail';
import { QUERY_KEYS } from '@/shared/policy';

const fetchSkillDetail = async (skillId: number) => {
  const { data } = await getSkillDetail(skillId);
  return data.data;
};

export const useSkillQuery = (skillId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.SKILL(skillId),
    queryFn: () => fetchSkillDetail(skillId),
  });
};

export const useSkillQueryOnPage = () => {
  const params = useParams();
  const skillId = parseInt(params.skillId ?? '');

  return useSkillQuery(skillId);
};
