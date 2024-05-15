import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Banner from './Banner';
import HomeSide from './HomeSide';
import NoticeTop from './NoticeTop';
import RecentCourseList from './RecentCourseList';
import RequiredCourseList from './RequiredCourseList';
import UserCustomCourseList from './UserCustomCourseList';

import type { HomeContent } from '@/types/homeContent';

import { Curation, RecommendCourseCard } from '@/components';
import withSuspense from '@/shared/hocs/withSuspense';
import { useViewport } from '@/shared/hooks';
import { useHomeQueries } from '@/shared/hooks/home';
import { SUSPENSE_LOADING_SPINNER_CLASS } from '@/shared/policy';
import { homeMedia } from '@/styles/mixins';

const HomeBlock = styled.section`
  width: 100%;
  margin: 0 auto;

  .home-content {
    padding-bottom: 3.2rem;
  }

  ${homeMedia('medium', 'small')} {
    margin-bottom: 3.2rem;
  }

  ${homeMedia('large')} {
    width: 96rem;

    .home-content {
      padding-bottom: 4rem;
    }
  }

  ${homeMedia('xlarge')} {
    display: grid;
    grid-template-columns: 96rem 1fr;
    width: 128rem;

    .home-content {
      width: 96rem;
      padding-right: var(--home-content-right-padding);
      padding-bottom: 8rem;
    }
  }
`;

const ExhibitionCard = styled.img`
  position: relative;
  top: 0;
  width: 27.6rem;
  height: 36.8rem;
  margin-top: 1.2rem;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: top 0.15s ease-in-out;

  :hover {
    top: -0.8rem;
  }
`;

const StudyGuideCard = styled.img`
  position: relative;
  top: 0;
  width: 16rem;
  height: 16rem;
  margin-top: 1.2rem;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: top 0.15s ease-in-out;

  :hover {
    top: -0.8rem;
  }

  ${homeMedia('small', 'medium')} {
    width: 16rem;
    height: 16rem;
  }
`;

const HomeMainLayoutFallback = styled.div`
  display: flex;
  align-items: center;
  height: 30rem;

  .${SUSPENSE_LOADING_SPINNER_CLASS} {
    width: 100%;
    height: 9.2rem;
  }

  ${homeMedia('large', 'xlarge')} {
    height: 32.4rem;
    margin: 2rem 0;
  }
`;

