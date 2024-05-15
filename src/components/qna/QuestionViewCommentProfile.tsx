import styled from '@emotion/styled';
import React from 'react';

import { StringUtil } from '@day1co/pebbles';

import type { Comment } from '@/types/qna.interface';

import { VerticalLine } from '@/components';
import { useCurrentMember } from '@/shared/hooks';
import { getBeforeDateString } from '@/shared/utils/date';
import { legacyTypographyMixin, media } from '@/styles/legacy-mixins';

interface QnaQuestionViewCommentProfileProps {
  comment: Comment;
  isSubComment?: true;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
}

const QnaQuestionViewCommentProfileBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 2rem;

  ${legacyTypographyMixin('caption')}
  color: var(--legacy-color-gray-500);

  .writing-data {
    display: flex;
    align-items: center;
  }

  .author {
    ${legacyTypographyMixin('body2')}
    font-weight: 700;
    color: var(--legacy-color-gray-900);
  }

  .content-links {
    display: flex;
    gap: 1.2rem;
  }

  .content-link {
    text-decoration: underline;
    cursor: pointer;
  }

  &.main {
    margin: 0 0 2rem;

    ${media('large')} {
      .content-links {
        display: none;
      }
    }
  }

  &.sub {
    margin: 0 0 1rem;
    padding: 1.6rem 1.8rem;
    border-top: 0.1rem solid var(--legacy-color-gray-50);

    .author {
      color: var(--legacy-color-gray-600);
    }
  }
`;

// const writeAuthor = (authorName: string) => authorName.slice(0, 1).padEnd(authorName.length, '*');

const QnaQuestionViewCommentProfile = ({
  comment,
  isSubComment,
  onClickEdit,
  onClickDelete,
}: QnaQuestionViewCommentProfileProps) => {
  const { member } = useCurrentMember();
  const isCommentAuthor = comment.member.id === member?.id;

  return (
    <QnaQuestionViewCommentProfileBlock className={isSubComment ? 'sub' : 'main'}>
      <div className="writing-data">
        <span className="author">{StringUtil.maskPrivacy(comment.member.extras.name, 'name')}</span>
        <VerticalLine />
        <span className="date">{getBeforeDateString(comment.comment.extras.createdAt)}</span>
      </div>
      {isCommentAuthor && (
        <div className="content-links">
          <span className="content-link" onClick={onClickEdit}>
            수정
          </span>
          <span className="content-link" onClick={onClickDelete}>
            삭제
          </span>
        </div>
      )}
    </QnaQuestionViewCommentProfileBlock>
  );
};

export default QnaQuestionViewCommentProfile;
