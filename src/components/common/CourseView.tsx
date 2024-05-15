import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import type { OriginCourse } from '@/types/course.interface';

import { Checkbox, CourseCard } from '@/components';
import { useNavigateCourseDetailByEnrollment } from '@/shared/hooks/useNavigateCourseDetailByEnrollment';
import { media } from '@/styles/legacy-mixins';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

interface CourseViewProps {
  categoryTitle?: string;
  courseList: OriginCourse[];
  grid?: number;
  isShowExceptOngoingCourse?: boolean;
  emptyLayout: React.ReactNode;
}

const CourseViewBlock = styled.section`
  flex: 1;
`;

const CourseListHeader = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;

  .category-title {
    ${renewalTypographyMixin('title', 1)}
  }

  .category-course-length {
    ${renewalTypographyMixin('body', 1, true)}

    color: var(--color-semantic-informative-accent)
  }

  ${media('small', 'medium')} {
    .category-title {
      ${renewalTypographyMixin('title', 3)}
    }

    .category-course-length {
      ${renewalTypographyMixin('body', 3, true)}
    }
  }
`;

const ViewContent = styled.div<{ grid: number }>`
  display: grid;
  justify-content: space-between;
  margin-top: 1.2rem;

  ${media('small', 'medium')} {
    grid-template-columns: repeat(2, minmax(15.6rem, 25.8rem));
    gap: 1.6rem 1.6rem;
  }

  ${media('large')} {
    grid-template-columns: repeat(${({ grid }) => grid}, 26.2rem);
    gap: 3.2rem 2.4rem;
    margin-top: 2rem;
  }
`;

const CourseView = ({
  categoryTitle,
  courseList,
  grid = 3,
  isShowExceptOngoingCourse = true,
  emptyLayout,
}: CourseViewProps) => {
  const [exceptOngoingCourse, setExceptOngoingCourse] = useState(false);
  const navigateCourseDetail = useNavigateCourseDetailByEnrollment();

  const courseListToRender = !exceptOngoingCourse
    ? courseList
    : courseList.filter(
        (item) => item.enrollment?.extras?.event !== 'APPROVED' && item.enrollment?.extras?.event !== 'AUTO'
      );

  return (
    <CourseViewBlock className="course-view">
      {categoryTitle && (
        <CourseListHeader>
          <span className="category-title">{categoryTitle} </span>
          <span className="category-course-length">{courseListToRender.length}</span>
          {isShowExceptOngoingCourse && (
            <Checkbox
              css={css`
                margin-left: auto;
              `}
              label="수강중인 강의 제외하기"
              checked={exceptOngoingCourse}
              setChecked={() => setExceptOngoingCourse(!exceptOngoingCourse)}
            />
          )}
        </CourseListHeader>
      )}
      {courseListToRender.length === 0 ? (
        emptyLayout
      ) : (
        <ViewContent grid={grid}>
          {courseListToRender.map((item, index) => (
            <CourseCard key={index} course={item} onClick={() => navigateCourseDetail(item)} />
          ))}
        </ViewContent>
      )}
    </CourseViewBlock>
  );
};

export default CourseView;
