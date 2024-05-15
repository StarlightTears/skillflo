import styled from '@emotion/styled';
import React from 'react';

import type { ExamQuestion } from '@/types/exam.interface';

import { Correct } from '@/components';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface ExamCorrectAnswerProps {
  question: ExamQuestion;
}

const ExamCorrectAnswerBlock = styled.div`
  .title {
    margin-top: 2.4rem;
    margin-bottom: 0.8rem;
    ${legacyTypographyMixin('caption')}
    font-weight: 700;
  }

  .answer-border {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 0.8rem;
    padding: 1.4rem 1.6rem;
    border: 0.1rem solid var(--legacy-color-gray-100);
    border-radius: 0.6rem;

    div {
      display: flex;
      align-items: center;
      ${legacyTypographyMixin('body2')}

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.4rem;
        height: 2.4rem;
        margin-right: 1.2rem;
        border-radius: 50%;
        background-color: var(--legacy-color-gray-50);
        ${legacyTypographyMixin('caption')}
        font-weight: 700;
      }
    }
  }
`;

const ExamCorrectAnswer = ({ question }: ExamCorrectAnswerProps) => {
  const correctAnswerList = question.extras.answer?.split(',') ?? [];

  return (
    <ExamCorrectAnswerBlock>
      <div className="title">정답</div>
      {question.type === 'INPUT' && (
        <div className="input-answer">
          <div className="answer-border">{question.extras.answer}</div>
          {question.extras.similarAnswers?.length > 0 && (
            <>
              <div className="title">유사정답</div>
              {question.extras.similarAnswers.map((answerValue, index) => (
                <div className="answer-border" key={index}>
                  {answerValue}
                </div>
              ))}
            </>
          )}
        </div>
      )}
      {question.type === 'MULTIPLE' && (
        <div className="multiple-answer">
          {question.extras.exampleAnswers.map((example, index) => (
            <div key={example.id} className="answer-border">
              <div>
                <span>{index + 1}</span> {example.answer}
              </div>
              {correctAnswerList.includes(String(example.id)) && <Correct />}
            </div>
          ))}
        </div>
      )}
    </ExamCorrectAnswerBlock>
  );
};

export default ExamCorrectAnswer;
