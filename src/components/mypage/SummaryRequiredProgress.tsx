import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { ArrowRight, BoxShadow, PaginationController, MypageSummaryRequiredProgressCourse } from '@/components';
import { useCourseProgressList } from '@/shared/hooks/mypage';
import { isRequiredCourse } from '@/shared/utils/course';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';

const MypageSummaryRequiredProgressBlock = styled(BoxShadow)`
  margin: 2.4rem 0 0;
  padding: 2.4rem 1.6rem 1.6rem;
  border-radius: 1rem;

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin: 0 0 1.6rem;

    color: var(--legacy-color-gray-900);
  }

  .progress-title {
    margin: 0 0 1.2rem;

    ${legacyTypographyMixin('body1')}
    font-weight: 700;
  }

  .count-displayer {
    ${legacyTypographyMixin('body2')}
  }

  .count {
    font-weight: 700;
    color: var(--color-blue-600);
  }

  .course-list {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    margin: 0 0 1.6rem;
  }

  .link-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  .more-link {
    display: flex;
    align-items: center;
    height: 4rem;
    padding: 0 0.4rem 0 1.6rem;

    ${legacyTypographyMixin('body2')}
    font-weight: 700;
    color: var(--color-blue-600);
  }

  ${media('large')} {
    padding: 2.4rem 1.6rem;

    .course-list {
      gap: 0;
      margin: 0 0 1.2rem;
    }

    .header {
      margin: 0 0 1.2rem;

      .info {
        display: flex;
        align-items: center;
      }

      .progress-title {
        margin: 0 1.2rem 0 0;
      }
    }
  }
`;

