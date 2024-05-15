import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import type { ExamTaskMeta } from '@/types/exam.interface';

import { TaskContent, ArrowRight, Badge, EmptyNoteBlue, BookIcon, Modal } from '@/components';
import { useCurrentMemberGroup, useExamTaskList, useModal, useViewport } from '@/shared/hooks';
import { useClassroomNavigate } from '@/shared/hooks/classroom';
import { useCourseDetailParams } from '@/shared/hooks/course-detail';
import { useVerificationEnrollment } from '@/shared/hooks/enrollment';
import { PAGINATAION_COUNT_LIMIT_PER_PAGE, QUERY_KEYS } from '@/shared/policy';
import { dateFormat } from '@/shared/utils/date';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface CourseDetailExamTaskProps {
  isCompletedEnrollment?: boolean;
  isOngoingCourse: boolean;
}

const CourseDetailExamTaskBlock = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 1.2rem 0;

  .empty-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4.8rem;
    padding-bottom: 4.8rem;
    ${legacyTypographyMixin('body2')}
    font-weight: 700;

    svg {
      margin-bottom: 1.4rem;
    }
  }
`;

const ExamTaskItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  cursor: pointer;

  .badge {
    display: flex;
    gap: 0.4rem;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${legacyTypographyMixin('body2')}
    font-weight: 700;
  }

  .course-content-name {
    display: flex;
    gap: 0.4rem;
    align-items: center;

    ${legacyTypographyMixin('caption')}
    color: var(--legacy-color-gray-600);
  }

  .info {
    display: flex;
    gap: 1.2rem;
    ${legacyTypographyMixin('caption')}
    color: var(--legacy-color-gray-500);

    &-column {
      display: flex;

      &-value {
        margin-left: 0.4rem;
        font-weight: 700;
      }
    }
  }
`;

const getProgressText = ({ extras: { category, progressStatus } }: ExamTaskMeta) => {
  if (category === 'TASK') return progressStatus === 'COMPLETE' ? '제출 완료' : '미 제출';

  if (progressStatus === 'COMPLETE') return '응시 완료';
  if (progressStatus === 'EXPIRED') return '만료됨';
  if (progressStatus === 'ONGOING') return '진행중';
  return '미 응시';
};

