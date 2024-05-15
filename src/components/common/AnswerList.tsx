import styled from '@emotion/styled';
import React from 'react';

import type { QuestionExampleAnswer } from '@/types/exam.interface';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface AnswerListProps {
  answerList: QuestionExampleAnswer[];
  selectedAnswerList: number[];
  onSelectAnswer: (answerValue: number) => void;
}

const AnswerListBlock = styled.ul``;

const AnswerListItemBlock = styled.li`
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

  &.selected,
  &:hover {
    border-color: var(--color-semantic-informative-accent);
    background-color: var(--classroom-exam-question-multiple-answer-item-active);

    span {
      background-color: var(--color-blue-600);
      color: var(--color-white);
    }
  }
`;

const AnswerList = ({ answerList, selectedAnswerList, onSelectAnswer }: AnswerListProps) => {
  return (
    <AnswerListBlock>
      {answerList.map(({ id: answerValue, answer }, index) => {
        return (
          <AnswerListItemBlock
            key={answerValue}
            className={selectedAnswerList.includes(answerValue) ? 'selected' : ''}
            onClick={() => onSelectAnswer(answerValue)}
          >
            <span>{index + 1}</span>
            {answer}
          </AnswerListItemBlock>
        );
      })}
    </AnswerListBlock>
  );
};

export default AnswerList;
