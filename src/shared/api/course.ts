import { PAGINATAION_COUNT_LIMIT_PER_PAGE } from '../policy';

import type { ApiData } from '@/types/api.interface';
import type { CourseContentDetail, OriginCourse } from '@/types/course.interface';
import type { ExamTaskMeta } from '@/types/exam.interface';

import { CrudClientInstance } from '@/shared/api/index';

export const getCourse = async (courseId: number) => {
  const response = await CrudClientInstance.get<OriginCourse>(`/course/${courseId}`);

  return response.data;
};

interface ContentCompletedData {
  courseContentId: number;
  isProgressCompleted: boolean;
}

export const getCompletedContentList = async (productId: number, courseId: number) => {
  const response = await CrudClientInstance.get<ApiData<ContentCompletedData[]>>(
    '/classroom/progress/is-completed-by-course-content',
    {
      productId,
      courseId,
    }
  );

  return response.data.data;
};

export const getCourseContents = async (contentIdList: number[]) => {
  const response = await CrudClientInstance.get<CourseContentDetail[]>(`/course-content/ids`, {
    ids: contentIdList.join(','),
  });

  return response.data;
};

export const getCourseExamTaskList = async (
  productId: number,
  courseId: number,
  offset = 0,
  limit = PAGINATAION_COUNT_LIMIT_PER_PAGE
) => {
  return CrudClientInstance.get<{ data: ExamTaskMeta[]; meta: { total: { count: number } } }>(`/exam/assignment`, {
    productId,
    courseId,
    offset,
    limit,
  });
};

interface CheckCourseQnaResponse {
  isExist: boolean;
  tags?: string[];
}

export const checkCourseQna = async (courseId: number) => {
  const response = await CrudClientInstance.get<ApiData<CheckCourseQnaResponse>>(`/qna/summary/${courseId}`);

  return response.data.data;
};
