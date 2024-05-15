import { CrudClientInstance } from '@/shared/api/index';
import { ApiData } from '@/types/api.interface';
import { SkillDetail } from '@/types/skill360.interface';

export const getSkillDetail = (skillId: number) => {
  return CrudClientInstance.getSkill360<ApiData<SkillDetail>>(`/match/skill?skillId=${skillId}`);
};
