import styled from '@emotion/styled';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { OriginCourse } from '@/types/course.interface';

import { ArrowRight, CourseCard, PaginationController, EmptyNoteBlue } from '@/components';
import EmptyPlaceholder from '@/components/mypage/EmptyPlaceholder';
import { useViewport } from '@/shared/hooks';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';
import { invisibleScrollBar } from '@/styles/mixins';

interface CourseListProps {
  placeholder?: string;
  title: string;
  courseList: OriginCourse[];
  columnCount: number;
  viewAllNavigate?: () => void;
  useSlideController?: boolean;
}

const CourseListBlock = styled.section`
  overflow: hidden;
  margin-bottom: 2rem;

  &:not(:last-of-type) {
    margin-bottom: 4rem;

    ${media('large')} {
      margin-bottom: 7.2rem;
    }
  }
`;

const CourseSlider = styled.div<{ columnCount: number; firstSlideCourseIndex: number }>`
  /* stylelint-disable-next-line custom-property-empty-line-before */
  --column-width: ${({ columnCount }) => `calc((100% - var(--course-list-gap) * ${columnCount - 1}) / ${columnCount})`};
  ${invisibleScrollBar};

  position: relative;
  left: ${({ firstSlideCourseIndex }) =>
    `calc(var(--column-width) * ${-firstSlideCourseIndex} - var(--course-list-gap) * ${firstSlideCourseIndex})`};
  display: flex;
  gap: var(--course-list-gap);
  transition: left 0.5s;

  & .empty-placeholder {
    margin: 0 auto;
  }

  ${media('small', 'medium')} {
    --course-list-gap: 2rem;

    .course-card {
      flex: 0 0 calc((100% - 2rem) / 2);
    }
  }

  ${media('large')} {
    --course-list-gap: 2.4rem;

    .course-card {
      flex: 0 0 ${(props) => `calc((100% - ${props.columnCount - 1} * 2.4rem) / ${props.columnCount})`};
    }
  }
`;

const CourseListHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.6rem;

  .title {
    position: relative;

    ${legacyTypographyMixin('body1')}
    font-weight: 700;

    .course-count {
      position: absolute;
      top: 0;
      left: calc(100% + 4px);

      ${legacyTypographyMixin('caption')}
      font-weight: 400;
      color: var(--legacy-color-gray-500);
    }

    ${media('large')} {
      ${legacyTypographyMixin('headline4')}
    }
  }

  .view-all {
    display: flex;
    align-items: center;
    margin-left: auto;
    ${legacyTypographyMixin('caption')}
    color: var(--legacy-color-gray-700);
    cursor: pointer;

    ${media('large')} {
      ${legacyTypographyMixin('body1')}
    }
  }

  .slide-controller {
    ${legacyTypographyMixin('caption')}
    font-weight: 700;
    color: var(--legacy-color-gray-300);

    .current {
      color: var(--legacy-color-gray-900);
    }

    svg {
      cursor: pointer;
    }
  }
`;

const CourseList: FC<CourseListProps> = ({
  placeholder,
  title,
  courseList,
  columnCount,
  viewAllNavigate,
  useSlideController,
}) => {
  const mobileColumnCount = 2;
  const { isLargeViewport } = useViewport();
  const [currentSlideNumber, setSlideNumber] = useState(1);
  const columnByViewPort = isLargeViewport ? columnCount : mobileColumnCount;
  const lastSlideNumber = Math.ceil(courseList.length / (isLargeViewport ? columnCount : mobileColumnCount));
  const firstSlideCourseIndex = (() => {
    const lastCourseIndexOnSlide = (currentSlideNumber - 1) * columnByViewPort + columnByViewPort - 1;

    const firstSlideCourseIndex =
      lastCourseIndexOnSlide >= courseList.length - 1
        ? courseList.length - columnByViewPort
        : (currentSlideNumber - 1) * columnByViewPort;

    return firstSlideCourseIndex >= 0 ? firstSlideCourseIndex : 0;
  })();
  const navigate = useNavigate();

  const moveSlide = (offset: number) => {
    setSlideNumber(currentSlideNumber + offset);
  };

  return (
    <CourseListBlock>
      <CourseListHeader>
        <div className="title">
          {title}
          <span className="course-count">{courseList.length}</span>
        </div>
        {viewAllNavigate && courseList.length > 0 && (
          <div className="view-all" onClick={viewAllNavigate}>
            전체보기
            <ArrowRight />
          </div>
        )}
        {useSlideController && (
          <PaginationController
            className="slide-controller"
            onClickPrevious={() => currentSlideNumber > 1 && moveSlide(-1)}
            onClickNext={() => currentSlideNumber < lastSlideNumber && moveSlide(1)}
          >
            <span className="current">{currentSlideNumber}</span> / {lastSlideNumber}
          </PaginationController>
        )}
      </CourseListHeader>
      <CourseSlider columnCount={columnByViewPort} firstSlideCourseIndex={firstSlideCourseIndex}>
        {courseList.map((item, index) => (
          <CourseCard
            className="course-card"
            key={index}
            course={item}
            onClick={() => {
              navigate(`/course-detail/${item.product.id}/${item.id}`);
            }}
          />
        ))}
        {courseList.length === 0 && (
          <EmptyPlaceholder className="empty-placeholder">
            <EmptyNoteBlue />
            {placeholder}
          </EmptyPlaceholder>
        )}
      </CourseSlider>
    </CourseListBlock>
  );
};

export default CourseList;
