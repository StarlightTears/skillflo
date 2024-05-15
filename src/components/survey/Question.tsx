import styled from '@emotion/styled';
import classNames from 'classnames';
import React, { MutableRefObject } from 'react';

import type { InvalidQuestionAnswer, SurveyQuestion, SurveyQuestionAnswer } from '@/types/survey.interface';

import { RadioGroup, Input, TextArea, Checkbox } from '@/components';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface SurveyQuestionProps {
  questionList: SurveyQuestion[];
  questionAnswer: { [key: string]: SurveyQuestionAnswer };
  setQuestionAnswerByType: (question: SurveyQuestion, value: string) => void;
  questionRefs: MutableRefObject<{ [key: string]: HTMLElement }>;
  invalidQuestionAnswer?: InvalidQuestionAnswer;
}

const SurveyQuestionBlock = styled.div`
  margin-bottom: 3.6rem;
  font-weight: 700;

  .sequence {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.4rem;
    ${legacyTypographyMixin('caption')}
    color: var(--color-blue-600);
  }

  .invalid {
    color: var(--color-red-600);
  }

  .title {
    ${legacyTypographyMixin('body1')}
    margin-bottom: 1.6rem;
  }

  .fc-textarea {
    min-height: 18.8rem;
  }

  .fc-checkbox {
    span {
      white-space: pre-wrap;
    }
  }

  .list {
    span {
      ${legacyTypographyMixin('body2')}
      font-weight: 700;
      color: var(--legacy-color-gray-600);
    }
  }
`;

const StraightRadioBlock = styled.div`
  .straight-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    ${legacyTypographyMixin('body2')}
    font-weight: 700;
    color: var(--legacy-color-gray-600);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const SurveyContentQuestion = ({
  questionList,
  questionAnswer,
  setQuestionAnswerByType,
  questionRefs,
  invalidQuestionAnswer,
}: SurveyQuestionProps) => {
  return (
    <>
      {questionList.map((question, index) => (
        <SurveyQuestionBlock key={question.questionId}>
          <div
            className={classNames(['sequence', { invalid: question.questionId === invalidQuestionAnswer?.id }])}
            ref={(ref: HTMLDivElement) => (questionRefs.current[question.questionId] = ref)}
          >
            <div>
              Q{index + 1}. {question.isRequired && '필수문항'}
            </div>
            {invalidQuestionAnswer && question.questionId === invalidQuestionAnswer.id && (
              <div>{invalidQuestionAnswer.message}</div>
            )}
          </div>
          <div className="title">{question.name}</div>
          {question.type === 'SINGLE' && (
            <RadioGroup
              className="list"
              radioGroup={question.examples.map((example) => ({ label: example.answer, value: String(example.id) }))}
              direction="column"
              name="single"
              selectedValue={questionAnswer[question.questionId].submitAnswer}
              setValue={(value) => setQuestionAnswerByType(question, value)}
            />
          )}
          {question.type === 'RANGE' && (
            <StraightRadioBlock>
              <div className="straight-label">
                <span>{question.leftLabel}</span>
                <span>{question.rightLabel}</span>
              </div>
              <RadioGroup
                className="list"
                radioGroup={question.examples.map((example) => ({
                  label: String(example.id),
                  value: String(example.id),
                }))}
                direction="straight"
                name={`straight-${question.questionId}`}
                selectedValue={questionAnswer[question.questionId]?.submitAnswer || ''}
                setValue={(value) => setQuestionAnswerByType(question, value)}
              />
            </StraightRadioBlock>
          )}
          {question.type === 'INPUT' && (
            <Input
              value={questionAnswer[question.questionId]?.submitAnswer || ''}
              onChange={(event) => setQuestionAnswerByType(question, event.currentTarget.value)}
            />
          )}
          {question.type === 'TEXT' && (
            <TextArea autoresize onChange={(event) => setQuestionAnswerByType(question, event.currentTarget.value)} />
          )}
          {question.type === 'MULTIPLE' && (
            <CheckboxGroup className="list">
              {question.examples.map((example) => (
                <Checkbox
                  key={example.id}
                  label={example.answer}
                  checked={questionAnswer[question.questionId]?.submitAnswer.split(',').includes(String(example.id))}
                  setChecked={() => setQuestionAnswerByType(question, String(example.id))}
                />
              ))}
            </CheckboxGroup>
          )}
        </SurveyQuestionBlock>
      ))}
    </>
  );
};

export default SurveyContentQuestion;
