import { useQuery } from '@tanstack/react-query';

import type { OriginCourse } from '@/types/course.interface';

import { getExposedCategories } from '@/shared/api/category';
import { QUERY_KEYS } from '@/shared/policy';

export const useExposedCategory = () => {
  const { data, ...queryResult } = useQuery(
    QUERY_KEYS.EXPOSED_CATEGORY(),
    () => getExposedCategories().then((data) => data),
    {
      // * staleTime을 Infinity로 설정함으로써 해당 쿼리를 사용중인 컴포넌트가 있다면 추가적으로 request를 실행하지 않도록 했습니다.
      staleTime: Infinity,
    }
  );

  return { data: data || [], ...queryResult };
};

export const useCourseCategory = (course?: OriginCourse) => {
  const { data: exposedCategories } = useExposedCategory();
  const categoryId = course?.extras.exposedCategory[0].depth1stId;

  return exposedCategories.find((category) => category.id === categoryId);
};
