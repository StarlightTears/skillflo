import styled from '@emotion/styled';
import React from 'react';

import Curriculum from '@/components/course-detail/Curriculum';
import { useCourseDetail } from '@/shared/hooks/course-detail';
import { typographyMixin } from '@/styles/mixins';

const CourseDetailIntroBlock = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;

  dl {
    display: flex;
    flex-direction: column;
    padding-bottom: 2.8rem;

    &:not(:last-of-type) {
      border-bottom: 0.1rem solid var(--color-gray-100);
    }

    dt {
      margin-bottom: 2rem;
      ${typographyMixin('p1', 'bold')};
    }

    dd {
      white-space: pre-wrap;
      word-break: break-all;
      ${typographyMixin('p2')};
    }
  }
`;

const CourseDetailIntro = () => {
  const { data: courseData } = useCourseDetail();
  return (
    <CourseDetailIntroBlock>
      {courseData?.courseDetail.extras.descriptionInfo && (
        <dl>
          <dt>강의 소개</dt>
          <dd>{courseData?.courseDetail.extras.descriptionInfo}</dd>
        </dl>
      )}
      {courseData?.courseDetail.extras.lectureInfo && (
        <dl>
          <dt>강의 정보</dt>
          <dd>{courseData?.courseDetail.extras.lectureInfo}</dd>
        </dl>
      )}
      {courseData?.courseDetail.extras.teacherInfo && (
        <dl>
          <dt>강사 소개</dt>
          <dd>{courseData?.courseDetail.extras.teacherInfo}</dd>
        </dl>
      )}
      {courseData?.courseDetail.extras.contents && (
        <dl>
          <dt>강의목록</dt>
          <dd>
            <Curriculum coursePartList={courseData?.courseDetail.extras.contents} />
          </dd>
        </dl>
      )}
    </CourseDetailIntroBlock>
  );
};

export default CourseDetailIntro;
