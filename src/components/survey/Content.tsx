import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { InvalidQuestionAnswer, SurveyQuestion, SurveyQuestionAnswer } from '@/types/survey.interface';

import { Button, SurveyContentQuestion, SurveyComplete } from '@/components';
import { submitSurveyQuestionAndCompleteSurvey } from '@/shared/api/survey';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { invisibleScrollBar } from '@/styles/mixins';

interface SurveyContentProps {
  surveyId: number;
  solveMemberId: string | number;
  noticeMessage: string;
  resultMessage: string;
  isAgreePrivacy: boolean;
  privacyPolicyStatement: string;
  questionList: SurveyQuestion[];
}

const SurveyContentBlock = styled.div`
  .message {
    white-space: pre-wrap;
  }

  .hr {
    margin: 2rem 0;
    border: 0.05rem solid var(--legacy-color-gray-100);
  }

  footer {
    display: flex;
    justify-content: flex-end;

    .fc-button {
      width: fit-content;
    }
  }
`;

const SurveyContentIntro = styled.div`
  ${legacyTypographyMixin('body2')}

  .privacy-info {
    margin-top: 2rem;

    .privacy-title {
      margin-bottom: 0.8rem;
      font-weight: 700;
      ${legacyTypographyMixin('button')}
    }

    .privacy-description {
      padding: 1.4rem 1.6rem;
      border: 0.1rem solid var(--legacy-color-gray-100);
      border-radius: 0.6rem;
    }
  }
`;

const SurveyContentOutro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rem 0;

  svg {
    margin-bottom: 2.8rem;
  }

  p {
    ${legacyTypographyMixin('body1')}
    font-weight: 700;
  }
`;

const SurveyContentWrapper = styled.div`
  padding: 2rem 0.1rem 0;
  ${invisibleScrollBar}
`;

const SurveyContent = ({
  surveyId,
  solveMemberId,
  noticeMessage,
  resultMessage,
  isAgreePrivacy,
  privacyPolicyStatement,
  questionList,
}: SurveyContentProps) => {
  const [currentPage, setCurrentPage] = useState('intro');
  const [questionAnswer, setQuestionAnswer] = useState<{ [key: string]: SurveyQuestionAnswer }>({});
  const navigate = useNavigate();
  const questionRefs = useRef<{ [key: string]: HTMLElement }>({});
  const [invalidQuestionAnswer, setInvalidQuestionAnswer] = useState<InvalidQuestionAnswer | undefined>(undefined);

  const validateRequireQuestionAnswer = (questionList: SurveyQuestion[]) => {
    const invalidAnswer = questionList.find((item) => {
      if (item.isRequired) {
        if (item.type === 'MULTIPLE') {
          const multipleSubmitAnswer = questionAnswer[item.questionId]?.submitAnswer;
          return !(multipleSubmitAnswer?.split(',').length === item.selectionCount);
        } else {
          return !questionAnswer[item.questionId]?.submitAnswer;
        }
      }
      return false;
    });

    const focusElement = invalidAnswer ? questionRefs.current[invalidAnswer.questionId] : undefined;

    return invalidAnswer && focusElement
      ? { id: invalidAnswer.questionId, focusElement, message: '답변이 누락되었습니다.' }
      : undefined;
  };

  const setQuestionAnswerByType = (question: SurveyQuestion, value: string) => {
    let submitAnswer: string;
    const prevQuestionAnswer = questionAnswer[question.questionId];
    if (question.type === 'MULTIPLE' && prevQuestionAnswer) {
      const prevSubmitAnswerList = questionAnswer[question.questionId].submitAnswer.split(',');
      if (prevSubmitAnswerList.includes(value)) {
        const newSubmitAnswerList = prevSubmitAnswerList.filter((answer) => answer !== value).sort();
        submitAnswer = newSubmitAnswerList.join();
      } else {
        const newSubmitAnswerList = [...prevSubmitAnswerList, value].sort();
        submitAnswer = newSubmitAnswerList.join();
      }
    } else {
      submitAnswer = value;
    }

    const newQuestionAnswer = {
      ...questionAnswer,
    };
    if (submitAnswer) {
      newQuestionAnswer[question.questionId] = {
        questionId: question.questionId,
        type: question.type,
        submitAnswer,
        examples: question.examples,
      };
    } else {
      delete newQuestionAnswer[question.questionId];
    }
    setQuestionAnswer(newQuestionAnswer);
  };

  const clickSurveyButton = async () => {
    switch (currentPage) {
      case 'intro':
        setCurrentPage('question');
        return;
      case 'question':
        try {
          const surveyFormValidation = validateRequireQuestionAnswer(questionList);
          if (surveyFormValidation) {
            setInvalidQuestionAnswer(surveyFormValidation);
            surveyFormValidation.focusElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
          await submitSurveyQuestionAndCompleteSurvey(surveyId, solveMemberId, Object.values(questionAnswer));
          setCurrentPage('outro');
        } catch (error) {
          alert('설문 제출이 실패하였습니다. 잠시 후 다시 시도해주세요.');
        }
        return;
      case 'outro':
        navigate('/');
        return;
    }
  };

  return (
    <SurveyContentWrapper>
      <SurveyContentBlock>
        {currentPage === 'intro' && (
          <SurveyContentIntro>
            <p className="message">{noticeMessage}</p>
            {isAgreePrivacy && (
              <div className="privacy-info">
                <h6 className="privacy-title">개인정보 수집 이용 동의서</h6>
                <pre className="privacy-description">{privacyPolicyStatement}</pre>
              </div>
            )}
          </SurveyContentIntro>
        )}
        {currentPage === 'question' && (
          <SurveyContentQuestion
            questionList={questionList}
            questionAnswer={questionAnswer}
            setQuestionAnswerByType={setQuestionAnswerByType}
            questionRefs={questionRefs}
            invalidQuestionAnswer={invalidQuestionAnswer}
          />
        )}
        {currentPage === 'outro' && (
          <SurveyContentOutro>
            <SurveyComplete />
            {resultMessage ? (
              <p className="message">{resultMessage}</p>
            ) : (
              <>
                <p>설문응답이 제출되었습니다.</p>
                <p>설문에 참여해 주셔서 감사합니다.</p>
              </>
            )}
          </SurveyContentOutro>
        )}
        <div className="hr" />
        <footer>
          <Button theme="primary" onClick={clickSurveyButton}>
            {currentPage === 'intro' && '설문시작'}
            {currentPage === 'question' && '설문 제출'}
            {currentPage === 'outro' && '확인'}
          </Button>
        </footer>
      </SurveyContentBlock>
    </SurveyContentWrapper>
  );
};

export default SurveyContent;
