import styled from '@emotion/styled';
import classNames from 'classnames';
import React, { useState } from 'react';

import { DateUtil } from '@day1co/pebbles';

import { Button } from '@/components';
import { useInterval } from '@/shared/hooks';
import { useChangeExamIndex, useCompleteExam, useExamState, useSolveQuestion } from '@/shared/hooks/classroom';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const ExamStatusBlock = styled.div`
  align-self: flex-start;
  width: 15.2rem;
  padding: 2rem 1.6rem;
  border-radius: 0.6rem;
  background-color: var(--color-white);

  .title {
    margin-bottom: 1.2rem;
    ${legacyTypographyMixin('body2')}
    font-weight: 700;
    color: var(--color-blue-600);
  }

  .sub-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.8rem;
    ${legacyTypographyMixin('caption')}

    .label {
      color: var(--legacy-color-gray-500);
    }

    .description {
      font-weight: 700;

      span {
        color: var(--legacy-color-gray-500);
      }
    }
  }

  footer {
    padding-top: 2.4rem;
  }
`;

const ExamStatusSolvedQuestion = styled.div`
  padding-top: 1.2rem;
  font-weight: 700;
  color: var(--legacy-color-gray-300);

  .mark-info {
    display: flex;
    align-items: center;
    margin-bottom: 1.2rem;
    ${legacyTypographyMixin('label')}

    .mark {
      width: 0.8rem;
      height: 0.8rem;
      margin-right: 0.4rem;
      border-radius: 0.2rem;
      background-color: var(--legacy-color-gray-50);

      &.submitted {
        background-color: var(--color-blue-600);
      }
    }

    .mark-label {
      margin-right: 0.8rem;
    }
  }

  .solved-question-list {
    display: grid;
    grid-template-rows: repeat(auto-fill, 2.4rem);
    grid-template-columns: repeat(3, 3.2rem);
    gap: 1.2rem;
    overflow-y: auto;
    height: 19rem;

    &::-webkit-scrollbar {
      display: none;
    }

    .question {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3.2rem;
      height: 2.4rem;
      border-radius: 0.4rem;
      background-color: var(--legacy-color-gray-50);
      cursor: pointer;

      &.submitted {
        border: none;
        background-color: var(--color-blue-600);
        color: var(--color-white);
      }

      &.selected {
        border: 0.1rem solid var(--color-blue-600);
        background-color: var(--color-blue-50);
        color: var(--color-blue-600);
      }
    }
  }
`;

const ExamStatus = () => {
  const solveQuestion = useSolveQuestion();
  const changeExamIndex = useChangeExamIndex();
  const {
    expireTime,
    questionList,
    currentIndex,
    questionAnswers,
    questionScores,
    currentQuestion,
    isExpiredTimeExist,
  } = useExamState();
  const completeExam = useCompleteExam();
  const allQuestionsIsSolved =
    questionList.length !== 0 &&
    Object.values(questionAnswers).filter((answer) => !!answer).length === questionList.length;
  const [timeLimit, setTimeLimit] = useState(isExpiredTimeExist ? Math.floor((expireTime - Date.now()) / 1000) : 0);

  useInterval(
    () => {
      if (isExpiredTimeExist) {
        const timeLimit = Math.floor((expireTime - Date.now()) / 1000);
        setTimeLimit(timeLimit);
      }
    },
    [expireTime],
    1000
  );

  const requestCompleteExam = async () => {
    if (!allQuestionsIsSolved) return;
    if (isExpiredTimeExist && expireTime - Date.now() <= 0)
      return alert('시간이 초과되었습니다. 제출하신 문제까지 점수에 반영됩니다.');
    const insertedQuestionIdList = Object.keys(questionAnswers);
    const solvedQuestionIdList = Object.keys(questionScores);

    // * 지금 index의 문제는 무조건 제출하도록 한다. 이미 제출을 했지만 답안을 바꾸었다면 다시 채점을 받아야 하므로...
    // TODO: 아니면 채점 당시의 답안을 저장해서 검사하도록 할까?
    const questionIdSetToSolve = new Set<number>([currentQuestion.id]);

    // * if: 답안 작성은 했지만 제출하지 않은 문제가 있는 경우 해당 문제 답변들을 제출하도록 한다.
    if (insertedQuestionIdList.length !== solvedQuestionIdList.length) {
      const unsolvedQuestionIdList = insertedQuestionIdList
        .filter((questionId) => !solvedQuestionIdList.includes(questionId))
        .map((questionId) => parseInt(questionId));

      for (const questionId of unsolvedQuestionIdList) {
        questionIdSetToSolve.add(questionId);
      }
    }

    // * 배열로 여러번 실행하도록 했지만 현재로서는(22-11-02 기준) 2번 이상 루프되는 경우는 없을 것으로 보입니다.
    await Promise.all([...questionIdSetToSolve].map(solveQuestion));

    completeExam();
  };

  return (
    <ExamStatusBlock>
      <div className="title">시험현황</div>
      <div className="sub-info">
        <div className="label">남은시간</div>
        <div className="description">{isExpiredTimeExist ? DateUtil.getTimeStringFromSeconds(timeLimit) : '-'}</div>
      </div>
      <div className="sub-info">
        <div className="label">남은문제</div>
        <div className="description">
          {questionList.length - Object.keys(questionScores).length}
          <span>/{questionList.length}</span>
        </div>
      </div>
      <ExamStatusSolvedQuestion>
        <div className="mark-info">
          <div className="mark submitted"></div>
          <span className="mark-label">완료</span>
          <div className="mark"></div>
          <span className="mark-label">미 완료</span>
        </div>
        <div className="solved-question-list">
          {questionList.map((question, questionIndex) => (
            <div
              key={question.id}
              className={classNames([
                'question',
                {
                  selected: currentIndex === questionIndex,
                  submitted: !isNaN(questionScores[question.id]),
                },
              ])}
              onClick={() => changeExamIndex(questionIndex)}
            >
              {questionIndex + 1}
            </div>
          ))}
        </div>
      </ExamStatusSolvedQuestion>
      <footer>
        <Button theme="primary" size="medium" disabled={!allQuestionsIsSolved} onClick={requestCompleteExam}>
          시험 제출하기
        </Button>
      </footer>
    </ExamStatusBlock>
  );
};

export default ExamStatus;
