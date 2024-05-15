import styled from '@emotion/styled';
import React from 'react';

import { Badge } from '@/components';
import { useClassroomProduct } from '@/shared/hooks/classroom';
import { useExamResult } from '@/shared/hooks/examResult';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const ExamInfoContentBlock = styled.div`
  .row {
    margin-bottom: 2.4rem;

    .badge {
      margin-bottom: 1.2rem;
    }

    .info-row {
      display: flex;

      .column {
        &-title {
          margin-bottom: 0.2rem;
          ${legacyTypographyMixin('caption')}
          color: var(--legacy-color-gray-600);
        }

        &-content {
          display: flex;
          ${legacyTypographyMixin('body1')}

          &-main {
            margin-right: 0.8rem;
            font-weight: 700;
          }

          &-sub {
            color: var(--legacy-color-gray-300);
          }
        }
      }

      .vertical-line {
        margin: 0 2.8rem;
        border-left: 0.1rem solid var(--legacy-color-gray-100);
      }
    }
  }
`;

const ExamInfoContent = () => {
  const { data: examResult } = useExamResult();
  // TODO: 이름 수정의 필요가 있다...
  const { data: product } = useClassroomProduct();

  const examLimitMinute = Math.floor((examResult?.exam.extras.timeLimit as number) / 60);
  const questionList = examResult?.questions || [];
  const totalScore = questionList.reduce((totalScore, question) => totalScore + question.extras.maxScore, 0);

  const examPassPercentage = product?.extras.criteriaForCompletion.exam ?? 0;
  const examPassScore = Math.round(examPassPercentage !== 0 ? totalScore * (examPassPercentage / 100) : 0);

  const examScore =
    examResult?.questions.reduce((totalScore, question) => totalScore + question.extras.earnedScore, 0) || 0;
  const examScorePercentage = examScore !== 0 ? Math.round((examScore / totalScore) * 100) : 0;

  return (
    <ExamInfoContentBlock>
      <div className="row">
        <Badge className="badge" theme="gray" colorScale={400} bgColorScale={50}>
          시험 정보
        </Badge>
        <div className="info-row">
          <div className="column">
            <div className="column-title">시험시간</div>
            <div className="column-content">
              <div className="column-content-main">{examLimitMinute ? `총 ${examLimitMinute}분` : '시간제한 없음'}</div>
            </div>
          </div>
          <div className="vertical-line" />
          <div className="column">
            <div className="column-title">총 문제수</div>
            <div className="column-content">
              <div className="column-content-main">{questionList.length}문항</div>
            </div>
          </div>
          <div className="vertical-line" />
          <div className="column">
            <div className="column-title">시험 합격점수 / 총점</div>
            <div className="column-content">
              <div className="column-content-main">
                {examPassScore}점 / {totalScore}점
              </div>
              <div className="column-content-sub">(환산 : {examPassPercentage}점 / 100점)</div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <Badge className="badge" theme="gray" colorScale={400} bgColorScale={50}>
          응시 정보
        </Badge>
        <div className="info-row">
          <div className="column">
            <div className="column-title">획득점수</div>
            <div className="column-content">
              <div className="column-content-main">{examScore}점</div>
              <div className="column-content-sub">/ 환산 : {examScorePercentage}점</div>
            </div>
          </div>
          <div className="vertical-line" />
          <div className="column">
            <div className="column-title">응시횟수</div>
            <div className="column-content">
              <div className="column-content-main">1회</div>
              <div className="column-content-sub">/ 총 {examResult?.exam.extras.canSolvedCount}회 응시가능</div>
            </div>
          </div>
        </div>
      </div>
    </ExamInfoContentBlock>
  );
};

export default ExamInfoContent;
