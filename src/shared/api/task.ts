import type { ApiData } from '@/types/api.interface';
import type { TaskExam, TaskQuestion, SolveQuestionPayload } from '@/types/task.interface';

import { CrudClientInstance } from '@/shared/api/index';

export const getTask = async (taskId: number, productId: number, courseId: number, courseContentId: number) => {
  const response = await CrudClientInstance.get<ApiData<{ exam: TaskExam; questions: TaskQuestion[] }>>(
    `/task/${taskId}/classroom`,
    { productId, courseId, courseContentId }
  );

  return response.data.data;
};

export const solveTaskQuestion = async (
  taskId: number,
  questionId: number,
  productId: number,
  courseId: number,
  courseContentId: number,
  payload: SolveQuestionPayload
) => {
  return CrudClientInstance.post(
    `/task/${taskId}/question/${questionId}/solve`,
    { productId, courseId, courseContentId },
    payload
  );
};

export const completeTask = async (taskId: number, productId: number, courseId: number, courseContentId: number) => {
  return CrudClientInstance.put(`/task/${taskId}/solve/complete`, { productId, courseId, courseContentId });
};
