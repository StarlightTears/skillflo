import type { CategoryTemplate } from '@/types/common.interface';
import type { OriginCourse } from '@/types/course.interface';

import { CrudClientInstance } from '@/shared/api/index';

export const proposalEnrollment = (data: unknown) => {
  return CrudClientInstance.post('/enrollment', {}, data);
};

export const getRegistrableCourses = () => {
  return CrudClientInstance.get<{ data: { category: CategoryTemplate; courses: OriginCourse[] }[] }>(
    '/curation/all-course'
  );
};

export const verificationEnrollment = (data: { productId: number; courseId: number }) => {
  return CrudClientInstance.put('/curation/verification', {}, data);
};

export const putTotalScore = (data: { productId: number; courseId: number }) => {
  return CrudClientInstance.put('/curation/total-score', {}, data);
};
