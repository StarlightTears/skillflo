import styled from '@emotion/styled';
import classNames from 'classnames';
import React, { Fragment } from 'react';

import { useAssessmentProgressState, useAssessmentQuestion } from '@/shared/hooks/skill360';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

const SkillAssessmentStateBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 2rem;

  .progress {
    display: flex;
    gap: 0.8rem;
    align-items: center;

    .level {
      padding: 0.2rem 0.8rem;
      border-radius: 999.9rem;
      background-color: var(--color-semantic-informative-accent);
      color: var(--color-semantic-informative-label);
      ${renewalTypographyMixin('label', 4, true)}
    }

    .divider {
      width: 0.1rem;
      height: 2rem;
      background-color: var(--color-semantic-divider-default);
    }

    .question-indicator {
      display: flex;
      gap: 0.6rem;
      align-items: center;

      color: var(--color-semantic-informative-teritary);

      .question-sequence {
        /* 폰트 색상 */
        ${renewalTypographyMixin('title', 3)}

        &.selected {
          color: var(--color-semantic-informative-accent);
        }
      }

      .sequence-dot {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 0.2rem;
        background-color: currentcolor;
      }
    }
  }

  .current-question-type {
    color: var(--color-semantic-informative-primary);
    ${renewalTypographyMixin('caption', 1, true)};
  }
`;

const SkillAssessmentState = () => {
  const { currentQuestionId, currentQuestionLevel } = useAssessmentProgressState();
  const { currentLevelQuestions, currentQuestion } = useAssessmentQuestion();
  const currentQuestionTypeString = (() => {
    if (currentQuestion?.type === 'MULTIPLE') return currentQuestion.extras.answerCount === 1 ? '단일선택' : '복수선택';
    if (currentQuestion?.type === 'INPUT') return '단답형';
    return '';
  })();

  return (
    <SkillAssessmentStateBlock>
      <div className="progress">
        {/* TODO: 추후에 badge로 교체 */}
        <div className="level">Lv.{currentQuestionLevel}</div>
        <div className="divider" />
        <div className="question-indicator">
          {currentLevelQuestions.map((question, questionIndex) => {
            const questionSequence = questionIndex + 1;

            return (
              <Fragment key={questionSequence}>
                <span className={classNames('question-sequence', { selected: currentQuestionId === question.id })}>
                  Q{questionSequence}
                </span>
                {questionSequence < currentLevelQuestions.length && <span className="sequence-dot" />}
              </Fragment>
            );
          })}
        </div>
      </div>
      <div className="current-question-type">{currentQuestionTypeString}</div>
    </SkillAssessmentStateBlock>
  );
};

export default SkillAssessmentState;
