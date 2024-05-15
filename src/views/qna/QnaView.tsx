import React from 'react';

import { QnaQuestionViewMain, QnaQuestionViewComment } from '@/components';

const QnaView = () => {
  return (
    <section>
      <QnaQuestionViewMain />
      <QnaQuestionViewComment />
    </section>
  );
};

export default QnaView;
