import styled from '@emotion/styled';
import React from 'react';

import LearningProgress from './LearningProgress';

import type { PointCategory } from '@/types/common.interface';
import type { CourseScore } from '@/types/course.interface';

import { Badge } from '@/components';
import { useCurrentMemberGroup, useExamTaskList } from '@/shared/hooks';
import { useCourseDetail, useCourseDetailParams, useCourseDetailState } from '@/shared/hooks/course-detail';
import { WHOLE_CONTENT_LIST_LIMIT } from '@/shared/policy';
import { dateFormat } from '@/shared/utils/date';
import { getExamTaskCompletionLength } from '@/shared/utils/evaluation-score';
import { homeMedia, typographyMixin } from '@/styles/mixins';

const CourseDetailScoreStatusBlock = styled.section<{ periodColor: string }>`
  .status {
    margin-bottom: 3.2rem;
    padding: 2rem 0;

    ${homeMedia('large', 'xlarge')} {
      padding: 2rem 2.4rem;

      &.required {
        border: 0.1rem solid var(--color-gray-100);
        border-radius: 0.6rem;
      }
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
      padding-bottom: 1.2rem;
      border-bottom: 0.1rem solid var(--color-gray-100);

      .title {
        display: flex;
        gap: 1.2rem;
        ${typographyMixin('p1', 'bold')};
      }

      .period {
        color: ${({ periodColor }) => {
          if (periodColor === 'gray') {
            return 'var(--color-gray-600)';
          } else if (periodColor === 'red') {
            return 'var(--color-semantic-red)';
          } else {
            return 'var(--color-primary-700)';
          }
        }};
        ${typographyMixin('p3')};
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 1.6rem;
    }
  }
`;

interface ScoreStatusContentProps {
  criteriaForCompletion: PointCategory;
  currentMemberScore: CourseScore;
}

const ScoreStatusContent = ({ criteriaForCompletion, currentMemberScore }: ScoreStatusContentProps) => {
  const { productId, courseId } = useCourseDetailParams();
  const { data: examTaskData } = useExamTaskList({ productId, courseId, limit: WHOLE_CONTENT_LIST_LIMIT });

  const { exam, task } = getExamTaskCompletionLength(examTaskData?.data || []);

  const { data: memberGroupData } = useCurrentMemberGroup();

  const { isExpiredCourseEndedAt, isWeekBeforeCourseEndedAt, isEnrollmentApplying } = useCourseDetailState();
  return (
    <>
      {criteriaForCompletion.progress > 0 && (
        <LearningProgress
          title="학습시간"
          label="진도율"
          criteriaForCompletion={criteriaForCompletion.progress}
          currentMemberScore={currentMemberScore.learningTime}
          isEnrollmentApplying={isEnrollmentApplying}
          isWeekBeforeCourseEndedAt={isWeekBeforeCourseEndedAt}
          isExpiredCourseEndedAt={isExpiredCourseEndedAt}
          usePercentUnit
        />
      )}
      {(memberGroupData?.extras.isResultExposed ?? true) && criteriaForCompletion.exam > 0 && (
        <LearningProgress
          title="시험"
          label="점수"
          criteriaForCompletion={criteriaForCompletion.exam}
          currentMemberScore={currentMemberScore.examScore}
          isEnrollmentApplying={isEnrollmentApplying}
          isWeekBeforeCourseEndedAt={isWeekBeforeCourseEndedAt}
          isExpiredCourseEndedAt={isExpiredCourseEndedAt}
          examTaskTotalLength={exam.totalLength}
          examTaskCompletionLength={exam.completionLength}
          isExam
        />
      )}
      {criteriaForCompletion.task > 0 && (
        <LearningProgress
          title="과제"
          label="점수"
          criteriaForCompletion={criteriaForCompletion.task}
          currentMemberScore={currentMemberScore.taskScore}
          isEnrollmentApplying={isEnrollmentApplying}
          isWeekBeforeCourseEndedAt={isWeekBeforeCourseEndedAt}
          isExpiredCourseEndedAt={isExpiredCourseEndedAt}
          examTaskTotalLength={task.totalLength}
          examTaskCompletionLength={task.completionLength}
        />
      )}
    </>
  );
};

