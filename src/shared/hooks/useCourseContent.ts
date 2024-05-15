import { useQuery } from '@tanstack/react-query';

import { getCourseContent, getCourseContentByCourseId } from '../api/course-content';
import { QUERY_KEYS } from '../policy';

export const useCourseContent = (courseContentId: number) => {
  const { data, ...rest } = useQuery(
    QUERY_KEYS.COURSE_CONTENT(courseContentId),
    () => getCourseContent(courseContentId),
    { enabled: !!courseContentId }
  );

  return { data: data && data, ...rest };
};

export const useCourseContentList = (courseId: number) => {
  const queryData = useQuery(
    QUERY_KEYS.COURSE_CONTENT_LIST(courseId),
    () => getCourseContentByCourseId(courseId).then(({ data }) => data),
    {
      enabled: !!courseId,
    }
  );

  const contentIdList = queryData.data?.map((courseContent) => courseContent.id) || [];

  const findCourseContentById = (courseContentId: number) => {
    return queryData.data?.find((item) => item.id === courseContentId);
  };

  return {
    contentIdList,
    findCourseContentById,
    ...queryData,
  };
};
