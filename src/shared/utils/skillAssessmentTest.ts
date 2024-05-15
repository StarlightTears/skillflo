import { AssessmentQuestion } from '@/types/skill360.interface';

interface ValidateLevelOption {
  questions: AssessmentQuestion[];
  questionCountPerLevel: number;
  questionResults: Record<number, boolean>;
}

export const computeQuestionsByLevel = (questions: AssessmentQuestion[], level: number) =>
  questions.filter((question) => question.extras.level === level * 2);

export const shouldEndAssessment = ({ questions, questionCountPerLevel, questionResults }: ValidateLevelOption) => {
  const incorrectProblemCount = questions.filter((question) => questionResults[question.id] === false).length;
  return incorrectProblemCount >= Math.ceil(questionCountPerLevel / 2);
};

export const shouldUpQuestionLevel = ({ questions, questionCountPerLevel, questionResults }: ValidateLevelOption) => {
  const correctProblemCount = questions.filter((question) => questionResults[question.id] === true).length;
  return correctProblemCount >= Math.ceil(questionCountPerLevel / 2);
};

export const computeAssessmentTestProgress = (questions: AssessmentQuestion[], questionCountPerLevel: number) => {
  // * 문제풀이 결과 구하기
  const questionResults = questions.reduce(
    (questionResults, { id: questionId, extras: { evaluateState } }) => {
      if (evaluateState === 'NONE') return questionResults;
      questionResults[questionId] = evaluateState === 'CORRECT';

      return questionResults;
    },
    {} as Record<number, boolean>
  );

  const maxQuestionLevel = Math.max(...new Set(questions.map((question) => question.extras.level / 2)));
  // * 레벨을 반복하면서 진단 평가 진행 현황 구하기
  const testProgress = {
    level: 1,
    earnedLevel: 0,
    questionId: -1,
    isCompleted: false,
    questionResults,
  };
  while (testProgress.level <= maxQuestionLevel) {
    const currentLevelQuestions = computeQuestionsByLevel(questions, testProgress.level);
    const levelValidationPayload = {
      questions: currentLevelQuestions,
      questionCountPerLevel,
      questionResults,
    };

    // * 현재 레벨에서 보여주게 될 문제를 계산. 풀지 않은 문제 || 마지막 문제
    testProgress.questionId = currentLevelQuestions.find((question, questionIndex) => {
      return question.extras.evaluateState === 'NONE' || questionIndex === currentLevelQuestions.length - 1;
    })?.id as number;

    if (shouldEndAssessment(levelValidationPayload)) {
      testProgress.isCompleted = true;
      break;
    }

    if (!shouldUpQuestionLevel(levelValidationPayload)) {
      break;
    }

    testProgress.earnedLevel++;
    if (testProgress.level === maxQuestionLevel) {
      testProgress.isCompleted = true;
      break;
    }

    testProgress.level++;
  }

  return testProgress;
};
