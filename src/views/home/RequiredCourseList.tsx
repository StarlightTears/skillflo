import styled from '@emotion/styled';
import React from 'react';

import type { OriginCourse } from '@/types/course.interface';

import ViewAllListLink from '@/components/common/ViewAllListLink';
import RequiredCourseCard from '@/components/home/RequiredCourseCard';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { homeMedia } from '@/styles/mixins';

interface RequiredCourseListProps {
  requiredCourses?: OriginCourse[];
  hasDivider?: boolean;
}

const RequiredCourselistWrapper = styled.section`
  padding: 4rem 5rem 0;
  background-color: var(--color-surface-black-5);

  .section-title {
    ${legacyTypographyMixin('XLarge')};
    padding-bottom: 1.2rem;
    font-weight: 700;
  }

  ul {
    display: flex;
    flex-direction: row;

    ${homeMedia('xlarge')} {
      flex-direction: column;
      gap: 0.8rem;
    }

    ${homeMedia('large')} {
      flex-direction: row;
      gap: 1.6rem;
    }

    ${homeMedia('medium')} {
      flex-direction: row;
      gap: 1.3rem;
    }

    ${homeMedia('small')} {
      flex-direction: column;
      gap: 0.8rem;
    }
  }

  .divider {
    margin: 4rem 0 0;
    border-bottom: 0.1rem solid var(--color-hr);
  }

  ${homeMedia('xlarge')} {
    padding: 0;
    background-color: var(--color-white);
  }

  ${homeMedia('medium')} {
    padding: 4rem 4rem 0;
  }

  ${homeMedia('small')} {
    padding: 3.2rem 2rem 0;
  }
`;

const RequiredCourseList = ({ requiredCourses, hasDivider }: RequiredCourseListProps) => {
  return (
    <RequiredCourselistWrapper>
      <div className="section-title">필수강의</div>
      <ul>
        {requiredCourses?.map((course) => (
          <RequiredCourseCard key={`${course.product.id}-${course.id}`} course={course} />
        ))}
      </ul>
      <ViewAllListLink to="/mypage/course" e2eTestId="course-status" title="수강현황 보기" />
      {hasDivider && <div className="divider" />}
    </RequiredCourselistWrapper>
  );
};

export default RequiredCourseList;
