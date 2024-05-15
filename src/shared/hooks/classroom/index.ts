import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { NavigateOptions, useLocation, useNavigate, useParams } from 'react-router-dom';

import { useTotalScore } from '../enrollment';
import { useCourseContentList, useCourseContent } from '../useCourseContent';
import { useNoteList } from '../useNote';
import { useProduct } from '../useProduct';
import { useTaskData } from '../useTask';

import type { COURSE_TYPE, OriginCourse } from '@/types/course.interface';
import type { ExamQuestion } from '@/types/exam.interface';
import type { Note } from '@/types/note.interface';

import { getVideoInfo, getLearningProgressTime } from '@/shared/api/classroom';
import { getCompletedContentList } from '@/shared/api/course';
import { completeExam, solveExamQuestion, getExamProgress } from '@/shared/api/exam';
import { createNote as createNoteApi } from '@/shared/api/note';
import { useExamTaskList, useAppDispatch, useAppSelector, useCourse, useCurrentMember } from '@/shared/hooks';
import { QUERY_KEYS, WHOLE_CONTENT_LIST_LIMIT } from '@/shared/policy';
import slices from '@/shared/store/slices';
import { getLogger } from '@/shared/utils/logger';

const logger = getLogger('hooks', 'classroom');
const classroomExamActions = slices.actions.classroomExam;

export const useClassroomParams = () => {
  const params = useParams();

  return {
    productId: Number(params.productId),
    courseId: Number(params.courseId),
    courseContentId: Number(params.courseContentId),
    examId: Number(params.examId),
  };
};

export const useClassroomNoteList = () => {
  const { productId, courseId } = useClassroomParams();

  const { data } = useNoteList(productId, courseId);

  return data?.extras?.note || [];
};

export const useClassroomNoteEditor = () => {
  const { courseId, productId, courseContentId } = useClassroomParams();
  const queryClient = useQueryClient();
  const createNoteMutation = useMutation((payload: unknown) => createNoteApi(payload));
  const { data: course } = useCourse(courseId);
  const { member } = useCurrentMember();
  const noteList = useClassroomNoteList();

  const findPartCourseContentNameByCourseContentId = (courseContentId: number) => {
    let partIndex, partTitle, chapterTitle, chapterIndex, courseContentTitle;
    course?.extras.contents.forEach((part) => {
      if (part.CHAPTER) {
        part.CHAPTER.forEach((chapter) => {
          chapter.CONTENT.forEach((courseContent) => {
            if (courseContent.courseContentId === courseContentId) {
              partIndex = part.sequence;
              partTitle = part.title;
              chapterTitle = chapter.title;
              chapterIndex = chapter.sequence;
              courseContentTitle = courseContent.courseContentName;
            }
          });
        });
      }
      if (part.CONTENT) {
        part.CONTENT.forEach((courseContent) => {
          if (courseContent.courseContentId === courseContentId) {
            partIndex = part.sequence;
            partTitle = part.title;
            courseContentTitle = courseContent.courseContentName;
          }
        });
      }
    });
    return { partIndex, partTitle, chapterTitle, chapterIndex, courseContentTitle };
  };

  const sendNoteRequestWithPayload = (noteList: Note[]) => {
    const payload = {
      member_id: member?.id,
      product_id: productId,
      course_id: courseId,
      extras: {
        note: noteList,
      },
    };
    return createNoteMutation.mutateAsync(payload);
  };

  const createNote = async (title: string, content: string, position: number, closeNoteEditor: () => void) => {
    try {
      const { partIndex, partTitle, chapterTitle, chapterIndex, courseContentTitle } =
        findPartCourseContentNameByCourseContentId(courseContentId);
      const newNote = {
        createdAt: new Date(),
        updatedAt: new Date(),
        partTitle,
        partIndex,
        chapterTitle,
        chapterIndex,
        courseContentTitle,
        courseContentId,
        position,
        title,
        content,
      };
      await sendNoteRequestWithPayload([...noteList, newNote]);
      queryClient.invalidateQueries(QUERY_KEYS.CLASSROOM_COURSE_NOTE_LIST(productId, courseId));
    } catch (error) {
      alert('에러가 발생했습니다. 잠시후 다시 시도해주세요.');
    } finally {
      closeNoteEditor();
    }
  };

  const deleteNote = async (note: Note) => {
    try {
      const filteredNoteList = noteList.filter((item) => item.createdAt !== note.createdAt);
      await sendNoteRequestWithPayload(filteredNoteList);
      queryClient.invalidateQueries(QUERY_KEYS.CLASSROOM_COURSE_NOTE_LIST(productId, courseId));
    } catch (error) {
      alert('에러가 발생했습니다. 잠시후 다시 시도해주세요.');
    }
  };

  const modifyNote = async (editNote: Note, closeNoteEditor: () => void) => {
    try {
      const foundNoteIndex = noteList.findIndex((note) => note.createdAt === editNote.createdAt);
      const copyNoteList = [...noteList];
      copyNoteList.splice(foundNoteIndex, 1, editNote);
      await sendNoteRequestWithPayload(copyNoteList);
      queryClient.invalidateQueries(QUERY_KEYS.CLASSROOM_COURSE_NOTE_LIST(productId, courseId));
    } catch (error) {
      alert('에러가 발생했습니다. 잠시후 다시 시도해주세요.');
    } finally {
      closeNoteEditor();
    }
  };

  return { createNote, deleteNote, modifyNote, findPartCourseContentNameByCourseContentId };
};