const MypageSummaryRequiredProgress = () => {
  const COURSE_PER_PAGE = 3;
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const { data: courseProgress } = useCourseProgressList();
  const a = {
    ongoingCourses: [
      {
        id: 10000,
        state: 'NORMAL',
        type: 'ONLINE',
        name: '올인원 패키지 : C#과 유니티로 배우는 게임개발',
        extras: {
          thumbnail: {
            url: 'https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202111/110220-472/게임형---c-과-유니티로-배우는-게임-개발.jpg',
            name: '게임형 _ C#과 유니티로 배우는 게임 개발.jpg',
          },
          publicName: 'C#과 유니티로 배우는 게임 개발 올인원 패키지 Online test 킹갓언리얼',
          contractEndAt: '2030-12-31 00: 00: 00',
          totalPlayTime: 197441,
          contractBeginAt: '2020-01-21 00:00:00',
          exposedCategory: [
            {
              depth1stId: 10000,
              depth2ndId: 10012,
            },
          ],
          totalCourseContentCount: 177,
        },
        product: {
          id: 10003,
          type: 'ALL',
          state: 'NORMAL',
          name: 'B2B - All Plan',
          extras: {
            isFree: false,
            publicName: 'B2B - All Plan',
            courseEndedAt: '2050-12-31T14:59:59.000Z',
            courseStartedAt: '2023-03-02T15:00:00.000Z',
            originProductId: 10000,
            enrollmentEndedAt: '2050-12-31T14:59:59.000Z',
            enrollmentStartedAt: '2023-03-02T15:00:00.000Z',
          },
        },
        periodPermissions: ['APPLY', 'ONGOING'],
        requiredCourse: {
          id: 11864,
          type: 'REQUIRED_COURSE',
          state: 'NORMAL',
          name: '필수강의',
          member_id: 10718,
          course_id: 10000,
          product_id: 10003,
          extras: {
            points: {
              exam: 0,
              task: 0,
              total: 100,
              progress: 100,
            },
            isProductPoints: true,
            criteriaForCompletion: {
              exam: 0,
              task: 0,
              total: 80,
              progress: 80,
            },
            requiredCourseEndedAt: '2050-12-31T14:59:59.000Z',
            requiredCourseStartedAt: '2023-07-04T02:35:17.974Z',
            isProductCriteriaForCompletion: true,
          },
        },
        enrollment: {
          courseId: 10000,
          memberId: 10718,
          productId: 10003,
          id: 62352,
          state: 'COMPLETED',
          type: 'ENROLLMENT',
          extras: {
            event: 'AUTO',
            totalScore: 1.5,
            courseCompletion: false,
            classroomEnteredAt: '2023-07-31T07:29:06.054Z',
          },
        },
      },
      {
        id: 10001,
        state: 'NORMAL',
        type: 'ONLINE',
        name: '올인원 패키지 : C#과 유니티로 배우는 게임개발',
        extras: {
          thumbnail: {
            url: 'https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202111/110220-472/게임형---c-과-유니티로-배우는-게임-개발.jpg',
            name: '게임형 _ C#과 유니티로 배우는 게임 개발.jpg',
          },
          publicName: 'C#과 유니티로 배우는 게임 개발 올인원 패키지 Online test 킹갓언리얼',
          contractEndAt: '2030-12-31 00: 00: 00',
          totalPlayTime: 197441,
          contractBeginAt: '2020-01-21 00:00:00',
          exposedCategory: [
            {
              depth1stId: 10000,
              depth2ndId: 10012,
            },
          ],
          totalCourseContentCount: 177,
        },
        product: {
          id: 10003,
          type: 'ALL',
          state: 'NORMAL',
          name: 'B2B - All Plan',
          extras: {
            isFree: false,
            publicName: 'B2B - All Plan',
            courseEndedAt: '2050-12-31T14:59:59.000Z',
            courseStartedAt: '2023-03-02T15:00:00.000Z',
            originProductId: 10000,
            enrollmentEndedAt: '2050-12-31T14:59:59.000Z',
            enrollmentStartedAt: '2023-03-02T15:00:00.000Z',
          },
        },
        periodPermissions: ['APPLY', 'ONGOING'],
        requiredCourse: {
          id: 11864,
          type: 'REQUIRED_COURSE',
          state: 'NORMAL',
          name: '필수강의',
          member_id: 10718,
          course_id: 10000,
          product_id: 10003,
          extras: {
            points: {
              exam: 0,
              task: 0,
              total: 100,
              progress: 100,
            },
            isProductPoints: true,
            criteriaForCompletion: {
              exam: 0,
              task: 0,
              total: 80,
              progress: 80,
            },
            requiredCourseEndedAt: '2050-12-31T14:59:59.000Z',
            requiredCourseStartedAt: '2023-07-04T02:35:17.974Z',
            isProductCriteriaForCompletion: true,
          },
        },
        enrollment: {
          courseId: 10000,
          memberId: 10718,
          productId: 10003,
          id: 62352,
          state: 'COMPLETED',
          type: 'ENROLLMENT',
          extras: {
            event: 'AUTO',
            totalScore: 1.5,
            courseCompletion: false,
            classroomEnteredAt: '2023-07-31T07:29:06.054Z',
          },
        },
      },
      {
        id: 10003,
        state: 'NORMAL',
        type: 'ONLINE',
        name: '올인원 패키지 : C#과 유니티로 배우는 게임개발',
        publicName: '올인원 패키지 : C#과 유니티로 배우는 게임개발',
        extras: {
          thumbnail: {
            url: 'https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202111/110220-472/게임형---c-과-유니티로-배우는-게임-개발.jpg',
            name: '게임형 _ C#과 유니티로 배우는 게임 개발.jpg',
          },
          publicName: 'C#과 유니티로 배우는 게임 개발 올인원 패키지 Online test 킹갓언리얼',
          contractEndAt: '2030-12-31 00: 00: 00',
          totalPlayTime: 197441,
          contractBeginAt: '2020-01-21 00:00:00',
          exposedCategory: [
            {
              depth1stId: 10000,
              depth2ndId: 10012,
            },
          ],
          totalCourseContentCount: 177,
        },
        product: {
          id: 10003,
          type: 'ALL',
          state: 'NORMAL',
          name: 'B2B - All Plan',
          extras: {
            isFree: false,
            publicName: '2022년 1월 직책자 과정',
            courseEndedAt: '2050-12-31T14:59:59.000Z',
            courseStartedAt: '2023-03-02T15:00:00.000Z',
            originProductId: 10000,
            enrollmentEndedAt: '2050-12-31T14:59:59.000Z',
            enrollmentStartedAt: '2023-03-02T15:00:00.000Z',
          },
        },
        periodPermissions: ['APPLY', 'ONGOING'],
        requiredCourse: {
          id: 11864,
          type: 'REQUIRED_COURSE',
          state: 'NORMAL',
          name: '필수강의',
          member_id: 10718,
          course_id: 10000,
          product_id: 10003,
          extras: {
            points: {
              exam: 10,
              task: 10,
              total: 100,
              progress: 100,
            },
            isProductPoints: true,
            criteriaForCompletion: {
              exam: 10,
              task: 10,
              total: 80,
              progress: 80,
            },
            requiredCourseEndedAt: '2050-12-31T14:59:59.000Z',
            requiredCourseStartedAt: '2023-07-04T02:35:17.974Z',
            isProductCriteriaForCompletion: true,
          },
        },
        enrollment: {
          courseId: 10000,
          memberId: 10718,
          productId: 10003,
          id: 62352,
          state: 'COMPLETED',
          type: 'ENROLLMENT',
          extras: {
            event: 'AUTO',
            totalScore: 1.5,
            progressRate: 80,
            courseCompletion: true,
            classroomEnteredAt: '2023-07-31T07:29:06.054Z',
          },
        },
      },
      {
        id: 10005,
        state: 'NORMAL',
        type: 'ONLINE',
        name: '올인원 패키지 : C#과 유니티로 배우는 게임개발',
        extras: {
          thumbnail: {
            url: 'https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202111/110220-472/게임형---c-과-유니티로-배우는-게임-개발.jpg',
            name: '게임형 _ C#과 유니티로 배우는 게임 개발.jpg',
          },
          publicName: 'C#과 유니티로 배우는 게임 개발 올인원 패키지 Online test 킹갓언리얼',
          contractEndAt: '2030-12-31 00: 00: 00',
          totalPlayTime: 197441,
          contractBeginAt: '2020-01-21 00:00:00',
          exposedCategory: [
            {
              depth1stId: 10000,
              depth2ndId: 10012,
            },
          ],
          totalCourseContentCount: 177,
        },
        product: {
          id: 10003,
          type: 'ALL',
          state: 'NORMAL',
          publicName: 'Hello',
          name: 'B2B - All Plan',
          extras: {
            isFree: false,
            publicName: 'B2B - All Plan',
            courseEndedAt: '2050-12-31T14:59:59.000Z',
            courseStartedAt: '2023-03-02T15:00:00.000Z',
            originProductId: 10000,
            enrollmentEndedAt: '2050-12-31T14:59:59.000Z',
            enrollmentStartedAt: '2023-03-02T15:00:00.000Z',
          },
        },
        periodPermissions: ['APPLY', 'ONGOING'],
        requiredCourse: {
          id: 11864,
          type: 'REQUIRED_COURSE',
          state: 'NORMAL',
          name: '필수강의',
          member_id: 10718,
          course_id: 10000,
          product_id: 10003,
          extras: {
            points: {
              exam: 10,
              task: 10,
              total: 100,
              progress: 100,
            },
            isProductPoints: true,
            criteriaForCompletion: {
              exam: 10,
              task: 10,
              total: 80,
              progress: 80,
            },
            requiredCourseEndedAt: '2050-12-31T14:59:59.000Z',
            requiredCourseStartedAt: '2023-07-04T02:35:17.974Z',
            isProductCriteriaForCompletion: true,
          },
        },
        enrollment: {
          courseId: 10000,
          memberId: 10718,
          productId: 10003,
          id: 62352,
          state: 'COMPLETED',
          type: 'ENROLLMENT',
          extras: {
            event: 'AUTO',
            totalScore: 1.5,
            progressRate: 80,
            courseCompletion: true,
            classroomEnteredAt: '2023-07-31T07:29:06.054Z',
          },
        },
      },
    ],
  } as any;

  courseProgress.ongoingCourses = a.ongoingCourses;
  const requiredCourseList = courseProgress.ongoingCourses.filter(isRequiredCourse);
  const currentPageCourseList = requiredCourseList.slice(
    currentPageIndex * COURSE_PER_PAGE,
    (currentPageIndex + 1) * COURSE_PER_PAGE
  );
  const lastPageIndex = requiredCourseList.length ? Math.ceil(requiredCourseList.length / COURSE_PER_PAGE) - 1 : 0;
  if (!requiredCourseList.length) return null;

  return (
    <MypageSummaryRequiredProgressBlock>
      <div className="header">
        <div className="info">
          <div className="progress-title">필수강의 진도현황</div>
          <div className="count-displayer">
            <span className="count">{requiredCourseList.length}개의</span> 필수강의가 있습니다.
          </div>
        </div>
        <PaginationController
          onClickPrevious={() => setCurrentPageIndex(currentPageIndex - 1)}
          onClickNext={() => setCurrentPageIndex(currentPageIndex + 1)}
          disabledPrevious={currentPageIndex === 0}
          disabledNext={currentPageIndex === lastPageIndex}
        />
      </div>
      <ul className="course-list">
        {currentPageCourseList.map((courseProgress) => (
          <MypageSummaryRequiredProgressCourse
            key={`${courseProgress.product.id}:${courseProgress.id}`}
            courseProgress={courseProgress}
          />
        ))}
      </ul>
      <div className="link-wrapper">
        <Link to="/mypage/course" className="more-link">
          수강현황 보기
          <ArrowRight className="arrow" />
        </Link>
      </div>
    </MypageSummaryRequiredProgressBlock>
  );
};

export default MypageSummaryRequiredProgress;