const CourseDetailExamTask = ({ isCompletedEnrollment, isOngoingCourse }: CourseDetailExamTaskProps) => {
  const [searchParams] = useSearchParams();
  const offset = Number(searchParams.get('offset'));
  const { productId, courseId } = useCourseDetailParams();
  const { data: examTaskData } = useExamTaskList({ productId, courseId, offset });
  // console.log(examTaskData);
  // const response = {
  //   data: [
  //     {
  //       id: 5992,
  //       name: '[마무리 시험] 데이터 분석, 어떻게 하는거죠 - 02. 데이터 수집하기',
  //       extras: {
  //         earnedScore: 45,
  //         totalScore: 60,
  //         canSolvedCount: 1,
  //         category: 'SELECTION',
  //         partId: null,
  //         chapterId: null,
  //         timeLimit: 0,
  //         courseId: 10000,
  //         progressStatus: 'COMPLETE',
  //         evaluationStatus: null,
  //         completedAt: '2022-04-25T03:56:18.000Z',
  //       },
  //     },
  //     {
  //       id: 5993,
  //       name: '[시험] 04. 엘리베이터의 알고리즘을 살펴보자',
  //       extras: {
  //         earnedScore: null,
  //         totalScore: 4,
  //         canSolvedCount: 1,
  //         category: 'SELECTION',
  //         partId: null,
  //         chapterId: null,
  //         timeLimit: 0,
  //         courseId: 10000,
  //         progressStatus: null,
  //         evaluationStatus: null,
  //       },
  //     },
  //     {
  //       id: 5994,
  //       name: '[시험] Part 01. 프로그래밍과 친해지자',
  //       extras: {
  //         earnedScore: 45,
  //         totalScore: 60,
  //         canSolvedCount: 1,
  //         category: 'SELECTION',
  //         partId: null,
  //         chapterId: null,
  //         timeLimit: 0,
  //         courseId: 10000,
  //         progressStatus: 'COMPLETE',
  //         evaluationStatus: null,
  //         completedAt: '2022-06-05T03:56:18.000Z',
  //       },
  //     },
  //     {
  //       id: 5997,
  //       name: '자바스크립트 엔진의 동작원리, 콜스택, web api의 역할 분담 및 비동기, 동기 방식의 이해 마무리 과제',
  //       extras: {
  //         earnedScore: null,
  //         totalScore: 45,
  //         canSolvedCount: 1,
  //         category: 'TASK',
  //         partId: null,
  //         chapterId: null,
  //         timeLimit: 0,
  //         courseId: 10000,
  //         progressStatus: 'COMPLETE',
  //         courseContentName: '02. 자바스크립트 엔진의 동작원리, 콜스택, web api의 ...',
  //         evaluationStatus: null,
  //         completedAt: '2022-04-25T03:56:18.000Z',
  //       },
  //     },
  //     {
  //       id: 5997,
  //       name: '자바스크립트 엔진의 동작원리, 콜스택, web api의 역할 분담 및 비동기, 동기 방식의 이해 마무리 과제',
  //       extras: {
  //         earnedScore: null,
  //         totalScore: 4,
  //         canSolvedCount: 1,
  //         category: 'SELECTION',
  //         partId: null,
  //         chapterId: null,
  //         timeLimit: 0,
  //         courseId: 10000,
  //         courseContentName: '3-3. 디자인툴 춘추전국시대, 무엇을 어떻게 배워서 내 것...',
  //         progressStatus: null,
  //         evaluationStatus: null,
  //         completedAt: '',
  //       },
  //     },
  //     {
  //       id: 5999,
  //       name: '변수의 종류',
  //       extras: {
  //         earnedScore: null,
  //         totalScore: 4,
  //         canSolvedCount: 1,
  //         category: 'TASK',
  //         partId: null,
  //         chapterId: null,
  //         timeLimit: 0,
  //         courseId: 10000,
  //         courseContentName: '05. 변수의 이해',
  //         progressStatus: 'COMPLETE',
  //         evaluationStatus: null,
  //         completedAt: '2022-04-25T03:56:18.000Z',
  //       },
  //     },
  //   ],
  //   meta: {
  //     total: {
  //       count: 3,
  //     },
  //   },
  // } as any;
  // if (examTaskData) {
  //   examTaskData = response;
  // }
  // console.log(response);
  const { openModal } = useModal();
  const navigate = useNavigate();
  const classroomNavigate = useClassroomNavigate();
  const { isLargeViewport } = useViewport();
  const { verification } = useVerificationEnrollment(productId, courseId);
  const { data: memberGroupData } = useCurrentMemberGroup();

  const [isOpenRequireDesktopPopup, setOpenRequireDesktopPopup] = useState(false);

  if (!examTaskData) return;

  const navigateExamTask = async (examTask: ExamTaskMeta) => {
    if (!isCompletedEnrollment) return alert('승인된 강의에 대해서만 시험/과제 내용을 확인할 수 있습니다.');
    if (!isOngoingCourse) return alert('시험/과제 가능한 기간이 아닙니다. 학습가능기간에만 가능합니다.');

    try {
      await verification();
    } catch (error) {
      alert('승인된 강의에 대해서만 시험/과제 내용을 확인할 수 있습니다.');
      return;
    }

    if (examTask.extras.category === 'TASK') {
      if (examTask.extras.progressStatus === 'COMPLETE') {
        if (!isLargeViewport) {
          setOpenRequireDesktopPopup(true);
          return;
        }

        navigate(`/task/${examTask.id}/${productId}/${courseId}/${examTask.extras.courseContentId}`);
        return;
      }
      openModal({
        title: '과제',
        size: 'medium',
        hasCloseButton: true,
        hasContentHr: true,
        fullScreen: true,
        content: (
          <TaskContent
            taskId={examTask.id}
            productId={productId}
            courseId={courseId}
            courseContentId={examTask.extras.courseContentId as number}
            queryKeyToReload={QUERY_KEYS.EXAM_TASK_LIST(productId, courseId, offset, PAGINATAION_COUNT_LIMIT_PER_PAGE)}
          />
        ),
        confirmButtonText: '저장',
      });
    }
    if (examTask.extras.category === 'SELECTION') {
      if (examTask.extras.progressStatus && ['COMPLETE', 'EXPIRED'].includes(examTask.extras.progressStatus)) {
        if (!isLargeViewport) {
          setOpenRequireDesktopPopup(true);
          return;
        }

        navigate(`/exam-result/${productId}/${courseId}/${examTask.id}`);
        return;
      }

      classroomNavigate({ productId, courseId, examId: examTask.id });
    }
  };

  return (
    <>
      <CourseDetailExamTaskBlock>
        {examTaskData.data.map((examTask) => {
          const earnedScore = examTask.extras.earnedScore ?? 0;
          const convertedEarnedScore = examTask.extras.totalScore
            ? (earnedScore as number) * (100 / examTask.extras.totalScore)
            : 0;
          const componentKey =
            examTask.extras.category === 'SELECTION'
              ? examTask.id
              : `${examTask.id}/${examTask.extras.courseContentId}`;

          return (
            <ExamTaskItem key={componentKey} onClick={() => navigateExamTask(examTask)}>
              <div className="badge">
                <Badge theme="lightblue">{examTask.extras.category === 'SELECTION' ? '시험' : '과제'}</Badge>
                <Badge
                  theme={examTask.extras.progressStatus === 'COMPLETE' ? 'lightgreen' : 'gray'}
                  colorScale={400}
                  bgColorScale={50}
                >
                  {getProgressText(examTask)}
                </Badge>
                {examTask.extras.progressStatus && ['COMPLETE', 'EXPIRED'].includes(examTask.extras.progressStatus) && (
                  <Badge
                    theme={examTask.extras.evaluationStatus === 'COMPLETE' ? 'lightgreen' : 'gray'}
                    colorScale={400}
                    bgColorScale={50}
                  >
                    {getProgressText(examTask)}
                  </Badge>
                )}
              </div>
              <div className="title">
                {examTask.name}
                <ArrowRight />
              </div>
              {examTask.extras.category === 'TASK' && (
                <div className="course-content-name">
                  <BookIcon />
                  {examTask.extras.courseContentName}
                </div>
              )}
              <div className="info">
                <div className="info-column">
                  응시/제출일
                  <span className="info-column-value">
                    {examTask.extras.completedAt ? dateFormat(examTask.extras.completedAt) : '-'}
                  </span>
                </div>
                {((memberGroupData?.extras.isResultExposed ?? true) || examTask.extras.category === 'TASK') && (
                  <div className="info-column">
                    점수(환산){' '}
                    <span className="info-column-value">
                      {examTask.extras.completedAt
                        ? `${earnedScore.toFixed(1)}점 (${convertedEarnedScore.toFixed(1)}점)`
                        : '-'}
                    </span>
                  </div>
                )}
              </div>
            </ExamTaskItem>
          );
        })}
        {examTaskData.data.length === 0 && (
          <div className="empty-list">
            <EmptyNoteBlue />
            등록된 시험/과제가 없습니다.
          </div>
        )}
        {isOpenRequireDesktopPopup && (
          <Modal
            title="알림"
            content="시험 및 과제결과는 PC환경에서 확인해주세요."
            onConfirm={() => setOpenRequireDesktopPopup(false)}
            onCloseModal={() => setOpenRequireDesktopPopup(false)}
          />
        )}
      </CourseDetailExamTaskBlock>
    </>
  );
};

export default CourseDetailExamTask;
