import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import type { OriginCourse } from '@/types/course.interface';

import { dateFormat } from '@/shared/utils/date';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { textEllipsis } from '@/styles/mixins';

interface RequiredCourseCardProps {
  course: OriginCourse;
}

const RequiredCourseCardWrapper = styled.li`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.4rem;
  align-items: flex-start;
  align-self: stretch;
  padding: 1.2rem 1.6rem;
  border: 0.5px solid var(--color-border-light-grey);
  border-radius: 0.6rem;
  background: var(--color-white);
  cursor: pointer;

  :hover {
    background: #fafafa;
  }

  .required-course-end-date {
    color: var(--color-text-blue);
    ${legacyTypographyMixin('XSmall')}
  }

  .required-course-name {
    color: var(--color-text-black);
    ${legacyTypographyMixin('Medium')}
    ${textEllipsis(2)}
  }
`;

const RequiredCourseCard = ({ course }: RequiredCourseCardProps) => {
  const navigate = useNavigate();
  return (
    <RequiredCourseCardWrapper
      onClick={() => {
        navigate(`/course-detail/${course.product.id}/${course.id}`);
      }}
      data-e2e="required-course-card"
    >
      <div className="required-course-end-date">
        {dateFormat(course.requiredCourse?.extras.requiredCourseEndedAt as Date)}까지 수강 가능
      </div>
      <div className="required-course-name">{course.publicName}</div>
    </RequiredCourseCardWrapper>
  );
};

export default RequiredCourseCard;
