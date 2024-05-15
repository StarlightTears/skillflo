import { CrudClientInstance } from '@/shared/api/index';
import { Assessment } from '@/types/skill360.interface';

export const getAssessments = async () => {
  return CrudClientInstance.getSkill360<Assessment[]>(`/assessment`);
};

export const getAssessmentById = (assessmentId: number) => {
  return CrudClientInstance.getSkill360<Assessment>(`/assessment/${assessmentId}`);
};
