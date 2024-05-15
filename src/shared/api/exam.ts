import type { ApiData } from '@/types/api.interface';
import type {
  ExamProgressResponse,
  QuestionExampleAnswer,
  QuestionResult,
  ExamBridgeInfo,
} from '@/types/exam.interface';

import { CrudClientInstance } from '@/shared/api/index';

export const getExamProgress = async (productId: number, courseId: number, examId: number) => {
  const response = await CrudClientInstance.get<ApiData<ExamProgressResponse>>(`/exam/${examId}/classroom`, {
    productId,
    courseId,
  });

  return response.data.data;
};

export const getExamResult = async (productId: number, courseId: number, examId: number) => {
  const response = await CrudClientInstance.get<ApiData<ExamProgressResponse>>(`/exam/${examId}/question`, {
    productId,
    courseId,
  });

  return response.data.data;
};

export const solveExamQuestion = async ({
  productId,
  courseId,
  examId,
  questionId,
  type,
  submitAnswer,
  exampleAnswers,
}: {
  productId: number;
  courseId: number;
  examId: number;
  questionId: number;
  type: string;
  submitAnswer: string;
  exampleAnswers?: QuestionExampleAnswer[];
}) => {
  const response = await CrudClientInstance.post<ApiData<QuestionResult>>(
    `/exam/${examId}/question/${questionId}/solve`,
    {
      productId,
      courseId,
    },
    {
      type,
      submitAnswer,
      exampleAnswers,
    }
  );

  return response.data;
};

export const completeExam = async (productId: number, courseId: number, examId: number) => {
  await CrudClientInstance.put(`/exam/${examId}/solve/complete`, { productId, courseId });
};

export const getExamBridge = (productId: number, courseId: number, examId: number) => {
  return CrudClientInstance.get<ApiData<ExamBridgeInfo>>(`/exam/${examId}/classroom/info`, { productId, courseId });
};
