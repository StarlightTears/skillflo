import type { ApiData } from '@/types/api.interface';
import type { CourseDetail, CourseBridge } from '@/types/course.interface';

import { CrudClientInstance } from '@/shared/api/index';

export const getCourseDetail = async (courseId: number, productId: number, noticeLimit = 10) => {
  const response = await CrudClientInstance.get<ApiData<CourseDetail>>(`/curation/course-detail/${courseId}`, {
    productId,
    noticeLimit,
  });

  return response.data;
};

export const getCourseBridge = async (courseId: number, noticeLimit = 10) => {
  const response = await CrudClientInstance.get<ApiData<CourseBridge>>(`/curation/course-bridge/${courseId}`, {
    noticeLimit,
  });

  return response.data.data;
};
