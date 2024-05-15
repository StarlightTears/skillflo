import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getSkillExamResult } from '@/shared/api/skill360/skill-exam';
import { QUERY_KEYS } from '@/shared/policy';

export const useSkillExamResultQuery = (skillId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.SKILL_EXAM_RESULT(skillId),
    queryFn: () => getSkillExamResult(skillId).then((res) => res.data.data),
  });
};

export const useSkillExamResultOnPage = () => {
  const params = useParams();
  const skillId = parseInt(params.skillId ?? '');

  return useSkillExamResultQuery(skillId);
};
