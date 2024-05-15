import { useQuery } from '@tanstack/react-query';

import { getCourseExamTaskList } from '../api/course';
import { PAGINATAION_COUNT_LIMIT_PER_PAGE, QUERY_KEYS } from '../policy';

interface ExamTaskListProps {
  productId: number;
  courseId: number;
  offset?: number;
  limit?: number;
}

export const useExamTaskList = ({
  productId,
  courseId,
  offset = 0,
  limit = PAGINATAION_COUNT_LIMIT_PER_PAGE,
}: ExamTaskListProps) => {
  return useQuery(QUERY_KEYS.EXAM_TASK_LIST(productId, courseId, offset, limit), () =>
    getCourseExamTaskList(productId, courseId, offset, limit).then(({ data }) => ({ data: data.data, meta: data.meta }))
  );
};
