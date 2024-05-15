import styled from '@emotion/styled';
import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import CourseDetailExamTask from '../ExamTask';

import CourseDetailIntro from './CourseIntro';
import CourseDetailScoreStatus from './ScoreStatus';

import Qna from '@/components/course-detail/Qna';
import TabList from '@/components/course-detail/TabList';
import { useCourseDetail, useCourseDetailParams, useCourseQnaSummary } from '@/shared/hooks/course-detail';
import { getCourseEnrollmentState } from '@/shared/utils/course';
import { homeMedia } from '@/styles/mixins';

const LearningStatusBlock = styled.section`
  display: flex;
  flex-direction: column;

  .learning-status-content {
    flex: 1;
    margin: 0 2rem 4rem;
  }

  .qna-desktop {
    display: none;
  }

  ${homeMedia('large', 'xlarge')} {
    flex-direction: row;
    width: 92rem;
    margin: 0 auto 9.6rem;

    aside {
      position: sticky;
      top: calc(var(--layout-gnb-height) + 12.7rem);
      height: 100%;

      ${homeMedia('large', 'xlarge')} {
        padding-right: 4rem;
      }

      .qna-desktop {
        display: flex;
        margin-top: 3.2rem;
      }
    }

    .learning-status-content {
      margin: 0;
    }
  }
`;

const courseDetailTabList = [
  { label: '학습현황', value: 'status' },
  { label: '시험/과제', value: 'exam' },
  { label: '강의소개', value: 'intro' },
];

const LearningStatus = () => {
  const { courseId } = useCourseDetailParams();
  const { data: courseData } = useCourseDetail();
  const { isOngoingCourse } = useMemo(() => getCourseEnrollmentState(courseData?.courseDetail), [courseData]);
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab');
  const { data: courseQnaSummary } = useCourseQnaSummary(courseId);

  useEffect(() => {
    if (!tab) setSearchParams({ tab: 'status' }, { replace: true });
  }, [searchParams]);

  return (
    <LearningStatusBlock>
      <aside>
        <TabList tabList={courseDetailTabList} />
        {courseQnaSummary?.isExist && courseData?.courseDetail.product.extras.isQnaBoardExposure && (
          <Qna className="qna-desktop" />
        )}
        <Qna className="qna-desktop" />
      </aside>
      <section className="learning-status-content">
        {tab === 'status' && <CourseDetailScoreStatus />}
        {tab === 'exam' && (
          <CourseDetailExamTask
            isCompletedEnrollment={
              courseData?.courseDetail.enrollment && courseData.courseDetail.enrollment.state === 'COMPLETED'
            }
            isOngoingCourse={isOngoingCourse}
          />
        )}
        {tab === 'intro' && <CourseDetailIntro />}
      </section>
    </LearningStatusBlock>
  );
};

export default LearningStatus;