export const useClassroomProduct = () => {
  const { productId } = useClassroomParams();

  return useProduct(productId);
};

export const useClassroomCourse = () => {
  const { courseId } = useClassroomParams();
  const courseQueryResult = useCourse(courseId);
  const isMeetCourse = courseQueryResult?.data?.type === 'MEET';

  return { ...courseQueryResult, isMeetCourse } as UseQueryResult<OriginCourse, unknown> & { isMeetCourse: boolean };
};

export const useCompletedContentList = () => {
  const { productId, courseId } = useClassroomParams();

  return useQuery(QUERY_KEYS.COMPLETED_CONTENT_LIST(productId, courseId), () =>
    getCompletedContentList(productId, courseId)
  );
};

export const useCourseLearningProgressTime = (params?: { productId: number; courseId: number }) => {
  const { productId, courseId } = params || useClassroomParams();
  return useQuery(QUERY_KEYS.CLASSROOM_COURSE_LEARNING_PROGRESS_TIME(productId, courseId), () =>
    getLearningProgressTime(productId, courseId)
  );
};

export const useClassroomExamList = () => {
  const { productId, courseId } = useClassroomParams();

  const { data, ...restQueryResult } = useExamTaskList({ productId, courseId, limit: WHOLE_CONTENT_LIST_LIMIT });

  return useMemo(
    () => ({
      ...restQueryResult,
      data: data ? data.data?.filter((exam) => exam.extras.category === 'SELECTION').reverse() : [],
    }),
    [data]
  );
};

export const usePartExamList = (partId: string) => {
  const { data: examList } = useClassroomExamList();

  return (
    examList?.filter((exam) => {
      return exam.extras.partId === partId && !exam.extras.chapterId && !exam.extras.courseContentId;
    }) || []
  );
};

export const useChapterExamList = (partId: string, chapterId: string) => {
  const { data: examList } = useClassroomExamList();

  return (
    examList?.filter((exam) => {
      return exam.extras.partId === partId && exam.extras.chapterId === chapterId && !exam.extras.courseContentId;
    }) || []
  );
};

export const useContentExamList = (contentId: number) => {
  const { data: examList } = useClassroomExamList();

  return (
    examList?.filter((exam) => {
      return exam.extras.courseContentId === contentId;
    }) || []
  );
};

export const useClassroomContentList = () => {
  const { courseId } = useClassroomParams();

  return useCourseContentList(courseId);
};

export const useClassroomCourseContent = (contentId: number) => {
  const { data: contentList } = useClassroomContentList();

  return useMemo(() => contentList?.find((part) => part.id === contentId), [contentId, contentList]);
};

export const useCurrentPart = () => {
  const { data: course } = useClassroomCourse();
  const { courseContentId } = useClassroomParams();

  return useMemo(() => {
    if (!course) return null;

    return course.extras.contents.find((part) => {
      const chapterContentList = part.CHAPTER?.flatMap((chapter) => chapter.CONTENT) ?? [];
      if (chapterContentList.some((content) => content.courseContentId === courseContentId)) return part;

      if (part.CONTENT?.some((content) => content.courseContentId === courseContentId)) return part;
      return null;
    });
  }, [course, courseContentId]);
};

