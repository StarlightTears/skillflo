import styled from '@emotion/styled';
import React from 'react';

import Notice from '../../../components/course-detail/Notice';

import CourseInfo from './CourseInfo';
import FloatingBar from './FloatingBar';
import LearningGuide from './LearningGuide';
import LearningStatus from './LearningStatus';
import ProductInfo from './ProductInfo';

import Qna from '@/components/course-detail/Qna';
import withSuspense from '@/shared/hocs/withSuspense';
import { useClassroomNavigate } from '@/shared/hooks/classroom';
import { useCourseDetail, useCourseDetailParams, useCourseQnaSummary } from '@/shared/hooks/course-detail';
import { useTotalScore, useVerificationEnrollment } from '@/shared/hooks/enrollment';
import { homeMedia } from '@/styles/mixins';

const CourseDetailLayoutBlock = styled.section`
  .course-info {
    margin-bottom: 2rem;

    ${homeMedia('large', 'xlarge')} {
      margin-bottom: 0;
    }
  }

  .notice {
    margin-bottom: 2rem;
    padding: 0.8rem 2rem;

    ${homeMedia('large', 'xlarge')} {
      width: 96rem;
      margin: 0 auto;
      padding: 2.8rem 2rem;
    }
  }

  .guide {
    margin: 0 2rem 1.6rem;

    ${homeMedia('large', 'xlarge')} {
      width: 92rem;
      margin: 2rem auto 4rem;
    }
  }

  .qna-mobile {
    display: flex;
    margin: 2rem 2rem 1.6rem;

    ${homeMedia('large', 'xlarge')} {
      display: none;
    }
  }
`;

const CourseDetailLayout = withSuspense(() => {
  const { data: courseDetailData } = useCourseDetail();
  const response = {
    notices: [
      {
        id: 12,
        type: 'NOTICE',
        name: '[공지] 버전 업데이트 관련',
        state: 'NORMAL',
        createdAt: '2023-08-08T03:56:18.000Z',
        updatedAt: '2023-08-08T03:56:18.000Z',
        extras: {
          priority: 99,
          content:
            '안녕하세요. 패스트캠퍼스 기업교육팀입니다.해당 과정의 강의자료에 오류가 있어 보조자료가 업데이트 되었습니다.대상자료 - Part1. 자료구조 이론 강의자료',
          tags: 'LXP_COURSE',
          exposedStartedAt: '2023-10-02T14:59:59.000Z',
          exposedEndedAt: '2023-09-01T15:00:00.000Z',
          attached: [
            {
              url: 'https://cdn.class101.net/images/part1-자료구조-이론-강의자료.pdf',
              name: 'part1-자료구조-이론-강의자료.pdf',
              size: 100,
              type: 'IMAGE',
              createdAt: '2023-09-02T03:56:18.000Z',
              content: '첨부파일',
            },
            {
              url: 'https://cdn.class101.net/images/개인정보처리방침 변경파일 20220501.pdf',
              name: '개인정보처리방침 변경파일 20220501.pdf',
              size: 100,
              type: 'IMAGE',
              createdAt: '2023-09-02T03:56:18.000Z',
              content: '첨부파일',
            },
          ],
        },
      },
      {
        id: 13,
        type: 'NOTICE',
        name: '[공지] 질의응답 답변 불가 일정 안내',
        state: 'NORMAL',
        createdAt: '2023-08-08T03:56:18.000Z',
        updatedAt: '2023-08-08T03:56:18.000Z',
        extras: {
          priority: 99,
          content:
            '안녕하세요. 패스트캠퍼스 기업교육팀입니다.해당 과정의 강의자료에 오류가 있어 보조자료가 업데이트 되었습니다.대상자료 - Part1. 자료구조 이론 강의자료',
          tags: 'LXP_COURSE',
          exposedStartedAt: '2023-10-02T14:59:59.000Z',
          exposedEndedAt: '2023-09-01T15:00:00.000Z',
          attached: [],
        },
      },
    ],
  } as any;
  if (courseDetailData) {
    courseDetailData.notices = response.notices;
  }
  const { productId, courseId } = useCourseDetailParams();
  const classroomNavigate = useClassroomNavigate();
  const { verification } = useVerificationEnrollment(productId, courseId);
  const { putTotalScore } = useTotalScore(productId, courseId);
  const { data: courseQnaSummary } = useCourseQnaSummary(courseId);

  if (!courseDetailData) return;

  const enterClassroom = async () => {
    try {
      await verification();
      await putTotalScore();
      classroomNavigate({
        type: courseDetailData.courseDetail.type,
        productId,
        courseId,
      });
    } catch (error) {
      alert('강의장 입장 권한이 없습니다.');
    }
  };

  return (
    <CourseDetailLayoutBlock>
      <ProductInfo />
      <CourseInfo className="course-info" enterClassroom={enterClassroom} />
      <Notice className="notice hover" noticeList={courseDetailData.notices} />
      <LearningGuide className="guide" courseDetailData={courseDetailData} />
      {courseQnaSummary?.isExist && courseDetailData.courseDetail.product.extras.isQnaBoardExposure && (
        <Qna className="qna-mobile" />
      )}
      <Qna className="qna-mobile" />

      <LearningStatus />
      <FloatingBar enterClassroom={enterClassroom} />
    </CourseDetailLayoutBlock>
  );
});

export default CourseDetailLayout;
