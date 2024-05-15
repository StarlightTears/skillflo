import styled from '@emotion/styled';
import React from 'react';

import type { Comment } from '@/types/qna.interface';

import { QnaQuestionViewCommentProfile } from '@/components';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface QnaQuestionViewCommentContentProps {
  comment: Comment;
  isSubComment?: true;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
}

const QnaQuestionViewCommentContentBlock = styled.div`
  .content {
    ${legacyTypographyMixin('body2')}
    color: var(--legacy-color-gray-600);
  }
`;

// const writeAuthor = (authorName: string) => authorName.slice(0, 1).padEnd(authorName.length, '*');

const QnaQuestionViewCommentContent = ({
  comment,
  isSubComment,
  onClickEdit,
  onClickDelete,
}: QnaQuestionViewCommentContentProps) => {
  return (
    <QnaQuestionViewCommentContentBlock className={isSubComment ? 'sub' : 'main'}>
      <QnaQuestionViewCommentProfile
        comment={comment}
        isSubComment={isSubComment}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
      />
      <div className="content" dangerouslySetInnerHTML={{ __html: comment.comment.extras.content }} />
    </QnaQuestionViewCommentContentBlock>
  );
};

export default QnaQuestionViewCommentContent;
