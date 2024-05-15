import styled from '@emotion/styled';
import React, { DOMAttributes, PropsWithChildren } from 'react';

import type { PropsWithStyle } from '@/types/component.interface';
import type { OriginCourse } from '@/types/course.interface';

import thumbNailEmpty from '@/assets/images/thumbnail_empty.png';
import { PlayIcon } from '@/components';
import { writePlayTime } from '@/shared/utils/time';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';
import { textEllipsis } from '@/styles/mixins';

type DivClickEventHandler = DOMAttributes<HTMLDivElement>['onClick'];

interface CourseIntroProps {
  title: string;
  thumbnailUrl: string;
  playIconOnThumbnail?: boolean;
  opacityThumbnail?: boolean;
  categoryName: string;
  productName?: string;
  // TODO: 임시로 지정한 타입으로 추후에 수정할 가능성이 있습니다.
  course?: OriginCourse;
  disableCursorPointer?: boolean;
  onClickThumnail?: DivClickEventHandler;
  onClickInfoColumn?: DivClickEventHandler;
}

const CourseIntroBlock = styled.div<{ opacityThumbnail?: boolean; disableCursorPointer?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  margin: 0 0 3.6rem;

  ${(props) => (props.disableCursorPointer ? '' : 'cursor: pointer;')}

  .thumbnail-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
  }

  .thumbnail {
    object-fit: cover;
    width: 100%;
    ${(props) => (props.opacityThumbnail ? 'opacity: 0.3;' : '')}
  }

  .play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .course-infos {
    display: flex;
    align-items: center;
    margin: 0 0 0.4rem;

    ${legacyTypographyMixin('caption')}
    color: var(--legacy-color-gray-500);
  }

  .info {
    display: flex;
    flex-direction: column;
  }

  .vertical-line {
    display: block;
    width: 0.1rem;
    height: 1.2rem;
    margin: 0 0.8rem;
    border-radius: 0.05rem;
    background-color: var(--legacy-color-gray-200);
  }

  .course-title {
    margin: 0 0 2rem;

    ${legacyTypographyMixin('headline6')}
    ${textEllipsis(2)}
    font-weight: 700;
  }

  ${media('large')} {
    flex-direction: row;
    gap: 2.4rem;

    .thumbnail-wrapper {
      flex: 0 0 22rem;
      height: 12rem;
    }

    .thumbnail {
      height: 100%;
    }

    .info-column {
      position: relative;
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
    }

    .children-wrapper {
      flex: 1 1 auto;
    }
  }
`;

// TODO: CourseIntro 컴포넌트를 사용하는 코드를 추후에 확인해볼 필요가 있다. course의 데이터 일부를 별도의 프로퍼티로도 받는 경우가 있기 때문.
const CourseIntro = ({
  title,
  thumbnailUrl,
  opacityThumbnail,
  playIconOnThumbnail,
  children,
  className,
  productName,
  categoryName,
  course,
  disableCursorPointer,
  onClickThumnail,
  onClickInfoColumn,
}: PropsWithStyle<PropsWithChildren<CourseIntroProps>>) => {
  return (
    <CourseIntroBlock
      className={className}
      opacityThumbnail={opacityThumbnail}
      disableCursorPointer={disableCursorPointer}
    >
      <div className="thumbnail-wrapper" onClick={onClickThumnail} data-e2e="course-intro-thumbnail">
        <img src={thumbnailUrl || thumbNailEmpty} alt={`${title} 썸네일`} className="thumbnail" />
        {playIconOnThumbnail && <PlayIcon className="play-icon" />}
      </div>
      <div className="info-column" onClick={onClickInfoColumn}>
        <div className="course-infos">
          {productName && (
            <>
              <span className="course-info product">{productName}</span>
              <span className="vertical-line" />
            </>
          )}
          <span className="course-info category">{categoryName}</span>
          <span className="vertical-line" />
          <span className="course-info clip">
            강의 {course?.extras.totalCourseContentCount}개 &middot; {writePlayTime(course?.extras.totalPlayTime || 0)}
          </span>
        </div>
        <div className="course-title">{title}</div>
        {children && <div className="children-wrapper">{children}</div>}
      </div>
    </CourseIntroBlock>
  );
};

export default CourseIntro;