export const useCurrentPartCourseContentIds = () => {
  const currentPart = useCurrentPart();

  const courseContentIds = currentPart?.CHAPTER
    ? currentPart.CHAPTER.flatMap((chapter) => chapter.CONTENT.flatMap((content) => content.courseContentId))
    : currentPart?.CONTENT
      ? currentPart.CONTENT.flatMap((content) => content.courseContentId)
      : [];

  return {
    sequence: currentPart?.sequence,
    courseContentIds,
  };
};

export const useCurrentCourseContent = () => {
  const { courseContentId } = useClassroomParams();

  return useClassroomCourseContent(courseContentId);
};

interface ClassroomNavigate {
  (urlData: string, options?: NavigateOptions): void;
  (urlData: BasePageRouteData, options?: NavigateOptions): void;
  (urlData: examPageRouteData, options?: NavigateOptions): void;
  (urlData: videoPageRouteData, options?: NavigateOptions): void;
}

interface BasePageRouteData {
  type?: COURSE_TYPE;
  productId: number;
  courseId: number;
}

interface videoPageRouteData {
  type?: COURSE_TYPE;
  productId?: number;
  courseId?: number;
  courseContentId: number;
  query?: {
    position?: number;
  };
}

interface examPageRouteData {
  type?: COURSE_TYPE;
  productId?: number;
  courseId?: number;
  examId: number;
}

const isVideoPageRouteData = (
  data: BasePageRouteData | videoPageRouteData | examPageRouteData
): data is videoPageRouteData => {
  return (data as videoPageRouteData).courseContentId !== undefined;
};
const isExamPageRouteData = (data: BasePageRouteData | examPageRouteData): data is examPageRouteData => {
  return (data as examPageRouteData).examId !== undefined;
};

