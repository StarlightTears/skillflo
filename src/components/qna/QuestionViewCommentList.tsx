import styled from '@emotion/styled';
import React from 'react';

import { QnaQuestionViewCommentListItem } from '..';

import { useQnaQuestionCommentList } from './hooks';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const QnaQuestionViewCommentListBlock = styled.div`
  margin: 0 0 2rem;

  .list-title {
    margin: 0 0 2rem;

    ${legacyTypographyMixin('headline5')}
    font-weight: 700;
    color: var(--legacy-color-gray-900);

    .count {
      color: var(--color-blue-600);
    }
  }

  .comment-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

const QnaQuestionViewCommentList = () => {
  const { data } = useQnaQuestionCommentList();
  if (!data?.qnaComments?.length) return null;

  return (
    <QnaQuestionViewCommentListBlock>
      <div className="list-title">
        등록 답변 수 <span className="count">{data.qnaComments.length}</span>
      </div>
      <ul className="comment-list">
        {data.qnaComments.map((comment) => (
          <QnaQuestionViewCommentListItem key={comment.comment.id} comment={comment} />
        ))}
      </ul>
    </QnaQuestionViewCommentListBlock>
  );
};

export default QnaQuestionViewCommentList;
