import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { StringUtil } from '@day1co/pebbles';

import { useQnaParam, useQnaQuestionList } from './hooks';

import { Checkbox, Badge, EmptyNoteBlue, PrevNextPagination } from '@/components';
import { useViewport } from '@/shared/hooks';
import { getBeforeDateString } from '@/shared/utils/date';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const QnaQuestionListBlock = styled.div`
  padding-bottom: 11.6rem;

  .qna-list-controller {
    display: flex;
    align-items: center;
    justify-content: space-between;

    color: var(--legacy-color-gray-900);
  }

  .form-link-wrapper {
    display: flex;
    gap: 1rem;
    align-items: center;

    ${legacyTypographyMixin('caption')}
  }

  .form-link {
    height: 3.2rem;
    padding: 0.8rem 1.4rem;
    border-radius: 0.4rem;
    background-color: var(--color-blue-600);

    font-weight: 700;
    color: var(--color-white);

    &:hover {
      background-color: var(--color-blue-600);
    }
  }

  .question-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .question-view-link {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem 0;
    border-bottom: 0.1rem solid var(--legacy-color-gray-300);

    ${legacyTypographyMixin('body2')}
    color: var(--legacy-color-gray-900);
  }

  .title {
    ${legacyTypographyMixin('headline5')}
  }

  .question-infos {
    display: flex;
    justify-content: space-between;

    ${legacyTypographyMixin('caption')}
    color: var(--legacy-color-gray-300);
  }

  .keywords {
    display: flex;
    gap: 0.5rem;
  }

  .question-info {
    display: flex;
    align-items: center;

    .vertical-line {
      width: 0.1rem;
      height: 1.2rem;
      margin: 0 0.8rem;
      border-radius: 0.05rem;
      background-color: var(--legacy-color-gray-200);
    }
  }

  .empty-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 11rem 0;
    border-bottom: 0.1rem solid var(--legacy-color-gray-100);
    ${legacyTypographyMixin('body2')}
    font-weight: 700;

    svg {
      margin-bottom: 1.4rem;
    }
  }
`;

const QnaQuestionList = () => {
  const { courseId, productId } = useQnaParam();
  const [showOnlyMyQuestions, setShowOnlyMyQuestions] = useState(false);
  const { isSmallViewport } = useViewport();

  const {
    data: questionList,
    isShowPagination,
    isFirstPage,
    isLastPage,
  } = useQnaQuestionList({
    showOnlyMyQuestions,
  });

  return (
    <QnaQuestionListBlock>
      <div className="qna-list-controller">
        <div className="checkbox-wrapper">
          <Checkbox
            checked={showOnlyMyQuestions}
            setChecked={() => setShowOnlyMyQuestions(!showOnlyMyQuestions)}
            label="내 질문만 보기"
          />
        </div>
        <div className="form-link-wrapper">
          {!isSmallViewport && '찾는 질문이 없다면? 지금 바로 질문하고 토론을 시작하세요'}
          <Link to={`/qna/${productId}/${courseId}/create`} className="form-link">
            질문하기
          </Link>
        </div>
      </div>
      {questionList.length > 0 ? (
        <>
          <ul className="question-list">
            {questionList.map(({ qna: question, member }) => (
              <li key={question.id}>
                <Link to={`/qna/${productId}/${courseId}/${question.id}`} className="question-view-link">
                  <div className="title">{question.name}</div>
                  <div className="keywords">
                    {question.extras.keywords?.map((keyword, keywordIndex) => (
                      <Badge key={keywordIndex} theme="lightblue">
                        &#35;{keyword}
                      </Badge>
                    ))}
                  </div>
                  <div className="question-infos">
                    <div className="question-info">
                      조회 {question.extras.viewCount}
                      <span className="vertical-line" />
                      답변 {question.extras.commentCount}
                      <span className="vertical-line" />
                      좋아요 {question.extras.likeCount}
                    </div>
                    <div className="question-info">
                      {StringUtil.maskPrivacy(member?.extras?.name || '', 'name')}
                      <span className="vertical-line" />
                      {getBeforeDateString(question.extras.createdAt)}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          {isShowPagination && (
            <PrevNextPagination
              firstId={questionList[0]?.qna?.id || 0}
              lastId={questionList[questionList.length - 1]?.qna?.id || 0}
              isFirstPage={isFirstPage}
              isLastPage={isLastPage}
            />
          )}
        </>
      ) : (
        <div className="empty-list">
          <EmptyNoteBlue />
          등록된 질문이 없습니다.
        </div>
      )}
    </QnaQuestionListBlock>
  );
};

export default QnaQuestionList;
