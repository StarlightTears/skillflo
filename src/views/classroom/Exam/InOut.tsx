import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Badge, ExamCard } from '@/components';
import { useCurrentMember, useCurrentMemberGroup } from '@/shared/hooks';
import { useClassroomParams, useClassroomProduct, useExamState, useLoadExamProgress } from '@/shared/hooks/classroom';
import { useExamBridge } from '@/shared/hooks/exam/useExamBridge';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { typographyMixin } from '@/styles/mixins';

const ExamInOutLayoutBlock = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const UserInfo = styled.div`
  margin-bottom: 2.8rem;

  span {
    ${legacyTypographyMixin('caption')}
    color: var(--legacy-color-gray-600);
  }

  div {
    margin-top: 0.2rem;
    ${legacyTypographyMixin('body1')}
    font-weight: 700;
  }
`;

const ExamResultGuide = styled.div`
  margin: 2.4rem 0 4rem;
  padding: 1.6rem 1.6rem 3.2rem;
  border: 0.05rem solid var(--legacy-color-gray-100);
  border-radius: 0.6rem;
  background-color: var(--legacy-color-gray-50);

  .description {
    ${typographyMixin('p2')};
    color: var(--legacy-color-gray-600);
    text-align: center;
  }
`;

const ExamInOutLayout = () => {
  const navigate = useNavigate();
  const { productId, courseId, examId } = useClassroomParams();

  const loadExamProgress = useLoadExamProgress();
  const { questionScores, completedExam } = useExamState();

  const { data: examInfo } = useExamBridge();
  const totalScore = examInfo?.extras.totalScore ?? 0;
  const examTimeLimit = examInfo?.extras.timeLimit as number;

  const { data: product } = useClassroomProduct();
  const limitMinuteText = examTimeLimit ? Math.floor((examTimeLimit as number) / 60) : examTimeLimit;

  const examPassPercentage = product?.extras.criteriaForCompletion.exam ?? 0;
  const examPassScore = Math.round(examPassPercentage !== 0 ? totalScore * (examPassPercentage / 100) : 0);

  const examScore = completedExam ? Object.values(questionScores).reduce((totalScore, score) => totalScore + score) : 0;
  const examScorePercentage = examScore !== 0 ? Math.round((examScore / totalScore) * 100) : 0;

  const { member } = useCurrentMember();
  const { data: memberGroup } = useCurrentMemberGroup();
  const isResultExposed = memberGroup?.extras.isResultExposed ?? true;

  const pageInfo = !completedExam
    ? {
        badgeContent: '시험',
        title: examInfo?.name || '',
        subInfo: examInfo?.extras.description || '',
        buttonContent: '시험 응시하기',
        buttonHandler() {
          loadExamProgress();
        },
      }
    : {
        badgeContent: '시험 종료',
        title: '답안 제출이 성공적으로 완료되었습니다.',
        subInfo: (isResultExposed && examInfo?.extras.description) || '',
        buttonContent: isResultExposed ? '시험 결과보기' : '목록으로',
        buttonHandler: () => {
          navigate(
            isResultExposed
              ? `/exam-result/${productId}/${courseId}/${examId}`
              : `/course-detail/${productId}/${courseId}?tab=exam`
          );
        },
      };

  return (
    <ExamInOutLayoutBlock>
      <ExamCard
        badgeContent={pageInfo.badgeContent}
        title={pageInfo.title}
        subInfo={pageInfo.subInfo}
        buttonContent={pageInfo.buttonContent}
        buttonHandler={pageInfo.buttonHandler}
        isResultExposed={isResultExposed}
      >
        {completedExam && isResultExposed !== undefined && !isResultExposed ? (
          <ExamResultGuide>
            <Badge theme="gray" bgColorScale={100} colorScale={400}>
              시험 안내
            </Badge>
            <div className="description">
              시험이 모두 종료되었습니다.
              <br />
              결과는 2주 후 메일과 문자로 전달드릴 예정입니다.
              <br />
              감사합니다.
            </div>
          </ExamResultGuide>
        ) : (
          <>
            <Badge className="badge" theme="gray" bgColorScale={50} colorScale={400}>
              {!completedExam ? '시험 정보' : '응시 정보'}
            </Badge>
            {completedExam && (
              <UserInfo>
                <span>시험 명</span>
                <div>{examInfo?.name}</div>
              </UserInfo>
            )}
            <div className="column-info">
              {!completedExam ? (
                <>
                  <div className="column">
                    <div className="column-title">시험시간</div>
                    <div className="column-content">
                      <div className="column-content-main">
                        {limitMinuteText ? `총 ${limitMinuteText}분` : '시간제한 없음'}
                      </div>
                    </div>
                  </div>
                  <div className="vertical-line" />
                  <div className="column">
                    <div className="column-title">총 문제수</div>
                    <div className="column-content">
                      <div className="column-content-main">{examInfo?.extras.totalQuestion ?? 0}문항</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="column">
                    <div className="column-title">획득 점수</div>
                    <div className="column-content">
                      <div className="column-content-main">{examScore}점</div>
                      <div className="column-content-sub">환산 : {examScorePercentage}점</div>
                    </div>
                  </div>
                </>
              )}
              <div className="vertical-line" />
              <div className="column">
                <div className="column-title">합격점수 / 총점</div>
                <div className="column-content">
                  <div className="column-content-main">
                    {examPassScore}점 이상 / {totalScore}점
                  </div>
                  <div className="column-content-sub">환산 : {examPassPercentage}점 이상 / 100점</div>
                </div>
              </div>
            </div>
            {!completedExam && (
              <div className="user-info">
                <Badge className="badge" theme="gray" bgColorScale={50} colorScale={400}>
                  수험자 정보
                </Badge>
                <div className="row">
                  <div className="column">
                    <span>이름 :</span>
                    <span>{member?.extras.name}</span>
                  </div>
                  <div className="vertical-line">|</div>
                  <div className="column">
                    <span>연락처 :</span>
                    <span>{member?.extras.phone}</span>
                  </div>
                  <div className="vertical-line">|</div>
                  <div className="column">
                    <span>이메일 :</span>
                    <span>{member?.name}</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </ExamCard>
    </ExamInOutLayoutBlock>
  );
};

export default ExamInOutLayout;