export const useClassroomNavigate = (): ClassroomNavigate => {
  const navigate = useNavigate();
  const params = useClassroomParams();

  return (urlData, options) => {
    let url = '/classroom';

    if (typeof urlData === 'string') {
      url += '/' + urlData.replace(/^\//, '');
    } else {
      if (urlData.type && urlData.type === 'MEET') {
        url = '/meet';
      }
      const productId = urlData.productId || params.productId;
      const courseId = urlData.courseId || params.courseId;
      url += `/${productId}/${courseId}`;

      if (isVideoPageRouteData(urlData)) {
        url += `/content/${urlData.courseContentId}`;
        if (urlData.query) {
          url += `?${new URLSearchParams(urlData.query as Record<string, string>).toString()}`;
        }
      } else if (isExamPageRouteData(urlData)) {
        url += `/exam/${urlData.examId}`;
      }
    }

    navigate(url, options);
  };
};

export const useResetExamWhenMovedPage = () => {
  const dispatch = useAppDispatch();
  const { courseId, examId } = useClassroomParams();

  useEffect(() => {
    return () => {
      dispatch(classroomExamActions.resetExam());
    };
  }, [courseId, examId]);
};

export const useLoadExamProgress = () => {
  const dispatch = useAppDispatch();
  const { productId, courseId, examId } = useClassroomParams();

  const { mutateAsync } = useMutation(() => getExamProgress(productId, courseId, examId), {
    onSuccess(questionResponse) {
      dispatch(
        classroomExamActions.startExam({
          questions: questionResponse.questions,
          endExamAt: questionResponse.progress.endAt,
        })
      );
    },
  });

  return mutateAsync;
};

export const useSolveQuestion = () => {
  const dispatch = useAppDispatch();
  const { productId, courseId, examId } = useClassroomParams();
  const { questionList, questionAnswers } = useExamState();
  const { solvedQuestion } = classroomExamActions;

  const solveQuestionMutation = useMutation((questionId: number) => {
    const question = questionList.find((question) => question.id === questionId) as ExamQuestion;
    const questionAnswer = questionAnswers[questionId];

    return solveExamQuestion({
      productId,
      courseId,
      examId,
      questionId,
      type: question.type,
      submitAnswer: questionAnswer,
      exampleAnswers: question.type === 'MULTIPLE' ? question.extras.exampleAnswers : undefined,
    });
  });

  return async (questionId: number) => {
    if (!questionAnswers[questionId]) return;

    const { data: questionResult } = await solveQuestionMutation.mutateAsync(questionId);
    dispatch(solvedQuestion(questionResult.score));
  };
};

export const useChangeExamIndex = () => {
  const { questionList, currentQuestion } = useExamState();

  const solveQuestion = useSolveQuestion();

  const dispatch = useAppDispatch();
  const { changeIndex } = classroomExamActions;

  return async (indexToMove: number) => {
    await solveQuestion(currentQuestion.id);

    if (questionList[indexToMove]) {
      dispatch(changeIndex(indexToMove));
    }
  };
};

export const useCompleteExam = () => {
  const dispatch = useAppDispatch();
  const { member } = useCurrentMember();
  const { productId, courseId, examId } = useClassroomParams();
  const { putTotalScore } = useTotalScore(productId, courseId);
  const completeExamMutation = useMutation(() => completeExam(productId, courseId, examId));

  return async () => {
    completeExamMutation
      .mutateAsync()
      .then(() => {
        dispatch(classroomExamActions.completeExam());
        putTotalScore().catch((err) => {
          const error = err as Error;
          logger.error(
            '시험 제출 후 totalScore 업데이트 실패',
            { memberId: member?.id, productId, courseId, examId },
            error
          );
        });
      })
      .catch((err) => {
        const error = err as Error;
        logger.error('시험 제출 실패', { memberId: member?.id, productId, courseId, examId }, error);
      });
  };
};

type CommonUseExamStateResult = {
  questionList: ExamQuestion[];
  currentIndex: number;
  questionAnswers: { [id: number]: string };
  questionScores: { [id: number]: number };
  completedExam: boolean;
  currentQuestion: ExamQuestion;
  setQuestionAnswer: (answer: string) => void;
} & (
  | {
      isExpiredTimeExist: false;
      expireTime: undefined;
    }
  | {
      isExpiredTimeExist: true;
      expireTime: number;
    }
);

export const useExamState = (): CommonUseExamStateResult => {
  const { expireTime, questionList, currentIndex, questionAnswers, questionScores, completedExam } = useAppSelector(
    (state) => ({
      expireTime: state.classroomExam.expireTime,
      questionList: state.classroomExam.questions,
      currentIndex: state.classroomExam.currentIndex as number,
      questionAnswers: state.classroomExam.questionAnswers,
      questionScores: state.classroomExam.questionScores,
      completedExam: state.classroomExam.completedExam,
    })
  );

  const dispatch = useAppDispatch();
  const { setQuestionAnswer } = classroomExamActions;

  return {
    expireTime,
    questionList,
    currentIndex,
    questionAnswers,
    questionScores,
    completedExam,
    isExpiredTimeExist: expireTime !== undefined,
    currentQuestion: questionList[currentIndex],
    setQuestionAnswer(answer: string) {
      dispatch(setQuestionAnswer(answer));
    },
  } as CommonUseExamStateResult;
};

export const useCourseContentTaskList = () => {
  const { productId, courseId, courseContentId } = useClassroomParams();

  const { data: courseContent } = useCourseContent(courseContentId);
  const { data: task } = useTaskData(courseContent?.extras.taskId as number, productId, courseId, courseContentId);

  return task
    ? [{ id: task.exam.id, name: task.exam.name, evaluateState: task.questions[0].extras.evaluateState }]
    : [];
};

export const useClassroomReplaceCourseContentInUrl = () => {
  const location = useLocation();
  const isMeetCourse = /^\/meet\//.test(location.pathname);
  const { courseId, productId, courseContentId, examId } = useClassroomParams();
  const classroomNavigate = useClassroomNavigate();
  const { member } = useCurrentMember();

  useQuery(QUERY_KEYS.VIDEO_INFO({ courseId, productId }), () => getVideoInfo({ courseId, productId }), {
    enabled: !isMeetCourse && !courseContentId && !examId,
    onSuccess: ({ data: { data } }) => {
      if (isMeetCourse) return;
      if (!courseContentId && !examId) {
        classroomNavigate({ courseContentId: data.courseContentId }, { replace: true });
      }
    },
    onError: (err) => {
      const error = err as Error;
      logger.error(
        '비디오정보를 가져오는데 실패하였습니다. 개발실에 문의해주세요.',
        { memberId: member?.id, courseId, productId, courseContentId },
        error
      );
    },
  });
};

export const useCourseContentListByContentIndex = () => {
  const { data: course } = useClassroomCourse();

  const contentIdList: number[] = [];

  course?.extras.contents.forEach((part) => {
    if (part.CHAPTER) {
      part.CHAPTER.forEach((chapter) => {
        chapter.CONTENT.forEach((content) => {
          contentIdList.push(content.courseContentId);
        });
      });
    }
    if (part.CONTENT) {
      part.CONTENT.forEach((content) => {
        contentIdList.push(content.courseContentId);
      });
    }
  });

  return contentIdList;
};
