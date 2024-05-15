import styled from '@emotion/styled';
import React from 'react';

import { StringUtil } from '@day1co/pebbles';

import { useQnaQuestion, useQuestionViewApis } from './hooks';

import { Container, QnaQuestionContentController, VerticalLine, Badge, AttachedList } from '@/components';
import { useCurrentMember } from '@/shared/hooks';
import { getBeforeDateString } from '@/shared/utils/date';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';

const QnaQuestionViewMainBlock = styled.article`
  padding: 0 0 1rem;

  .question-header {
    padding: 1rem 0 3.2rem;
    border-bottom: 0.1rem solid var(--legacy-color-gray-100);
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin: 0 0 0.8rem;
  }

  .sub-info {
    display: flex;
    align-items: center;

    ${legacyTypographyMixin('caption')}
    color: var(--legacy-color-gray-500);
  }

  .question-title {
    ${legacyTypographyMixin('headline5')}
    font-weight: 700;
  }

  .tags {
    display: flex;
    gap: 0.8rem;
    margin: 0 0 1.4rem;
  }

  .course-content {
    display: flex;
    align-items: flex-start;
    margin: 2rem 0;
    padding: 1.2rem 1.6rem;
    border-radius: 0.4rem;

    background-color: var(--legacy-color-gray-50);

    ${legacyTypographyMixin('body2')}
    color: var(--legacy-color-gray-600);

    .content-title {
      flex: 0 0 auto;
      margin: 0 2rem 0 0;

      ${legacyTypographyMixin('caption')}
      font-weight: 700;
      line-height: inherit;
    }
  }

  .question-content {
    margin: 0 0 2rem;
    padding: 2rem 0;

    ${legacyTypographyMixin('body2')}
  }

  .file-list-wrapper {
    margin: 0 0 2rem;
  }

  ${media('large')} {
    padding: 0 0 4rem;

    .summary {
      flex-direction: row;
      justify-content: space-between;
    }

    .writing-data {
      order: 2;
    }

    .question-title {
      order: 1;
    }
  }
`;

const QnaQuestionViewMain = () => {
  const { member } = useCurrentMember();
  const { data } = useQnaQuestion();
  const question = data?.qna;
  const authorData = data?.member;
  const isQuestionAuthor = !!authorData?.id && !!member?.id && authorData?.id === member?.id;

  const { setQuestionLike, editQuestion, deleteQuestion } = useQuestionViewApis();

  if (!question) return null;

  return (
    <Container as={QnaQuestionViewMainBlock}>
      <div className="question-header">
        <div className="summary">
          <div className="sub-info writing-data">
            <span className="author">{StringUtil.maskPrivacy(authorData?.extras?.name || '', 'name')}</span>
            <VerticalLine />
            <span className="date">{getBeforeDateString(question.extras.createdAt)}</span>
          </div>
          <div className="question-title">{question.name}</div>
        </div>
        <div className="tags">
          {question.extras.keywords?.map((tag) => (
            <Badge key={tag} theme="lightblue">
              &#35;{tag}
            </Badge>
          ))}
        </div>
        <div className="sub-info">
          조회 {question.extras.viewCount}
          <VerticalLine />
          답변 {question.extras.commentCount}
          <VerticalLine />
          좋아요 {question.extras.likeCount}
        </div>
      </div>
      {question.extras.courseContentName && (
        <div className="course-content">
          <span className="content-title">선택차시</span>
          <span>{question.extras.courseContentName}</span>
        </div>
      )}
      <div className="question-content" dangerouslySetInnerHTML={{ __html: question.extras.content }} />
      <div className="file-list-wrapper">
        <AttachedList fileList={question.extras.file.map((file) => file.url)} linkList={[]} />
      </div>
      <QnaQuestionContentController
        commentEditorIsOpened
        likeCount={question.extras.likeCount}
        isPressedLikeButton={question.extras.isLiked}
        isContentAuthor={isQuestionAuthor}
        onClickLike={() => setQuestionLike(!question.extras.isLiked)}
        onClickEdit={editQuestion}
        onClickDelete={deleteQuestion}
      />
    </Container>
  );
};

export default QnaQuestionViewMain;
