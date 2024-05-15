import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';

import { useSkillQuery } from './skill';

import { getAssessmentById, getAssessments } from '@/shared/api/skill360/assessment';
import {
  completeAssessment,
  fetchAssessmentExamResult,
  fetchAssessmentProgress,
  solveAssessmentQuestion,
} from '@/shared/api/skill360/assessmentTest';
import { QUERY_KEYS } from '@/shared/policy';
import slices from '@/shared/store/slices';
import { computeQuestionsByLevel } from '@/shared/utils/skillAssessmentTest';

export const useAssessmentProgressQuery = () => {
  const params = useParams();
  const skillId = Number(params.skillId);
  const { data: skillDetail, isFetched: isFetchedSkillDetail } = useSkillQuery(skillId);
  const assessmentPayload = {
    skillId,
    examId: skillDetail?.skill.examId as number,
    memberAssessmentId: skillDetail?.memberAssessment?.id as number,
  };
  const isPreparedPayload = Object.values(assessmentPayload).every((value) => !!value) && isFetchedSkillDetail;

  const navigate = useNavigate();
  const { data: assessmentExamResult, isFetched: isFetchedAssessmentExamResult } = useQuery({
    queryKey: QUERY_KEYS.ASSESSMENT_EXAM_RESULT(assessmentPayload),
    queryFn: () => fetchAssessmentExamResult(assessmentPayload),
    enabled: isPreparedPayload,
  });
  useEffect(() => {
    if (!assessmentExamResult || !assessmentExamResult.extras.isCompleted) return;

    alert('이미 평가를 완료한 스킬입니다.');
    navigate('/skills');
  }, [assessmentExamResult]);

  const shouldApplyAssessment = isFetchedAssessmentExamResult && !assessmentExamResult?.extras.isCompleted;
  const { data: assessmentProgress } = useQuery({
    queryKey: QUERY_KEYS.MEMBER_ASSESSMENT_PROGRESS(assessmentPayload),
    queryFn: () => fetchAssessmentProgress(assessmentPayload).then((data) => data.data),
    enabled: isPreparedPayload && shouldApplyAssessment,
  });

  const { setupTest, resetTest } = slices.actions.assessmentTest;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!assessmentProgress) return;

    dispatch(
      setupTest({
        ...assessmentPayload,
        expireDate: assessmentProgress.progress.endAt as string,
        questionCountPerLevel: skillDetail?.skill?.questionCount as number,
        questions: assessmentProgress.questions,
      })
    );

    return () => {
      dispatch(resetTest());
    };
  }, [assessmentProgress]);
};

export const useAssessmentsQuery = ({ enabled = true }: { enabled?: boolean } = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.ASSESSMENTS(),
    queryFn: () => getAssessments().then((res) => res.data),
    enabled: enabled,
  });
};

export const useAssessmentQueryById = (
  assessmentId: number,
  { enabled = true, refetchOnWindowFocus = false }: { enabled?: boolean; refetchOnWindowFocus?: boolean }
) => {
  return useQuery({
    queryKey: QUERY_KEYS.ASSESSMENT(assessmentId),
    queryFn: () => getAssessmentById(assessmentId).then((res) => res.data),
    enabled: enabled,
    refetchOnWindowFocus: refetchOnWindowFocus,
  });
};

export const useAssessmentProgressState = () => {
  return useAppSelector((state) => state.assessmentTest);
};

export const useAssessmentQuestion = () => {
  const { questions, currentQuestionLevel, currentQuestionId } = useAssessmentProgressState();
  const currentLevelQuestions = computeQuestionsByLevel(questions, currentQuestionLevel) ?? [];
  const currentQuestion = questions.find((question) => question.id === currentQuestionId);

  return {
    currentLevelQuestions,
    currentQuestion,
  };
};

export const useAssessmentQuestionInput = () => {
  const { currentQuestionAnswer } = useAssessmentProgressState();
  const { currentQuestion } = useAssessmentQuestion();
  const { setQuestionAnswer } = slices.actions.assessmentTest;

  const selectedAnswers = currentQuestionAnswer
    .split(',')
    .filter((answerString) => !!answerString)
    .map((answer) => parseInt(answer));

  const dispatch = useAppDispatch();
  const selectAnswer = (newAnswer: number) => {
    if (currentQuestion?.extras.answerCount === 1) {
      dispatch(setQuestionAnswer(newAnswer.toString()));
    } else {
      const isSelectedAnswer = selectedAnswers.includes(newAnswer);
      const answerToSet = isSelectedAnswer
        ? selectedAnswers.filter((selectedAnswer) => selectedAnswer !== newAnswer)
        : [...selectedAnswers, newAnswer];
      dispatch(setQuestionAnswer(answerToSet.join(',')));
    }
  };

  return { selectedAnswers, selectAnswer };
};

export const useAssessmentQuesionSubmit = () => {
  const { skillId, memberAssessmentId, examId, currentQuestionId, currentQuestionAnswer } =
    useAssessmentProgressState();

  const { mutateAsync: solveQuestion, isLoading: isLoadingRequest } = useMutation(() => {
    return solveAssessmentQuestion({
      skillId,
      memberAssessmentId,
      examId,
      questionId: currentQuestionId,
      type: currentQuestion?.type as string,
      submitAnswer: currentQuestionAnswer,
      exampleAnswers: currentQuestion?.type === 'MULTIPLE' ? currentQuestion.extras.exampleAnswers : undefined,
    });
  });
  const { currentQuestion } = useAssessmentQuestion();

  const dispatch = useAppDispatch();
  const { solvedQuestion } = slices.actions.assessmentTest;

  const submitAnswer = async () => {
    const { data: questionResult } = await solveQuestion();
    const isCorrect = questionResult.isCorrect;

    dispatch(solvedQuestion({ isCorrect }));
  };

  return { submitAnswer, isLoadingRequest };
};

export const useExitAssessment = () => {
  const { skillId, examId, memberAssessmentId, earnedLevel } = useAssessmentProgressState();

  const navigate = useNavigate();
  const { mutateAsync: requestCompleteAssessment } = useMutation(() =>
    completeAssessment({ skillId, examId, memberAssessmentId, earnedLevel })
  );

  const exitAssessment = async () => {
    await requestCompleteAssessment();
    navigate(`/skills/${skillId}/result`);
  };

  return { exitAssessment };
};

export const useLevelUpAlert = () => {
  const { shouldQuestionLevelUpAlert, currentQuestionLevel } = useAssessmentProgressState();
  const dispatch = useAppDispatch();

  const upQuestionLevel = () => {
    dispatch(slices.actions.assessmentTest.upQuestionLevel());
  };

  return { currentQuestionLevel, shouldQuestionLevelUpAlert, upQuestionLevel };
};

export const useExpireTest = () => {
  const dispatch = useAppDispatch();
  const expireTest = () => {
    dispatch(slices.actions.assessmentTest.expireTest());
  };

  return { expireTest };
};
