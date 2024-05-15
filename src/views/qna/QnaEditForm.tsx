import React from 'react';

import { QnaQuestionForm } from '@/components';
import { useQnaQuestion } from '@/components/qna/hooks';

const QnaEditForm = () => {
  const { data: question } = useQnaQuestion();

  if (!question) return null;

  return <QnaQuestionForm initialQuestion={question} />;
};

export default QnaEditForm;
