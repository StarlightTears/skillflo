import { CrudClientInstance } from '@/shared/api/index';
import { ApiData } from '@/types/api.interface';
import { SkillExamResult } from '@/types/skill360.interface';

export const getSkillExamResult = (skillId: number) => {
  return CrudClientInstance.getSkill360<ApiData<SkillExamResult>>(`/match/exam/result?skillId=${skillId}`);
};