const CourseDetailScoreStatus = () => {
  let { data: courseData } = useCourseDetail();
  const { isExpiredCourseEndedAt, isWeekBeforeCourseEndedAt } = useCourseDetailState();
  const a = {
    data: {
      courseDetail: {
        id: 10000,
        state: 'NORMAL',
        type: 'ONLINE',
        name: '올인원 패키지 : C#과 유니티로 배우는 게임개발',
        extras: {
          site: 'FASTCAMPUS',
          teachers: [],
          thumbnail: {
            url: 'https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202111/110220-472/게임형---c-과-유니티로-배우는-게임-개발.jpg',
            name: '게임형 _ C#과 유니티로 배우는 게임 개발.jpg',
          },
          fcCourseId: 202073,
          publicName: 'C#과 유니티로 배우는 게임 개발 올인원 패키지 Online test 킹갓언리얼',
          lectureInfo:
            '1. 수업 목표 :\n- 게임 개발에 대한 기초 지식을 습득하고, 배운 지식을 바탕으로 문제를 해결할 수 있는 사고능력을 기릅니다.\n- 게임 개발자 취업에 필요한 모든 과정을 하나의 강의로 정복합니다.\n- 프로그래밍 기초는 탄탄히, 게임 엔진 실무를 기반으로 하는 포트폴리오까지 준비할 수 있습니다.\n\n2. 강의요약 :\n- 게임 회사 코딩테스트 대비부터 포트폴리오까지 한 번에 수강할 수 있습니다.\n- 현직 게임 개발자가 게임 개발자 취업의 A to Z를 직접 강의합니다.\n\n3. 특이사항 : 없음',
          teacherInfo:
            '한창민 강사\n[주요 경력사항]\n- 現 M사 – 프로그래밍 팀장 겸 PM\n- 前 위메이드 – MMORPG 게임 선임 연구원\n- 前 바른손 – 모바일 게임 개발 (보석팡, 아쿠아빌리지 for Kakao)\n- 前 넷이즈(중국) – SNS 게임 프로그래밍 팀장\n\n김민백 강사\n[주요 경력사항]\n- 現 ’긱블’메이커 / PD\n- 現 ‘민바크의 게임 제작’ 유튜브 채널 운영 중\n\n배병도 강사\n[주요 경력사항]\n- 前 스마일게이트스토브 - 차장(C# / C++ 라이브러리 제작)\n- 前 4:33 (Lost Kingdom 해외 퍼블리싱 지원, 활2 최적화 작업 지원)\n- 前 iBH Soft - 과장(Running M 게임 개발)\n- 前 스노우 파이프 - 부장(사쿠라대전 클라이언트 개발 총괄)\n- 前 ANB Soft - 과장(애니머스 온라인 클라이언트 개발 총괄, 드래곤 키우기 클라이언트 개발 총괄)\n- 前 CJIG(넷마블계열사) - 대리\n\n손정현 강사\n[주요 경력사항]\n- 現 인바디 PC어플리케이션 개발(C# 개발)',
          isLastCourse: true,
          realContents: [],
          scheduleInfo: '전체 오픈',
          contractEndAt: '2030-12-31 00: 00: 00',
          totalPlayTime: 197441,
          contractBeginAt: '2020-01-21 00:00:00',
          descriptionInfo: 'C# 프로그래밍부터 게임 물리와 수학까지 모두 정복!',
          exposedCategory: [
            {
              depth1stId: 10000,
              depth2ndId: 10012,
            },
          ],
          headTeacherName: '',
          isUseCodeRunner: true,
          managedCategory: {
            depth1stId: 10075,
            depth2ndId: 10087,
          },
          priorCourseName: '',
          connectedProductIds: [
            10001, 10002, 10003, 10004, 10012, 10014, 10015, 10017, 10029, 10035, 10038, 10039, 10040, 10041, 10044,
            10045, 10048, 10049, 10084, 10099, 10100, 10111, 10112, 10119, 10120, 10127, 10129, 10132, 10134, 10135,
            10136, 10144, 10166, 10169, 10172, 10176, 10178, 10191, 10193, 10194, 10195, 10196, 10197, 10198, 10199,
            10200, 10201, 10202, 10204, 10212, 10213, 10214, 10216, 10217, 10221, 10224, 10225, 10226, 10227, 10228,
            10229, 10230, 10231, 10232, 10233, 10234, 10235, 10236, 10237, 10257, 10319, 10320, 10322, 10330, 10331,
            10332, 10334, 10723, 10731, 10734, 10736, 10741, 10742, 10743, 10745, 10746, 10747, 10748,
          ],
          totalCourseContentCount: 177,
          contents: [],
        },
        product: {
          id: 10746,
          type: 'ALL',
          state: 'NORMAL',
          name: '주술회전상품2',
          extras: {
            isFree: false,
            points: {
              exam: 25,
              task: 15,
              total: 100,
              progress: 50,
            },
            creatorId: 10000,
            round: 0,
            updaterId: 10000,
            customerId: 10096,
            publicName: '주술회전상품2',
            requesterId: 10000,
            totalAmount: 10000,
            cancelAmount: 5,
            remainAmount: 9994,
            courseEndedAt: '2024-10-31T14:59:59.000Z',
            memberGroupId: 10085,
            courseStartedAt: '2023-08-30T15:00:00.000Z',
            isAutoEnrollment: false,
            registeredAmount: 1,
            enrollmentEndedAt: '2024-06-30T14:59:59.000Z',
            isEnrollmentCancel: false,
            isQnaBoardExposure: true,
            enrollmentStartedAt: '2023-08-30T15:00:00.000Z',
            isImmediateApproval: true,
            criteriaForCompletion: {
              exam: 0,
              task: 0,
              total: 50,
              progress: 50,
            },
            enrollmentCourseNumberLimit: 10000,
          },
        },
        periodPermissions: ['APPLY', 'ONGOING'],
        requiredCourse: {
          id: 11910,
          type: 'REQUIRED_COURSE',
          state: 'COMPLETED',
          name: '필수강의1',
          member_id: 12625,
          course_id: 10000,
          product_id: 10746,
          extras: {
            points: {
              exam: 35,
              task: 15,
              total: 100,
              progress: 100,
            },
            isProductPoints: false,
            criteriaForCompletion: {
              exam: 80,
              task: 80,
              total: 80,
              progress: 40,
            },
            requiredCourseEndedAt: '2023-09-30T14:59:59.000Z',
            requiredCourseStartedAt: '2023-08-31T07:55:56.000Z',
            isProductCriteriaForCompletion: true,
          },
        },
        enrollment: {
          courseId: 10000,
          memberId: 12625,
          productId: 10746,
          id: 68578,
          state: 'COMPLETED',
          type: 'ENROLLMENT',
          extras: {
            event: 'AUTO',
            totalScore: 1.5,
            progressRate: 80,
            courseCompletion: false,
            classroomEnteredAt: '2023-07-31T07:29:06.054Z',
          },
        },
      },
      notices: [
        {
          id: 13,
          type: 'NOTICE',
          name: '공지공지',
          state: 'NORMAL',
          createdAt: '2023-09-02T03:56:18.000Z',
          updatedAt: '2023-09-02T03:56:18.000Z',
          extras: {
            priority: 99,
            content: '본문본문',
            tags: 'LXP_COURSE',
            exposedStartedAt: '2023-10-02T14:59:59.000Z',
            exposedEndedAt: '2023-09-01T15:00:00.000Z',
          },
        },
      ],
      courseScore: {
        learningTime: 80,
        examScore: 40,
        taskScore: 20,
        learningProgress: 20,
        exchangeExamScore: 20,
        exchangeTaskScore: 30,
        total: 100,
        courseCompletion: false,
      },
      requiredCourseScore: {
        learningTime: 40,
        examScore: 34,
        taskScore: 80,
        learningProgress: 70,
        exchangeExamScore: 30,
        exchangeTaskScore: 0,
        total: 100,
        courseCompletion: false,
      },
      products: [
        {
          id: 10745,
          type: 'ALL',
          state: 'NORMAL',
          name: '주술회전상품1',
          description: null,
          extras: {
            isFree: false,
            points: {
              exam: 30,
              task: 15,
              total: 100,
              progress: 40,
            },
            creatorId: 10000,
            round: 0,
            updaterId: 10000,
            customerId: 10096,
            publicName: '주술회전상품1',
            requesterId: 10000,
            totalAmount: 10000,
            cancelAmount: 0,
            remainAmount: 9999,
            courseEndedAt: '2024-11-30T14:59:59.000Z',
            memberGroupId: 10085,
            courseStartedAt: '2023-08-29T15:00:00.000Z',
            isAutoEnrollment: false,
            registeredAmount: 1,
            enrollmentEndedAt: '2024-08-31T14:59:59.000Z',
            isEnrollmentCancel: true,
            enrollmentStartedAt: '2023-08-29T15:00:00.000Z',
            isImmediateApproval: false,
            criteriaForCompletion: {
              exam: 0,
              task: 0,
              total: 30,
              progress: 40,
            },
            enrollmentCourseNumberLimit: 10000,
          },
          created_at: '2023-08-30T13:55:33.308Z',
        },
      ],
    },
  } as any;
  courseData = a.data;
  if (!courseData) return;

  const courseDetail = courseData.courseDetail;
  const requiredCourse = courseData.courseDetail.requiredCourse;
  const courseScore = courseData.courseScore;
  const requiredCourseScore = courseData.requiredCourseScore;

  const getPeriodColor = () => {
    if (isExpiredCourseEndedAt) return 'gray';
    const isCourseCompletion = requiredCourse ? requiredCourseScore.courseCompletion : courseScore.courseCompletion;
    if (isWeekBeforeCourseEndedAt && !isCourseCompletion) return 'red';
    return 'primary';
  };

  return (
    <CourseDetailScoreStatusBlock periodColor={getPeriodColor()}>
      {requiredCourse && (
        <div className="status required">
          <header>
            <span className="title">
              필수강의
              <Badge
                theme={requiredCourseScore.courseCompletion ? 'lightgreen' : 'gray'}
                size="medium"
                colorScale={500}
              >
                {requiredCourseScore.courseCompletion ? '수료' : '수료 전'}
              </Badge>
            </span>
            <span className="period">
              {dateFormat(requiredCourse.extras.requiredCourseEndedAt, 'YYYY년 MM월 DD일')} 마감
            </span>
          </header>
          <div className="content">
            <ScoreStatusContent
              criteriaForCompletion={requiredCourse.extras.criteriaForCompletion}
              currentMemberScore={requiredCourseScore}
            />
          </div>
        </div>
      )}
      <div className="status">
        <header>
          <span className="title">
            일반강의
            <Badge theme={courseScore.courseCompletion ? 'lightgreen' : 'gray'} size="medium" colorScale={500}>
              {courseScore.courseCompletion ? '수료' : '수료 전'}
            </Badge>
          </span>
          <span className="period">
            {dateFormat(courseDetail.product.extras.courseEndedAt, 'YYYY년 MM월 DD일')} 마감
          </span>
        </header>
        <div className="content">
          <ScoreStatusContent
            criteriaForCompletion={courseDetail.product.extras.criteriaForCompletion}
            currentMemberScore={courseScore}
          />
        </div>
      </div>
    </CourseDetailScoreStatusBlock>
  );
};

export default CourseDetailScoreStatus;