const HomeMainLayout = withSuspense(() => {
  const navigate = useNavigate();
  const { isSmallViewport, isMediumViewport, isXLargeViewport } = useViewport('home');

  const [{ data: curation }, { data: homeContents }] = useHomeQueries();
  const a = {
    data: {
      recentCourses: [
        {
          id: 10002,
          state: 'NORMAL',
          type: 'ONLINE',
          name: '올인원 패키지 : 세계 3등에게 배우는 실무 밀착 데이터 시각화',
          extras: {
            thumbnail: {
              url: 'https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202210/041304-539/bridge-image.webp',
              name: 'bridge_image.webp',
            },
            publicName: '세계 3등에게 배우는 실무 밀착 데이터 시각화',
            contractEndAt: '2023-10-25 00:00:00',
            totalPlayTime: 54127,
            contractBeginAt: '2021-10-26 00:00:00',
            exposedCategory: [
              {
                depth1stId: 10001,
                depth2ndId: 10023,
              },
            ],
            totalCourseContentCount: 111,
          },
          product: {
            id: 10130,
            type: 'ALL',
            state: 'NORMAL',
            name: 'jgchoi product',
            extras: {
              publicName: 'jgchoi product',
              courseEndedAt: '2026-04-23T14:59:59.000Z',
              courseStartedAt: '2023-04-24T15:00:00.000Z',
              enrollmentEndedAt: '2026-04-15T14:59:59.000Z',
              enrollmentStartedAt: '2023-04-24T15:00:00.000Z',
            },
          },
          periodPermissions: ['APPLY', 'ONGOING'],
          enrollment: {
            courseId: 10002,
            memberId: 11085,
            productId: 10130,
            id: 60889,
            state: 'COMPLETED',
            type: 'ENROLLMENT',
            extras: {
              event: 'AUTO',
              totalScore: 0,
              courseCompletion: false,
              classroomEnteredAt: '2023-04-25T08:17:57.770Z',
            },
          },
        },
        {
          id: 10361,
          state: 'NORMAL',
          type: 'ONLINE',
          name: 'The RED : 프론트엔드 개발자 김태곤',
          extras: {
            thumbnail: {
              url: 'https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202011/122054-15/the-red-thumbnail1-3-2x.jpg',
              name: 'the red_thumbnail1-3@2x.jpg',
            },
            publicName: 'The RED : 프론트엔드 Back to the Basics : 지속 가능한 코드작성과 성능 향상법 by 김태곤',
            contractEndAt: '2024-08-14 00:00:00',
            totalPlayTime: 27215,
            contractBeginAt: '2020-08-15 00:00:00',
            exposedCategory: [
              {
                depth1stId: 10000,
                depth2ndId: 10017,
              },
              {
                depth1stId: 10002,
                depth2ndId: 10029,
              },
            ],
            totalCourseContentCount: 15,
          },
          product: {
            id: 10130,
            type: 'ALL',
            state: 'NORMAL',
            name: 'jgchoi product',
            extras: {
              publicName: 'jgchoi product',
              courseEndedAt: '2026-04-23T14:59:59.000Z',
              courseStartedAt: '2023-04-24T15:00:00.000Z',
              enrollmentEndedAt: '2026-04-15T14:59:59.000Z',
              enrollmentStartedAt: '2023-04-24T15:00:00.000Z',
            },
          },
          periodPermissions: ['APPLY', 'ONGOING'],
          requiredCourse: {
            id: 10630,
            type: 'REQUIRED_COURSE',
            state: 'NORMAL',
            name: '필수강의',
            member_id: 11085,
            course_id: 10361,
            product_id: 10130,
            extras: {
              points: {
                exam: 25,
                task: 15,
                total: 100,
                survey: 0,
                progress: 60,
              },
              criteriaForCompletion: {
                exam: 0,
                task: 0,
                total: 60,
                progress: 60,
              },
              requiredCourseEndedAt: '2026-04-23T14:59:59.000Z',
              requiredCourseStartedAt: '2023-04-25T02:18:35.649Z',
            },
          },
          enrollment: {
            courseId: 10361,
            memberId: 11085,
            productId: 10130,
            id: 60479,
            state: 'COMPLETED',
            type: 'ENROLLMENT',
            extras: {
              event: 'AUTO',
              totalScore: 0,
              courseCompletion: false,
              classroomEnteredAt: '2023-04-25T02:17:40.154Z',
            },
          },
        },
        {
          id: 10316,
          state: 'NORMAL',
          type: 'ONLINE',
          name: 'The RED : 슈퍼앱 운영을 위한 확장성 높은 앱 아키텍처 구축 by 노수진',
          extras: {
            thumbnail: {
              url: 'https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202109/162243-472/브릿지이미지--1-.png',
              name: '브릿지이미지 (1).png',
            },
            publicName: 'The RED : 슈퍼앱 운영을 위한 확장성 높은 앱 아키텍처 구축 by 노수진',
            contractEndAt: '2024-08-30 00:00:00',
            totalPlayTime: 39944,
            contractBeginAt: '2021-07-06 00:00:00',
            exposedCategory: [
              {
                depth1stId: 10000,
                depth2ndId: 10022,
              },
            ],
            totalCourseContentCount: 23,
          },
          product: {
            id: 10130,
            type: 'ALL',
            state: 'NORMAL',
            name: 'jgchoi product',
            extras: {
              publicName: 'jgchoi product',
              courseEndedAt: '2026-04-23T14:59:59.000Z',
              courseStartedAt: '2023-04-24T15:00:00.000Z',
              enrollmentEndedAt: '2026-04-15T14:59:59.000Z',
              enrollmentStartedAt: '2023-04-24T15:00:00.000Z',
            },
          },
          periodPermissions: ['APPLY', 'ONGOING'],
          enrollment: {
            courseId: 10316,
            memberId: 11085,
            productId: 10130,
            id: 60480,
            state: 'COMPLETED',
            type: 'ENROLLMENT',
            extras: {
              event: 'AUTO',
              totalScore: 0,
              courseCompletion: false,
              classroomEnteredAt: '2023-04-25T02:17:30.516Z',
            },
          },
        },
        {
          id: 10372,
          state: 'NORMAL',
          type: 'ONLINE',
          name: 'The RED : 김민태',
          extras: {
            thumbnail: {
              url: 'https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202011/122124-15/the-red-thumbnail1-4-2x.jpg',
              name: 'the red_thumbnail1-4@2x.jpg',
            },
            publicName: 'The RED : 김민태의 React와 Redux로 구현하는 아키텍처와 리스크관리',
            contractEndAt: '2024-10-01 00:00:00',
            totalPlayTime: 28216,
            contractBeginAt: '2020-10-02 00:00:00',
            exposedCategory: [
              {
                depth1stId: 10000,
                depth2ndId: 10017,
              },
              {
                depth1stId: 10002,
                depth2ndId: 10029,
              },
            ],
            totalCourseContentCount: 16,
          },
          product: {
            id: 10130,
            type: 'ALL',
            state: 'NORMAL',
            name: 'jgchoi product',
            extras: {
              publicName: 'jgchoi product',
              courseEndedAt: '2026-04-23T14:59:59.000Z',
              courseStartedAt: '2023-04-24T15:00:00.000Z',
              enrollmentEndedAt: '2026-04-15T14:59:59.000Z',
              enrollmentStartedAt: '2023-04-24T15:00:00.000Z',
            },
          },
          periodPermissions: ['APPLY', 'ONGOING'],
          enrollment: {
            courseId: 10372,
            memberId: 11085,
            productId: 10130,
            id: 60481,
            state: 'COMPLETED',
            type: 'ENROLLMENT',
            extras: {
              event: 'AUTO',
              totalScore: 0,
              courseCompletion: false,
              classroomEnteredAt: '2023-04-25T02:17:15.421Z',
            },
          },
        },
      ],
      recommendCourses: [
        {
          id: 10011,
          name: 'jgchoi recommend',
          extras: {
            publicName: 'jgchoi recommend',
            customerIds: [10057],
            recommendJob: {
              sub: '',
              main: '',
            },
            customerJobId: 0,
            isCustomerJob: true,
            recommendRank: '',
            customerRankId: 0,
            exposedEndedAt: '2023-06-10T14:59:59.886Z',
            exposedStartedAt: '2023-05-11T00:00:00.886Z',
            connectedCourseIds: [10000, 10001, 10002, 10003],
          },
          courses: [
            {
              id: 10002,
              state: 'NORMAL',
              type: 'ONLINE',
              name: '올인원 패키지 : 세계 3등에게 배우는 실무 밀착 데이터 시각화',
              extras: {
                thumbnail: {
                  url: 'https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202210/041304-539/bridge-image.webp',
                  name: 'bridge_image.webp',
                },
                publicName: '세계 3등에게 배우는 실무 밀착 데이터 시각화',
                contractEndAt: '2023-10-25 00:00:00',
                totalPlayTime: 54127,
                contractBeginAt: '2021-10-26 00:00:00',
                exposedCategory: [
                  {
                    depth1stId: 10001,
                    depth2ndId: 10023,
                  },
                ],
                totalCourseContentCount: 111,
              },
              product: {
                id: 10130,
                type: 'ALL',
                state: 'NORMAL',
                name: 'jgchoi product',
                extras: {
                  publicName: 'jgchoi product',
                  courseEndedAt: '2026-04-23T14:59:59.000Z',
                  courseStartedAt: '2023-04-24T15:00:00.000Z',
                  enrollmentEndedAt: '2026-04-15T14:59:59.000Z',
                  enrollmentStartedAt: '2023-04-24T15:00:00.000Z',
                },
              },
              periodPermissions: ['APPLY', 'ONGOING'],
              enrollment: {
                courseId: 10002,
                memberId: 11085,
                productId: 10130,
                id: 60889,
                state: 'COMPLETED',
                type: 'ENROLLMENT',
                extras: {
                  event: 'AUTO',
                  totalScore: 0,
                  courseCompletion: false,
                  classroomEnteredAt: '2023-04-25T08:17:57.770Z',
                },
              },
            },
            {
              id: 10002,
              state: 'NORMAL',
              type: 'ONLINE',
              name: '올인원 패키지 : 세계 3등에게 배우는 실무 밀착 데이터 시각화',
              extras: {
                thumbnail: {
                  url: 'https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202210/041304-539/bridge-image.webp',
                  name: 'bridge_image.webp',
                },
                publicName: '세계 3등에게 배우는 실무 밀착 데이터 시각화',
                contractEndAt: '2023-10-25 00:00:00',
                totalPlayTime: 54127,
                contractBeginAt: '2021-10-26 00:00:00',
                exposedCategory: [
                  {
                    depth1stId: 10001,
                    depth2ndId: 10023,
                  },
                ],
                totalCourseContentCount: 111,
              },
              product: {
                id: 10130,
                type: 'ALL',
                state: 'NORMAL',
                name: 'jgchoi product',
                extras: {
                  publicName: 'jgchoi product',
                  courseEndedAt: '2026-04-23T14:59:59.000Z',
                  courseStartedAt: '2023-04-24T15:00:00.000Z',
                  enrollmentEndedAt: '2026-04-15T14:59:59.000Z',
                  enrollmentStartedAt: '2023-04-24T15:00:00.000Z',
                },
              },
              periodPermissions: ['APPLY', 'ONGOING'],
              enrollment: {
                courseId: 10002,
                memberId: 11085,
                productId: 10130,
                id: 60889,
                state: 'COMPLETED',
                type: 'ENROLLMENT',
                extras: {
                  event: 'AUTO',
                  totalScore: 0,
                  courseCompletion: false,
                  classroomEnteredAt: '2023-04-25T08:17:57.770Z',
                },
              },
            },
            {
              id: 10002,
              state: 'NORMAL',
              type: 'ONLINE',
              name: '올인원 패키지 : 세계 3등에게 배우는 실무 밀착 데이터 시각화',
              extras: {
                thumbnail: {
                  url: 'https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202210/041304-539/bridge-image.webp',
                  name: 'bridge_image.webp',
                },
                publicName: '세계 3등에게 배우는 실무 밀착 데이터 시각화',
                contractEndAt: '2023-10-25 00:00:00',
                totalPlayTime: 54127,
                contractBeginAt: '2021-10-26 00:00:00',
                exposedCategory: [
                  {
                    depth1stId: 10001,
                    depth2ndId: 10023,
                  },
                ],
                totalCourseContentCount: 111,
              },
              product: {
                id: 10130,
                type: 'ALL',
                state: 'NORMAL',
                name: 'jgchoi product',
                extras: {
                  publicName: 'jgchoi product',
                  courseEndedAt: '2026-04-23T14:59:59.000Z',
                  courseStartedAt: '2023-04-24T15:00:00.000Z',
                  enrollmentEndedAt: '2026-04-15T14:59:59.000Z',
                  enrollmentStartedAt: '2023-04-24T15:00:00.000Z',
                },
              },
              periodPermissions: ['APPLY', 'ONGOING'],
              enrollment: {
                courseId: 10002,
                memberId: 11085,
                productId: 10130,
                id: 60889,
                state: 'COMPLETED',
                type: 'ENROLLMENT',
                extras: {
                  event: 'AUTO',
                  totalScore: 0,
                  courseCompletion: false,
                  classroomEnteredAt: '2023-04-25T08:17:57.770Z',
                },
              },
            },
            {
              id: 10002,
              state: 'NORMAL',
              type: 'ONLINE',
              name: '올인원 패키지 : 세계 3등에게 배우는 실무 밀착 데이터 시각화',
              extras: {
                thumbnail: {
                  url: 'https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202210/041304-539/bridge-image.webp',
                  name: 'bridge_image.webp',
                },
                publicName: '세계 3등에게 배우는 실무 밀착 데이터 시각화',
                contractEndAt: '2023-10-25 00:00:00',
                totalPlayTime: 54127,
                contractBeginAt: '2021-10-26 00:00:00',
                exposedCategory: [
                  {
                    depth1stId: 10001,
                    depth2ndId: 10023,
                  },
                ],
                totalCourseContentCount: 111,
              },
              product: {
                id: 10130,
                type: 'ALL',
                state: 'NORMAL',
                name: 'jgchoi product',
                extras: {
                  publicName: 'jgchoi product',
                  courseEndedAt: '2026-04-23T14:59:59.000Z',
                  courseStartedAt: '2023-04-24T15:00:00.000Z',
                  enrollmentEndedAt: '2026-04-15T14:59:59.000Z',
                  enrollmentStartedAt: '2023-04-24T15:00:00.000Z',
                },
              },
              periodPermissions: ['APPLY', 'ONGOING'],
              enrollment: {
                courseId: 10002,
                memberId: 11085,
                productId: 10130,
                id: 60889,
                state: 'COMPLETED',
                type: 'ENROLLMENT',
                extras: {
                  event: 'AUTO',
                  totalScore: 0,
                  courseCompletion: false,
                  classroomEnteredAt: '2023-04-25T08:17:57.770Z',
                },
              },
            },
          ],
        },
      ],
    },
  } as any;
  curation && (curation.recommendCourses = a.data.recommendCourses);

  const isRequiredAndRecentExist =
    (curation?.recentCourses?.length as number) > 0 && (curation?.requiredCourses?.length as number) > 0;

  const { studyGuide, exhibition } = homeContents || {};

  const onClickLearningGuide = (page: HomeContent) => {
    if (page.originPageId) {
      navigate(`/page/${page.originPageId}`);
    }

    if (page.redirectUrl) {
      location.href = page.redirectUrl;
    }
  };

  return (
    <div className="home-content">
      {curation && curation.notices.length > 0 && <NoticeTop noticeList={curation.notices} />}
      <Banner bannerList={curation?.banners ?? []} />
      {!isXLargeViewport && curation && (
        <>
          {curation.requiredCourses.length > 0 && (
            <RequiredCourseList requiredCourses={curation.requiredCourses} hasDivider={isRequiredAndRecentExist} />
          )}
          <RecentCourseList recentCourses={curation.recentCourses} />
        </>
      )}
      {exhibition && exhibition.pages?.length > 0 && (
        <Curation
          headTitle={exhibition?.title}
          title={exhibition?.subtitle}
          description={exhibition?.description}
          cardGap={isSmallViewport || isMediumViewport ? 12 : 16}
          cardLength={exhibition?.pages?.length}
        >
          {exhibition.pages.map((page, index) => (
            <ExhibitionCard
              key={exhibition.pageIds[index]}
              src={page.logoFile[0].url}
              onClick={() => onClickLearningGuide(page)}
              data-e2e="steady-seller"
            />
          ))}
        </Curation>
      )}
      {studyGuide && studyGuide.pages?.length > 0 && (
        <Curation
          headTitle={studyGuide?.title}
          title={studyGuide?.subtitle}
          description={studyGuide?.description}
          cardGap={isSmallViewport || isMediumViewport ? 12 : 15}
          cardLength={studyGuide?.pages?.length}
        >
          {studyGuide.pages.map((page, index) => (
            <StudyGuideCard
              key={studyGuide.pageIds[index]}
              src={page.logoFile[0].url}
              onClick={() => onClickLearningGuide(page)}
              data-e2e="study-guide"
            />
          ))}
        </Curation>
      )}
      <UserCustomCourseList />
      {curation?.recommendCourses?.map((recommendCourse) => (
        <Curation
          key={recommendCourse.id}
          title={recommendCourse.extras.publicName}
          courseCount={recommendCourse.courses.length}
          cardGap={isSmallViewport || isMediumViewport ? 12 : 16}
        >
          {recommendCourse.courses.map((course, index) => (
            <RecommendCourseCard key={`${course.id}-${index}`} course={course} />
          ))}
        </Curation>
      ))}
    </div>
  );
}, HomeMainLayoutFallback);

const HomeLayout = () => {
  return (
    <HomeBlock>
      <HomeMainLayout />
      <HomeSide />
    </HomeBlock>
  );
};

export default HomeLayout;
