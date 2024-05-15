import styled from '@emotion/styled';
import classNames from 'classnames';
import React from 'react';

import { NumberUtil } from '@day1co/pebbles';

import type { ExamQuestion } from '@/types/exam.interface';

import { Correct, ExamCorrectAnswer, Incorrect, ImageList, AttachedList } from '@/components';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface ExamResultQuestionProps {
  question: ExamQuestion;
}

const ExamResultQuestionBlock = styled.div`
  flex: 1 1 auto;
  ${legacyTypographyMixin('body2')}

  .question {
    margin-bottom: 0.4rem;
    font-weight: 700;
  }

  .additional {
    margin-bottom: 3.2rem;
    color: var(--legacy-color-gray-600);
  }

  .explanation {
    margin-top: 3.2rem;
    margin-bottom: 2.4rem;

    .title {
      margin-bottom: 0.8rem;
      font-weight: 700;
    }

    .description {
      color: var(--legacy-color-gray-700);
      white-space: pre-wrap;
      word-break: break-all;
    }
  }

  .submitted-answer {
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.8rem;
      font-weight: 700;

      span {
        display: flex;
        align-items: center;

        svg {
          margin-right: 0.4rem;
        }

        &.correct {
          color: var(--color-green-600);
        }

        &.incorrect {
          color: var(--color-red-600);
        }
      }
    }

    .answer-value {
      ${legacyTypographyMixin('body2')}
      padding: 1.4rem 1.6rem;
      border: 0.1rem solid var(--legacy-color-gray-100);
      border-radius: 0.6rem;

      &.correct {
        border: 0.1rem solid var(--color-green-600);
        background-color: var(--color-green-50);
      }

      &.incorrect {
        border: 0.1rem solid var(--color-red-600);
        background-color: var(--color-red-50);
      }
    }
  }

  .comment {
    margin-top: 2.4rem;

    .title {
      margin-bottom: 0.8rem;
      ${legacyTypographyMixin('caption')}
      font-weight: 700;
    }

    .description {
      color: var(--legacy-color-gray-700);
    }
  }
`;

const ExamResultQuestion = ({ question }: ExamResultQuestionProps) => {
  const imageList = question.extras.attachedImages?.map((image) => image.url) || [];
  const fileList = question.extras.attachedFiles?.map((file) => file.url) || [];
  const explanationImageList = question.extras.attachedExplanationFiles?.map((image) => image.url) || [];
  const linkList = question.extras.url !== '' ? [question.extras.url] : [];
  const evaluateState = question.extras.evaluateState;
  const submitAnswerString =
    question.type !== 'MULTIPLE'
      ? question.extras.submittedAnswer
      : question.extras.submittedAnswer
          .split(',')
          .map((answerIdString) => {
            if (!NumberUtil.isNumeric(answerIdString)) return '';
            const answerId = parseInt(answerIdString);
            return question.extras.exampleAnswers.findIndex((answer) => answer.id === answerId) + 1 + '번';
          })
          .join(', ');

  return (
    <ExamResultQuestionBlock>
      <div className="question">{question.extras.question}</div>
      <div className="additional">{question.extras.additionalQuestion}</div>
      <ImageList imageList={imageList} />
      <AttachedList fileList={fileList} linkList={linkList} />
      {question.extras.explanation && (
        <div className="explanation">
          <div className="title">문제 해설</div>
          <pre className="description">{question.extras.explanation}</pre>
          <ImageList imageList={explanationImageList} hideTitleBadge />
        </div>
      )}
      <div className="submitted-answer">
        <div className="title">
          선택/입력 답안
          {evaluateState === 'CORRECT' && (
            <span className="correct">
              <Correct /> 정답입니다.
            </span>
          )}
          {evaluateState === 'INCORRECT' && (
            <span className="incorrect">
              <Incorrect /> 오답입니다.
            </span>
          )}
        </div>
        <div
          className={classNames([
            'answer-value',
            {
              correct: evaluateState === 'CORRECT',
              incorrect: evaluateState === 'INCORRECT',
            },
          ])}
        >
          {submitAnswerString || <>&nbsp;</>}
        </div>
      </div>
      {question.type !== 'TEXT' && <ExamCorrectAnswer question={question} />}
      {question.extras.comment && (
        <div className="comment">
          <div className="title">코멘트</div>
          <div className="description">{question.extras.comment}</div>
        </div>
      )}
    </ExamResultQuestionBlock>
  );
};

export default ExamResultQuestion;
