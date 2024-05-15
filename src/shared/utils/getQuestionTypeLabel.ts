import type { ExamQuestion } from '@/types/exam.interface';

export const getQuestionTypeLabel = (question: ExamQuestion) => {
  switch (question.type) {
    case 'INPUT':
      return '주관식(단답형)';
    case 'TEXT':
      return '주관식(서술형)';
    case 'MULTIPLE':
      return `객관식(${question.extras.answerCount > 1 ? '다지선다형' : '단답형'})`;
  }
};
