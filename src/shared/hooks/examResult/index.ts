import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getExamResult } from '@/shared/api/exam';
import { QUERY_KEYS } from '@/shared/policy';

export const useExamResult = () => {
  const params = useParams();
  const productId = Number(params.productId);
  const courseId = Number(params.courseId);
  const examId = Number(params.examId);

  return useQuery(QUERY_KEYS.EXAM_QUESTION_RESULT(productId, courseId, examId), () =>
    getExamResult(productId, courseId, examId)
  );
};
