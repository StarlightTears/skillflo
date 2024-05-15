import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  computeAssessmentTestProgress,
  computeQuestionsByLevel,
  shouldEndAssessment,
  shouldUpQuestionLevel,
} from '@/shared/utils/skillAssessmentTest';
import { AssessmentQuestion } from '@/types/skill360.interface';

interface AssessmentTestState {
  skillId: number;
  examId: number;
  memberAssessmentId: number;
  expireTime: number;
  questions: AssessmentQuestion[];
  questionCountPerLevel: number;
  currentQuestionLevel: number;
  currentQuestionId: number;
  currentQuestionAnswer: string;
  shouldQuestionLevelUpAlert: boolean;
  questionResults: Record<number, boolean>;
  earnedLevel: number;
  isCompleted: boolean;
}

interface SetupTestPayload {
  skillId: number;
  examId: number;
  memberAssessmentId: number;
  expireDate: string;
  questionCountPerLevel: number;
  questions: AssessmentQuestion[];
}

interface SolvedQuestionPayload {
  isCorrect: boolean;
}

const initialState: AssessmentTestState = {
  // * 시험 데이터
  skillId: -1,
  examId: -1,
  memberAssessmentId: -1,
  expireTime: 0,
  questions: [],
  questionCountPerLevel: 5,

  // * 시험 진행 현황 데이터
  currentQuestionLevel: 1,
  currentQuestionId: -1,
  currentQuestionAnswer: '',
  shouldQuestionLevelUpAlert: false,

  // * 시험 결과 데이터
  questionResults: {},
  earnedLevel: 0,
  isCompleted: false,
};

const slice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    setupTest(state, { payload }: PayloadAction<SetupTestPayload>) {
      state.skillId = payload.skillId;
      state.examId = payload.examId;
      state.memberAssessmentId = payload.memberAssessmentId;
      state.expireTime = new Date(payload.expireDate).getTime();
      state.questions = payload.questions;
      state.questionCountPerLevel = payload.questionCountPerLevel;

      const testProgress = computeAssessmentTestProgress(payload.questions, payload.questionCountPerLevel);
      state.currentQuestionLevel = testProgress.level;
      state.earnedLevel = testProgress.earnedLevel;
      state.currentQuestionId = testProgress.questionId;
      state.questionResults = testProgress.questionResults;
      state.isCompleted = testProgress.isCompleted;
    },
    setQuestionAnswer(state, { payload }: PayloadAction<string>) {
      state.currentQuestionAnswer = payload;
    },
    solvedQuestion(state, { payload }: PayloadAction<SolvedQuestionPayload>) {
      const { questionResults, currentQuestionId, questions, questionCountPerLevel, currentQuestionLevel } = state;
      questionResults[currentQuestionId] = payload.isCorrect;

      const currentLevelQuestions = computeQuestionsByLevel(questions, currentQuestionLevel);
      const levelValidationPayload = {
        questions: computeQuestionsByLevel(questions, currentQuestionLevel),
        questionCountPerLevel,
        questionResults,
      };

      // * 현재 레벨에서 과반수 이상 오답을 받은 경우 진단 평가 종료
      if (shouldEndAssessment(levelValidationPayload)) {
        state.isCompleted = true;
        return;
      }

      // * 현재 레벨에서 과반수 이상 정답을 받았을 때,
      if (shouldUpQuestionLevel(levelValidationPayload)) {
        const nextLevelQuestions = computeQuestionsByLevel(questions, currentQuestionLevel + 1);

        if (nextLevelQuestions.length) {
          // * 마지막 레벨이 아닌 경우 다음 레벨로 이동
          state.shouldQuestionLevelUpAlert = true;
        } else {
          // * 마지막 레벨인 경우 진단 평가 종료
          state.earnedLevel++;
          state.isCompleted = true;
        }
        return;
      }

      // * 다음 문제로 넘어가기
      const currentQuestionIndex = currentLevelQuestions.findIndex((question) => question.id === currentQuestionId);
      state.currentQuestionId = currentLevelQuestions[currentQuestionIndex + 1].id;
      state.currentQuestionAnswer = '';
    },
    upQuestionLevel(state) {
      state.shouldQuestionLevelUpAlert = false;
      state.earnedLevel++;
      state.currentQuestionLevel++;
      state.currentQuestionId = computeQuestionsByLevel(state.questions, state.currentQuestionLevel)[0].id;
      state.currentQuestionAnswer = '';
    },
    expireTest(state) {
      state.isCompleted = true;
    },
    resetTest() {
      return { ...initialState };
    },
  },
});

export default {
  reducer: slice.reducer,
  actions: {
    ...slice.actions,
  },
};
