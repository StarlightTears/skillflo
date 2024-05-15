import styled from '@emotion/styled';
import React from 'react';

import type { PropsWithStyle } from '@/types/component.interface';

import thumbNailEmpty from '@/assets/images/thumbnail_empty.png';
import { BookmarkOffMedium, BookmarkOnMedium, PlaySmall, Time, VerticalLine, Video } from '@/components';
import Button from '@/components/common-renewal/Button';
import { useCourseCategory } from '@/shared/hooks/category';
import { useCourseDetail } from '@/shared/hooks/course-detail';
import { useBookmark } from '@/shared/hooks/useBookmark';
import { getCourseEnrollmentState } from '@/shared/utils/course';
import { writePlayTime } from '@/shared/utils/time';
import { homeMedia, textEllipsis, typographyMixin } from '@/styles/mixins';

interface CourseInfoProps {
  enterClassroom: () => Promise<void>;
}

const CourseInfoBlock = styled.section`
  background-color: var(--color-gray-50);

  ${homeMedia('large', 'xlarge')} {
    position: sticky;
    top: var(--layout-gnb-height);
    z-index: var(--z-header);
    background-color: var(--color-white);
  }

  .wrap {
    display: flex;
    flex-direction: column;
    padding: 0 1.6rem 1.6rem;

    .thumbnail {
      margin-bottom: 1.6rem;

      img {
        width: 50%;
        border-radius: 0.6rem;
      }
    }

    .name {
      margin-bottom: 1.2rem;
      ${typographyMixin('p1', 'bold')};
    }

    .sub-info {
      display: flex;
      align-items: center;

      .category {
        color: var(--color-gray-600);
        ${typographyMixin('p3', 'bold')};
      }

      .extra {
        margin-right: 1.2rem;
        color: var(--color-gray-500);
        ${typographyMixin('p3')};
      }

      svg {
        margin-right: 0.4rem;
      }
    }

    .button-group {
      display: none;
    }

    ${homeMedia('medium')} {
      .thumbnail {
        img {
          width: 30.4rem;
        }
      }
    }

    ${homeMedia('large', 'xlarge')} {
      flex-direction: row;
      gap: 2.4rem;
      align-items: center;
      width: 96rem;
      margin: 0 auto;
      padding: 1.6rem 2rem;
      border-bottom: 0.1rem solid var(--color-gray-100);

      .thumbnail {
        margin-bottom: 0;

        img {
          width: 12.8rem;
        }
      }

      .name {
        width: 53.2rem;
        margin-bottom: 0;
        ${textEllipsis(2)};
      }

      .sub-info {
        display: none;
      }

      .button-group {
        display: flex;
        align-items: center;

        .classroom-btn {
          width: 12.6rem;
          margin-left: 1.2rem;
          padding-right: 1.6rem;
        }
      }
    }
  }
`;

const BookmarkIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 2.4rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary-700-transparency-5);
  }
`;

const CourseInfo = ({ className, enterClassroom }: PropsWithStyle<CourseInfoProps>) => {
  const { data: courseData } = useCourseDetail();
  const { isBookmarkCourse, toggleBookmark } = useBookmark();
  const courseCategory = useCourseCategory(courseData?.courseDetail);

  if (!courseData || !courseCategory) return null;

  const { isOngoingCourse } = getCourseEnrollmentState(courseData.courseDetail);

  return (
    <CourseInfoBlock className={className}>
      <div className="wrap">
        <div className="thumbnail">
          <img src={courseData.courseDetail.extras.thumbnail?.url || thumbNailEmpty} alt="course-thumbnail" />
        </div>
        <p className="name">{courseData.courseDetail.publicName}</p>
        <div className="sub-info">
          <span className="category">{courseCategory.name}</span>
          <VerticalLine height={1.6} margin={12} />
          <Video />
          <span className="extra">강의 {courseData.courseDetail.extras.totalCourseContentCount}개</span>
          <Time />
          <span className="extra">{writePlayTime(courseData.courseDetail.extras.totalPlayTime || 0)}</span>
        </div>
        <div className="button-group">
          {isBookmarkCourse ? (
            <BookmarkIconWrapper onClick={toggleBookmark}>
              <BookmarkOnMedium />
            </BookmarkIconWrapper>
          ) : (
            <BookmarkIconWrapper onClick={toggleBookmark}>
              <BookmarkOffMedium />
            </BookmarkIconWrapper>
          )}
          <VerticalLine height={4} margin={12} />
          <Button
            className="classroom-btn"
            theme="primary"
            size="large"
            rightIcon={<PlaySmall />}
            onClick={enterClassroom}
            disabled={!isOngoingCourse}
          >
            강의 보기
          </Button>
        </div>
      </div>
    </CourseInfoBlock>
  );
};

export default CourseInfo;
