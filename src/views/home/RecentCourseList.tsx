import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import type { OriginCourse } from '@/types/course.interface';

import RecentCourseCard from '@/components/common/card/RecentCourseCard';
import ViewAllListLink from '@/components/common/ViewAllListLink';
import { verificationEnrollment } from '@/shared/api/enrollment';
import { useClassroomNavigate } from '@/shared/hooks/classroom';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { homeMedia } from '@/styles/mixins';

interface RecentCourseListProps {
  recentCourses?: OriginCourse[];
}

const RecentCoursesWrapper = styled.section`
  padding: 4rem 5rem;
  background-color: var(--color-surface-black-5);

  .section-title {
    ${legacyTypographyMixin('XLarge')};
    padding-bottom: 1.2rem;
    font-weight: 700;
  }

  .empty-placeholder {
    ${legacyTypographyMixin('Small')};
    font-weight: 500;
    color: var(--color-text-light-gray);

    ${homeMedia('large')} {
      margin: 3.8rem 0 6.6rem;
      text-align: center;
    }

    ${homeMedia('medium', 'small')} {
      margin: 3.8rem 0 5.8rem;
      text-align: center;
    }
  }

  ul {
    display: flex;
    flex-direction: row;
    gap: 2rem;

    ${homeMedia('xlarge')} {
      flex-direction: column;
      gap: 1.6rem;
    }

    ${homeMedia('large')} {
      gap: 1.6rem;
    }

    ${homeMedia('medium')} {
      gap: 1.3rem;
    }

    ${homeMedia('small')} {
      flex-direction: column;
    }
  }

  ${homeMedia('xlarge')} {
    padding: 0 0 4rem;
    background-color: var(--color-white);
  }

  ${homeMedia('medium')} {
    padding: 4rem;
  }

  ${homeMedia('small')} {
    padding: 3.2rem 2rem;
  }
`;

const RecentCourseList = ({ recentCourses }: RecentCourseListProps) => {
  const navigate = useNavigate();
  const classroomNavigate = useClassroomNavigate();

  return (
    <RecentCoursesWrapper>
      <div className="section-title">최근 수강한 강의</div>
      {!recentCourses?.length ? (
        <div className="empty-placeholder">최근 수강한 강의가 없습니다.</div>
      ) : (
        <>
          <ul>
            {recentCourses?.map((course) => (
              <RecentCourseCard
                key={`${course.product.id}-${course.id}`}
                course={course}
                onThumbnailClick={async () => {
                  await verificationEnrollment({ productId: course.product.id, courseId: course.id });
                  classroomNavigate({ productId: course.product.id, courseId: course.id, type: course.type });
                }}
                onDescriptionClick={() => {
                  navigate(`/course-detail/${course.product.id}/${course.id}`);
                }}
              />
            ))}
          </ul>
          <ViewAllListLink to="/mypage/recents" e2eTestId="recent-courses-all" />
        </>
      )}
    </RecentCoursesWrapper>
  );
};

export default RecentCourseList;
