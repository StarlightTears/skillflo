import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { Input } from '@/components';
import { useExamState } from '@/shared/hooks/classroom';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const ExamQuestionAnswerBlock = styled.div`
  margin-top: 3.2rem;

  header {
    margin-bottom: 0.8rem;
    ${legacyTypographyMixin('body2')}
    font-weight: 700;
    color: var(--color-blue-600);
  }
`;

const activeMultipleItemStyle = css`
  border-color: var(--color-lightblue-background);
  background-color: var(--classroom-exam-question-multiple-answer-item-active);

  span {
    background-color: var(--color-blue-600);
    color: var(--color-white);
  }
`;

const MultipleAnswerListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 1.4rem 1.6rem;
  border: 0.1rem solid var(--legacy-color-gray-100);
  border-radius: 0.6rem;
  ${legacyTypographyMixin('body2')}
  font-weight: 500;
  cursor: pointer;

  &:not(:last-of-type) {
    margin-bottom: 0.8rem;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    margin-right: 1.2rem;
    border-radius: 50%;
    background-color: var(--legacy-color-gray-50);
    ${legacyTypographyMixin('caption')}
    font-weight: 700;
  }

  &:hover {
    ${activeMultipleItemStyle}
  }

  &.selected {
    ${activeMultipleItemStyle}
  }
`;

const ExamQuestionAnswer = () => {
  const { currentQuestion, questionAnswers, setQuestionAnswer } = useExamState();

  const { type: questionType, extras } = currentQuestion;
  const exampleAnswerList = extras.exampleAnswers;
  const selectedAnswer = questionAnswers[currentQuestion.id] || '';
  const selectedAnswerList =
    questionType === 'MULTIPLE' && selectedAnswer !== ''
      ? selectedAnswer.split(',').map((value) => parseInt(value))
      : [];

  const selectMultipleQuestionAnswer = (answerValue: number) => {
    let newAnswerList: number[] = [];
    if (selectedAnswerList.includes(answerValue)) {
      newAnswerList = selectedAnswerList.filter((answer) => answerValue !== answer);
    } else {
      if (currentQuestion.extras.answerCount === 1) {
        newAnswerList = [answerValue];
      } else {
        newAnswerList = [...selectedAnswerList, answerValue];
      }
    }

    setQuestionAnswer(newAnswerList.join(','));
  };

  return (
    <ExamQuestionAnswerBlock>
      <header>A.</header>
      {questionType === 'INPUT' && (
        <Input
          placeholder="문제에 알맞는 답을 입력해주세요."
          defaultValue={selectedAnswer}
          onChange={(e) => {
            setQuestionAnswer(e.target.value);
          }}
        />
      )}
      {questionType === 'MULTIPLE' && (
        // TODO: 추후에 <AnswerList />로 교체할 것
        <ul>
          {exampleAnswerList.map(({ id: answerValue, answer }, index) => {
            return (
              <MultipleAnswerListItem
                key={answerValue}
                className={selectedAnswerList.includes(answerValue) ? 'selected' : ''}
                onClick={() => selectMultipleQuestionAnswer(answerValue)}
              >
                <span>{index + 1}</span>
                {answer}
              </MultipleAnswerListItem>
            );
          })}
        </ul>
      )}
    </ExamQuestionAnswerBlock>
  );
};

export default ExamQuestionAnswer;
