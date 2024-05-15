import styled from '@emotion/styled';
import React from 'react';

import { ArrowRight, ArrowLeft, AttachedList, Button, ExamQuestionAnswer, ImageList } from '@/components';
import { useChangeExamIndex, useExamState } from '@/shared/hooks/classroom';
import { getQuestionTypeLabel } from '@/shared/utils/getQuestionTypeLabel';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const ExamQuestionHeader = styled.header`
  margin-bottom: 3.2rem;
  ${legacyTypographyMixin('body2')}

  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.2rem;
    color: var(--legacy-color-gray-300);

    .question-index {
      flex: 1;
      font-weight: 700;
      color: var(--color-blue-600);
    }

    .question-info {
      ${legacyTypographyMixin('caption')}
      .vertical-line {
        margin: 0 0.4rem;
      }
    }
  }

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .question {
    margin-bottom: 0.4rem;
    font-weight: 700;
  }

  .additional-question {
    color: var(--legacy-color-gray-700);
  }
`;

const ExamQuestionContent = styled.div``;

const ExamQuestionFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  margin-top: 8rem;

  .button {
    display: flex;
    align-items: center;
    width: 9.6rem;
    margin-left: 1.6rem;
    padding: 0.8rem 0;
    ${legacyTypographyMixin('body2')}

    &.right {
      padding-left: 1.6rem;
    }

    &.left {
      padding-left: 0.4rem;
    }
  }
`;

const ExamQuestion = () => {
  const { expireTime, questionList, currentIndex, currentQuestion, isExpiredTimeExist } = useExamState();
  const changeExamIndex = useChangeExamIndex();

  const imageList = currentQuestion.extras.attachedImages?.map((image) => image.url) || [];
  const fileList = currentQuestion.extras.attachedFiles?.map((file) => file.url) || [];
  const linkList = currentQuestion.extras.url !== '' ? [currentQuestion.extras.url] : [];

  if (!currentQuestion) return null;

  return (
    <section>
      <ExamQuestionHeader>
        <div className="info">
          <div className="question-index">Q{currentIndex + 1}.</div>
          <div className="question-info">
            <b>{getQuestionTypeLabel(currentQuestion)}</b>
            <span className="vertical-line">|</span>
            <span>
              배점 : <b>{currentQuestion.extras.maxScore}점</b>
            </span>
          </div>
        </div>
        <pre className="question">{currentQuestion.extras.question}</pre>
        <pre className="additional-question">{currentQuestion.extras.additionalQuestion}</pre>
      </ExamQuestionHeader>
      <ExamQuestionContent>
        <ImageList imageList={imageList} />
        <AttachedList fileList={fileList} linkList={linkList} />
        <ExamQuestionAnswer />
      </ExamQuestionContent>
      <ExamQuestionFooter>
        <Button
          theme="outline"
          size="medium"
          className="button left"
          disabled={currentIndex === 0}
          onClick={() => {
            if (isExpiredTimeExist && expireTime - Date.now() <= 0) {
              return alert('시간이 초과되었습니다. 제출하신 문제까지 점수에 반영됩니다.');
            }
            changeExamIndex(currentIndex - 1);
          }}
        >
          <ArrowLeft />
          이전 문제
        </Button>
        <Button
          theme="outline"
          size="medium"
          className="button right"
          disabled={currentIndex === questionList.length - 1}
          onClick={() => {
            if (isExpiredTimeExist && expireTime - Date.now() <= 0) {
              return alert('시간이 초과되었습니다. 제출하신 문제까지 점수에 반영됩니다.');
            }
            changeExamIndex(currentIndex + 1);
          }}
        >
          다음 문제
          <ArrowRight />
        </Button>
      </ExamQuestionFooter>
    </section>
  );
};

export default ExamQuestion;
