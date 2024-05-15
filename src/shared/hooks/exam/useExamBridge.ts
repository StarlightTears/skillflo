import { useQuery } from '@tanstack/react-query';

import { useClassroomParams } from '../classroom';

import { getExamBridge } from '@/shared/api/exam';
import { QUERY_KEYS } from '@/shared/policy';

export const useExamBridge = () => {
  const { productId, courseId, examId } = useClassroomParams();

  return useQuery(QUERY_KEYS.EXAM_INFO(productId, examId), () =>
    getExamBridge(productId, courseId, examId).then((data) => data.data.data)
  );
};
