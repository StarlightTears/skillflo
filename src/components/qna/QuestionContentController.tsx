import styled from '@emotion/styled';
import classNames from 'classnames';
import React from 'react';

import { useQnaQuestionCommentList } from './hooks';

import { ArrowDown, LikeOff, LikeOn, Button } from '@/components';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';

interface QnaQuestionContentControllerProps {
  likeCount: number;
  isPressedLikeButton: boolean;
  isComment?: boolean;
  isContentAuthor?: boolean;
  commentEditorIsOpened?: boolean;
  onClickLike: () => void;
  onClickEdit: () => void;
  onClickDelete: () => void;
  onClickAddComment?: () => void;
}

const QnaQuestionContentControllerBlock = styled.div`
  display: flex;
  justify-content: space-between;
  height: 4rem;

  ${legacyTypographyMixin('body2')}
  font-weight: 700;
  color: var(--color-blue-600);

  .column {
    display: flex;
    gap: 0.8rem;
  }

  .button {
    display: flex;
    align-items: center;

    cursor: pointer;
  }

  .meta-controller {
    .like {
      padding: 0 1.6rem 0 0.4rem;
    }

    .comment {
      padding: 0 0.4rem 0 1.6rem;

      &.opened {
        .icon {
          transform: rotate(180deg);
        }
      }
    }
  }

  .main-controller {
    .button {
      justify-content: center;
      width: 5.7rem;
    }
  }

  &.comment {
    ${media('small', 'medium')} {
      .main-controller {
        display: none;
      }
    }
  }
`;

const QnaQuestionContentController = ({
  likeCount,
  isPressedLikeButton,
  isComment,
  isContentAuthor, // ?: 차라리 member id를 받고 여기서 검사하도록 할까??
  commentEditorIsOpened,
  onClickLike,
  onClickDelete,
  onClickEdit,
  onClickAddComment,
}: QnaQuestionContentControllerProps) => {
  const { data: commentData } = useQnaQuestionCommentList();
  const commentList = commentData?.qnaComments || [];
  const LikeComponent = isPressedLikeButton ? LikeOn : LikeOff;
  const isDisabled = !isComment && commentList.length > 0;

  return (
    <QnaQuestionContentControllerBlock className={isComment ? 'comment' : 'content'}>
      <div className="meta-controller column">
        <span className="like button" onClick={() => onClickLike()}>
          <LikeComponent className="like-icon" />
          좋아요 {likeCount ?? ''}
        </span>
        {/* //TODO: 댓글은 1차 이후에 추가 예정 기입 */}
        {isComment && false && (
          <span
            className={classNames('comment button', {
              opened: commentEditorIsOpened,
            })}
            onClick={() => onClickAddComment?.()}
          >
            댓글 달기
            <ArrowDown className="icon" />
          </span>
        )}
      </div>
      {isContentAuthor && (
        <div className="main-controller column">
          <Button onClick={() => onClickEdit()} disabled={isDisabled} theme="white">
            수정
          </Button>
          <Button onClick={() => onClickDelete()} disabled={isDisabled} theme="white">
            삭제
          </Button>
        </div>
      )}
    </QnaQuestionContentControllerBlock>
  );
};

export default QnaQuestionContentController;
