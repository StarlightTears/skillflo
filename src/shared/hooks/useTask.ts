import { useMutation, useQuery } from '@tanstack/react-query';

import { getTask, solveTaskQuestion as solveQuestionApi, completeTask as completeTaskApi } from '../api/task';
import { QUERY_KEYS } from '../policy';

import type { SolveQuestionPayload } from '@/types/task.interface';

export const useTaskData = (taskId: number, productId: number, courseId: number, courseContentId: number) => {
  const { data, ...rest } = useQuery(
    QUERY_KEYS.COURSE_CONTENT_TASK(taskId, productId, courseId, courseContentId),
    () => getTask(taskId, productId, courseId, courseContentId),
    {
      enabled: !!taskId,
    }
  );

  return { data: data && data, ...rest };
};

export const useSolveTaskQuestion = (taskId: number, productId: number, courseId: number, courseContentId: number) => {
  const solveTaskQuestionMutation = useMutation(
    ({ questionId, payload }: { questionId: number; payload: SolveQuestionPayload }) =>
      solveQuestionApi(taskId, questionId, productId, courseId, courseContentId, payload)
  );
  const completeTaskMutation = useMutation(() => completeTaskApi(taskId, productId, courseId, courseContentId));

  return async (questionId: number, payload: SolveQuestionPayload) => {
    await solveTaskQuestionMutation.mutateAsync({ questionId, payload });
    await completeTaskMutation.mutateAsync();
  };
};
