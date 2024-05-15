import styled from '@emotion/styled';
import React, { useState } from 'react';

import { useQnaQuestion, useQuestionCommentApis } from './hooks';
import QnaQuestionContentController from './QuestionContentController';

import type { Comment } from '@/types/qna.interface';

import {
  QnaQuestionViewCommentContent,
  QnaQuestionViewCommentProfile,
  TextArea,
  ButtonGroup,
  MarkdownEditor,
} from '@/components';
import { useCurrentMember, useToggle } from '@/shared/hooks';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface QuestionViewCommentListItemProps {
  comment: Comment;
}

const QuestionViewCommentListItemBlock = styled.li`
  padding: 2rem;
  border: 0.1rem solid var(--legacy-color-gray-100);
  border-radius: 0.4rem;
  background-color: var(--color-white);

  .comment-edit-form {
    margin: 0 0 2rem;
  }

  .form {
    margin: 1rem 0 0;
    padding: 2rem 0 0;
    border-top: 0.1rem solid var(--legacy-color-gray-100);
  }

  .textarea {
    height: 10rem;
    padding: 1.4rem 1.6rem;

    ${legacyTypographyMixin('body2')}

    resize: none;
  }

  .form-value-length {
    margin: 0.8rem 0;
    padding: 0 0.4rem;

    ${legacyTypographyMixin('caption')}
    color: var(--legacy-color-gray-200);
  }

  .button-wrapper {
    .button {
      &.cancel {
        outline: none;
      }
    }
  }

  .sub-comment {
    margin: 2rem 0 0;
  }
`;

const SUB_COMMENT_MAX_LENGTH = 500;

const QuestionViewCommentListItem = ({ comment }: QuestionViewCommentListItemProps) => {
  const [isOpeningCommentForm, toggleCommentForm] = useToggle();
  const [isOpeningEditForm, toggleEditForm] = useToggle();
  const [subCommentToAdd, setSubCommentToAdd] = useState('');
  const { deleteComment, setCommentLike, editComment } = useQuestionCommentApis(comment.comment.id);

  const { member } = useCurrentMember();
  const isCommentAuthor = comment.member.id === member?.id;

  const [commentToEdit, setCommentToEdit] = useState(comment.comment.extras.content);

  const { refetch: refetchQnaQuestion } = useQnaQuestion();

  const onClickLike = async () => {
    await setCommentLike(!comment.comment.extras.isLiked);
  };

  const onClickEdit = () => {
    setCommentToEdit(comment.comment.extras.content);
    toggleEditForm();
  };

  const onSubmitEdit = async () => {
    await editComment(commentToEdit);
    toggleEditForm();
  };

  const onClickDelete = async () => {
    const shouldDeleteComment = confirm('작성하신 답변을 삭제하시겠습니까? 삭제후에는 복원할 수 없습니다.');

    if (!shouldDeleteComment) return;
    await deleteComment();
    refetchQnaQuestion();
  };

  return (
    <QuestionViewCommentListItemBlock>
      {!isOpeningEditForm ? (
        <>
          <QnaQuestionViewCommentContent comment={comment} onClickEdit={onClickEdit} onClickDelete={onClickDelete} />
          <QnaQuestionContentController
            isComment
            isContentAuthor={isCommentAuthor}
            likeCount={comment.comment.extras.likeCount}
            isPressedLikeButton={comment.comment.extras.isLiked}
            commentEditorIsOpened={isOpeningCommentForm}
            onClickAddComment={toggleCommentForm}
            onClickLike={onClickLike}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
          />
        </>
      ) : (
        <>
          <QnaQuestionViewCommentProfile comment={comment} />
          <MarkdownEditor
            value={commentToEdit}
            onChange={(event) => setCommentToEdit(event.target.value)}
            className="comment-edit-form"
          />
          <ButtonGroup
            cancelButtonText="취소"
            submitButtonText="저장"
            onClickCancel={toggleEditForm}
            onClickSubmit={onSubmitEdit}
          />
        </>
      )}

      {isOpeningCommentForm && (
        <div className="form">
          <TextArea
            value={subCommentToAdd}
            onChange={(event) => setSubCommentToAdd(event.target.value)}
            maxLength={SUB_COMMENT_MAX_LENGTH}
            placeholder="댓글을 입력해주세요."
            className="textarea"
          />
          <div className="form-value-length">
            {subCommentToAdd.length} / {SUB_COMMENT_MAX_LENGTH}
          </div>
          <ButtonGroup submitButtonText="등록" buttonSize="xmedium" className="button-wrapper" />
        </div>
      )}
      {/* //TODO: 댓글은 1차 이후에 추가 예정 기입 */}
      {/* <ul className="sub-comment">
        {comment.comments?.map((subComment) => (
          <li key={subComment.id}>
            <QnaQuestionViewCommentContent comment={subComment} isSubComment />
          </li>
        ))}
      </ul> */}
    </QuestionViewCommentListItemBlock>
  );
};

export default QuestionViewCommentListItem;
