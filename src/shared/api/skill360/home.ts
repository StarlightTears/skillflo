import { CrudClientInstance } from '@/shared/api/index';
import { ApiData } from '@/types/api.interface';
import { CoworkerCount, HomeData, MemberAssessment, SkillType } from '@/types/skill360.interface';

export const getHomeData = async () => {
  return await CrudClientInstance.getSkill360<ApiData<HomeData>>('/match/home');
};

export const getCoworkerCount = async () => {
  return await CrudClientInstance.getSkill360<ApiData<CoworkerCount>>('/match/coworker-count');
};

export const getMemberAssessments = (limit: number, memberId: number, assessmentId: number) => {
  return CrudClientInstance.getSkill360<MemberAssessment[]>(
    `/member-assessment?limit=${limit}&memberId=${memberId}&assessmentId=${assessmentId}`
  );
};

export const getSkillTypes = () => {
  return CrudClientInstance.get<SkillType[]>(`/role/search?type=SKILL_TYPE`);
};
