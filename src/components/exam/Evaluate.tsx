import styled from '@emotion/styled';
import React from 'react';

import type { BadgeTheme } from '@/types/design-system.type';
import type { ExamQuestion } from '@/types/exam.interface';

import { Badge } from '@/components';
import { getQuestionTypeLabel } from '@/shared/utils/getQuestionTypeLabel';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface ExamResultEvaluateProps {
  sequence: number;
  question: ExamQuestion;
}

const ExamResultEvaluateBlock = styled.div`
  flex: 0 0 17.4rem;
  margin-right: 2.8rem;

  color: var(--legacy-color-gray-600);

  div {
    display: flex;
    align-items: center;
  }

  .sequence {
    ${legacyTypographyMixin('body1')}
    margin-bottom: 2rem;
    font-weight: 700;

    .badge {
      margin-left: 0.8rem;
    }
  }

  .answer-row {
    margin-bottom: 0.4rem;
    ${legacyTypographyMixin('body2')}

    &-label {
      width: 6.4rem;
    }

    &-description {
      margin-left: 0.8rem;
      font-weight: 700;
    }
  }

  &.correct {
    color: var(--color-green-600);
  }

  &.incorrect {
    color: var(--color-red-600);
  }
`;

const badgeThemeByEvaluateState = {
  CORRECT: 'lightgreen',
  INCORRECT: 'lightred',
};

const ExamResultEvaluate = ({ sequence, question }: ExamResultEvaluateProps) => {
  const evaluateState = question.extras.evaluateState;
  const isUnEvaluated = !['CORRECT', 'INCORRECT'].includes(evaluateState);

  return (
    <ExamResultEvaluateBlock className={evaluateState.toLocaleLowerCase()}>
      <div className="sequence">
        Q{sequence}.&nbsp;
        {!isUnEvaluated && (
          <Badge className="badge" theme={badgeThemeByEvaluateState[evaluateState as 'CORRECT'] as BadgeTheme}>
            {evaluateState === 'CORRECT' && '정답'}
            {evaluateState === 'INCORRECT' && '오답'}
          </Badge>
        )}
      </div>
      <div className="answer-row">
        <span className="answer-row-label">평가여부</span>:
        <span className="answer-row-description">
          {!isUnEvaluated ? '평가완료' : evaluateState === 'UNEVALUATED' ? '평가중' : '-'}
        </span>
      </div>
      <div className="answer-row">
        <span className="answer-row-label">점수</span>:
        <span className="answer-row-description">
          {isUnEvaluated ? '-' : question.extras.earnedScore}점 / {question.extras.maxScore}점
        </span>
      </div>
      <div className="answer-row">
        <span className="answer-row-label">문제 유형</span>:
        <span className="answer-row-description">{getQuestionTypeLabel(question)}</span>
      </div>
    </ExamResultEvaluateBlock>
  );
};

export default ExamResultEvaluate;
