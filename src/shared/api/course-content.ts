import type { CourseContentDetail } from '@/types/course.interface';

import { CrudClientInstance } from '@/shared/api/index';

export const getCourseContent = async (courseContentId: number) => {
  const response = await CrudClientInstance.get<CourseContentDetail>(`/course-content/${courseContentId}`);

  return response.data;
};

export const getCourseContentByCourseId = (courseId: number) => {
  return CrudClientInstance.get<CourseContentDetail[]>(`/course/${courseId}/contents`);
};
