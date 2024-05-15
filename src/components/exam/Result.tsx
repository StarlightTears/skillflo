import styled from '@emotion/styled';
import React, { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Badge, Button, ExamInfo, ExamInfoContent, ExamResultEvaluate, ExamResultQuestion } from '@/components';
import { useCurrentMemberGroup } from '@/shared/hooks';
import { useExamBridge } from '@/shared/hooks/exam/useExamBridge';
import { useExamResult } from '@/shared/hooks/examResult';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { typographyMixin } from '@/styles/mixins';

const ExamResultBlock = styled.section`
  width: 83.4rem;
  margin: 0 auto;
  padding-top: 2rem;
  padding-bottom: 15.7rem;

  header {
    margin-bottom: 4rem;
    ${legacyTypographyMixin('headline2')}
    font-weight: 700;
  }

  .hr {
    border: 0.05rem solid var(--color-hr);
  }

  .exam-info {
    display: flex;

    .label {
      width: 16.7rem;
      margin-right: 4.7rem;
      ${legacyTypographyMixin('body1')}
      font-weight: 700;
    }
  }

  .exam-footer {
    display: flex;
    justify-content: right;
    margin-top: 1.2rem;

    .fc-button {
      width: fit-content;
    }
  }
`;

const QuestionAnswerBlock = styled.div`
  .title {
    margin-bottom: 5.2rem;
    ${legacyTypographyMixin('body1')}
    font-weight: 700;
  }

  .hr {
    margin: 5.2rem 0;
  }

  .question {
    display: flex;
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

const ExamResult = () => {
  const navigate = useNavigate();
  const { productId, courseId } = useParams();
  const { data: examResult } = useExamResult();
  const { data: examInfo } = useExamBridge();
  const { data: memberGroup } = useCurrentMemberGroup();
  const isResultExposed = memberGroup?.extras.isResultExposed ?? true;

  return (
    <ExamResultBlock>
      <header>시험 결과</header>
      <div className="exam-info">
        <div className="label">시험 및 응시정보 확인</div>
        <ExamInfo name={examResult?.exam.name || ''} subInfo={(isResultExposed && examInfo?.extras.description) || ''}>
          {isResultExposed ? (
            <>
              <hr className="hr" />
              <ExamInfoContent />
            </>
          ) : (
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
          )}
        </ExamInfo>
      </div>
      {isResultExposed && (
        <QuestionAnswerBlock>
          <div className="title">답안 확인</div>
          {examResult?.questions.map((question, index, questionList) => (
            <Fragment key={question.id}>
              <div className="question">
                <ExamResultEvaluate sequence={index + 1} question={question} />
                <ExamResultQuestion question={question} />
              </div>
              {index < questionList.length - 1 && <hr className="hr" />}
            </Fragment>
          ))}
        </QuestionAnswerBlock>
      )}
      <footer className="exam-footer">
        <Button
          theme="primary"
          size="medium"
          onClick={() => {
            navigate(`/course-detail/${productId}/${courseId}?tab=exam`);
          }}
        >
          목록으로
        </Button>
      </footer>
    </ExamResultBlock>
  );
};

export default ExamResult;
