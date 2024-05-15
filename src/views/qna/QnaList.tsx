import styled from '@emotion/styled';
import React from 'react';

import { QnaListForm, QnaQuestionList } from '@/components';

const QnaListBlock = styled.div``;

const QnaList = () => {
  return (
    <QnaListBlock>
      <QnaListForm />
      <QnaQuestionList />
    </QnaListBlock>
  );
};

export default QnaList;
