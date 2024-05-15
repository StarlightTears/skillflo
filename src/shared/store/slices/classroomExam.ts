import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { ExamQuestion } from '@/types/exam.interface';

import { arrayShuffle } from '@/shared/utils/arrayShuffle';

interface StringMap {
  [id: number]: string;
}

interface NumberMap {
  [id: number]: number;
}

interface ClassroomExamState {
  expireTime: number | undefined;
  questions: ExamQuestion[];
  currentIndex?: number;
  questionAnswers: StringMap;
  questionScores: NumberMap;
  completedExam: boolean;
}

const initialState: ClassroomExamState = {
  expireTime: 0,
  questions: [],
  currentIndex: undefined,
  questionAnswers: {},
  questionScores: {},
  completedExam: false,
};

const slice = createSlice({
  name: 'classroomExam',
  initialState,
  reducers: {
    startExam(state, { payload }: PayloadAction<{ questions: ExamQuestion[]; endExamAt: string | undefined }>) {
      state.expireTime = payload.endExamAt !== undefined ? new Date(payload.endExamAt).getTime() : payload.endExamAt;
      state.questions = payload.questions.map((question) => {
        const exampleAnswers = question.extras.exampleAnswers;

        return {
          ...question,
          extras: {
            ...question.extras,
            exampleAnswers: question.extras.isShuffle ? arrayShuffle(exampleAnswers) : exampleAnswers,
          },
        };
      });
      state.questionAnswers = payload.questions.reduce((questionAnswers, question) => {
        // TODO: 문제를 확실하게 제출했다는 데이터가 필요하다. (question.extras.submittedAnswer는 애매하다 빈 문제를 제출했을 가능성이 있어서...)
        if (question.extras.submittedAnswer) {
          questionAnswers[question.id] = question.extras.submittedAnswer;
        }
        return questionAnswers;
      }, {} as StringMap);
      state.questionScores = payload.questions.reduce((questionAnswers, question) => {
        // TODO: 문제를 확실하게 제출했다는 데이터가 필요하다. (question.extras.submittedAnswer는 애매하다 빈 문제를 제출했을 가능성이 있어서...)
        if (question.extras.submittedAnswer) {
          questionAnswers[question.id] = question.extras.earnedScore;
        }
        return questionAnswers;
      }, {} as NumberMap);

      state.currentIndex = 0;
    },
    changeIndex(state, { payload }: PayloadAction<number>) {
      state.currentIndex = payload;
    },
    setQuestionAnswer(state, { payload: answer }: PayloadAction<string>) {
      const currentQuestion = state.questions[state.currentIndex as number];
      state.questionAnswers[currentQuestion.id] = answer;
    },
    solvedQuestion(state, { payload: score }: PayloadAction<number>) {
      const currentQuestion = state.questions[state.currentIndex as number];
      state.questionScores[currentQuestion.id] = score;
    },
    completeExam(state) {
      state.completedExam = true;
    },
    resetExam(state) {
      state.expireTime = 0;
      state.questions = [];
      state.currentIndex = undefined;
      state.questionAnswers = {};
      state.completedExam = false;
      state.questionScores = {};
    },
  },
});

export default {
  reducer: slice.reducer,
  actions: {
    ...slice.actions,
  },
};
