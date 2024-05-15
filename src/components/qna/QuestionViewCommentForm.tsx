import styled from '@emotion/styled';
import React, { useState } from 'react';

import { useQnaNavigate, useQnaQuestion, useQuestionCommentForm } from './hooks';

import { MarkdownEditor, ButtonGroup } from '@/components';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const QnaQuestionViewCommentFormBlock = styled.div`
  .form-title {
    margin-bottom: 0 0 0.4rem;

    ${legacyTypographyMixin('caption')}
    color: var(--legacy-color-gray-400);
  }

  .editor {
    margin: 0 0 2rem;
  }
`;

const QnaQuestionViewCommentForm = () => {
  const [commentToAdd, setCommentToAdd] = useState('');
  const navigate = useQnaNavigate();
  const { createComment } = useQuestionCommentForm();
  const { refetch: refetchQnaQuestion } = useQnaQuestion();

  const moveToList = () => navigate();
  const onSubmitCommentForm = async () => {
    await createComment(commentToAdd);
    setCommentToAdd('');
    refetchQnaQuestion();
  };

  return (
    <QnaQuestionViewCommentFormBlock>
      <div className="form-title">답변 쓰기</div>
      <MarkdownEditor
        value={commentToAdd}
        className="editor"
        onChange={(event) => setCommentToAdd(event.target.value)}
      />
      <ButtonGroup
        cancelButtonText="목록"
        onClickCancel={moveToList}
        onClickSubmit={onSubmitCommentForm}
        disabledSubmit={commentToAdd === ''}
      />
    </QnaQuestionViewCommentFormBlock>
  );
};

export default QnaQuestionViewCommentForm;
