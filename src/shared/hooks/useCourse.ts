import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getCourse, getCourseContents } from '../api/course';
import { QUERY_KEYS } from '../policy';
import { getPartContentIdList } from '../utils/course';

export const useCourse = (courseId: number) => {
  return useQuery(QUERY_KEYS.COURSE(courseId), () => getCourse(courseId));
};

export const useCourseContentList = (courseId: number) => {
  const { data: course } = useCourse(courseId);
  const contentIdList = useMemo(() => {
    return course?.extras.contents.flatMap(getPartContentIdList) || [];
  }, [course]);

  return {
    contentIdList,
    ...useQuery(QUERY_KEYS.COURSE_CONTENT_LIST(courseId), () => getCourseContents(contentIdList), {
      enabled: !!contentIdList.length,
    }),
  };
};
