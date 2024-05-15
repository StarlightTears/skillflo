import type { PointCategory } from '@/types/common.interface';
import type { ExamTaskMeta } from '@/types/exam.interface';

export const getLearningScore = (memberPlayTime: number, totalPlayTime: number) => {
  return (memberPlayTime / totalPlayTime) * 100;
};

export const getExamTaskScore = (list: ExamTaskMeta[], category: 'SELECTION' | 'TASK') => {
  const filteredList = list?.filter((item) => item.extras.category === category) || [];
  const earnedScore = filteredList.reduce(
    (totalEarnedScore, item) => totalEarnedScore + (item.extras.earnedScore ?? 0),
    0
  );
  const totalScore = filteredList.reduce((totalScore, item) => totalScore + (item.extras.totalScore ?? 0), 0);
  const memberScore = (earnedScore / totalScore) * 100 || 0;

  const completionLength = filteredList.filter(
    (item) => item.extras.progressStatus && ['COMPLETE', 'EXPIRED'].includes(item.extras.progressStatus)
  ).length;

  return {
    filteredList,
    earnedScore,
    totalScore,
    memberScore,
    completionLength,
  };
};

export const getConvertedScore = (
  memberLearningScore: number,
  memberExamScore: number,
  memberTaskScore: number,
  evaluationPoint: PointCategory
) => {
  const progress = memberLearningScore * (evaluationPoint.progress / evaluationPoint.total);
  const exam = memberExamScore * (evaluationPoint.exam / evaluationPoint.total);
  const task = memberTaskScore * (evaluationPoint.task / evaluationPoint.total);
  const total = progress + exam + task;

  return {
    progress,
    exam,
    task,
    total,
  };
};

export const getExamTaskCompletionLength = (list: ExamTaskMeta[]) => {
  const examList = list?.filter((item) => item.extras.category === 'SELECTION');
  const taskList = list?.filter((item) => item.extras.category === 'TASK');
  return {
    exam: {
      totalLength: examList.length,
      completionLength: examList.filter(
        (item) => item.extras.progressStatus && ['COMPLETE', 'EXPIRED'].includes(item.extras.progressStatus)
      ).length,
    },
    task: {
      totalLength: taskList.length,
      completionLength: taskList.filter(
        (item) => item.extras.progressStatus && ['COMPLETE', 'EXPIRED'].includes(item.extras.progressStatus)
      ).length,
    },
  };
};
