import { useCourseLearningProgressTime } from '../classroom';
import { useExamTaskList } from '../useExamTaskList';

import type { PointCategory } from '@/types/common.interface';
import type { OriginCourse, RequiredCourse } from '@/types/course.interface';
import type { Product } from '@/types/product.interface';

import { WHOLE_CONTENT_LIST_LIMIT } from '@/shared/policy';
import { getConvertedScore, getExamTaskScore, getLearningScore } from '@/shared/utils/evaluation-score';

export const useMemberEvaluationScore = (course: OriginCourse, product: Product) => {
  const { data: learningProgressData } = useCourseLearningProgressTime({ productId: product.id, courseId: course.id });

  const { data: examTaskData } = useExamTaskList({
    productId: product.id,
    courseId: course.id,
    limit: WHOLE_CONTENT_LIST_LIMIT,
  });

  const getMemberScore = (isRequireCourse?: boolean) => {
    const evaluationPoint = isRequireCourse
      ? (course.requiredCourse as RequiredCourse).extras.points
      : product.extras.points;

    const learningScore = getLearningScore(learningProgressData?.time || 0, course.extras.totalPlayTime || 0);

    const exam = getExamTaskScore(examTaskData?.data || [], 'SELECTION');

    const task = getExamTaskScore(examTaskData?.data || [], 'TASK');

    const {
      progress: convertedLearningScore,
      exam: convertedExamScore,
      task: convertedTaskScore,
      total: convertedTotalScore,
    } = getConvertedScore(learningScore, exam.memberScore, task.memberScore, evaluationPoint as PointCategory);

    return {
      convertedPoint: {
        learning: convertedLearningScore,
        exam: convertedExamScore,
        task: convertedTaskScore,
        total: convertedTotalScore,
      },
      point: {
        learning: learningScore,
        exam: exam.memberScore,
        task: task.memberScore,
        total: convertedTotalScore,
      },
      exam: {
        count: exam.filteredList.length,
        completionCount: exam.completionLength,
      },
      task: {
        count: task.filteredList.length,
        completionCount: task.completionLength,
      },
    };
  };

  return { getMemberScore };
};
