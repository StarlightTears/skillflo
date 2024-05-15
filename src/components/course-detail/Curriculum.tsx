import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';

import { DateUtil } from '@day1co/pebbles';

import type { CoursePart } from '@/types/course.interface';

import { getChapterPlaytime, getPartPlaytime } from '@/shared/utils/course';
import { homeMedia, typographyMixin } from '@/styles/mixins';

interface CurriculumProps {
  coursePartList: CoursePart[];
}

const CurriculumBlock = styled.div<{ isHideMoreContent?: boolean }>`
  .curriculum {
    position: relative;
    overflow-y: hidden;
    ${({ isHideMoreContent }) => isHideMoreContent && `max-height: 85.6rem;`};

    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.8rem;
      padding: 0 0 0.8rem 0.4rem;
      border-bottom: 0.1rem solid var(--color-gray-200);
      color: var(--color-gray-600);
      ${typographyMixin('p2', 'bold')};
    }

    .play-time {
      display: none;
      width: 7.2rem;
      text-align: center;
    }

    ${homeMedia('large', 'xlarge')} {
      .play-time {
        display: inline;
      }
    }

    ul {
      li {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0;
        word-break: break-all;
        ${typographyMixin('p2')};

        &.part {
          padding-left: 0.4rem;
          ${typographyMixin('p2', 'bold')};
        }

        &.chapter {
          padding-left: 1.6rem;
        }

        &.course-content {
          padding-left: 2.8rem;
        }

        &:not(:last-of-type) {
          margin-bottom: 0.8rem;
        }

        .play-time {
          width: 7.2rem;
          color: var(--color-gray-600);
          text-align: center;
          ${typographyMixin('p2')};
        }
      }
    }

    .linear-gradient {
      position: absolute;
      bottom: 0;
      z-index: var(--z-curriculum-linear-gradient);
      width: 100%;
      height: 6rem;
      background-image: linear-gradient(transparent 0%, var(--color-white) 100%);
    }
  }

  .more-view {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 13.2rem;
    height: 3.2rem;
    margin: 1.6rem auto 0;
    border-radius: 0.4rem;
    color: var(--color-primary-700);
    cursor: pointer;
    ${typographyMixin('p2', 'bold')};

    &:hover {
      background-color: var(--color-primary-700-transparency-10);
    }
  }
`;

const Curriculum = ({ coursePartList }: CurriculumProps) => {
  const MAX_LIST_LENGTH = 20;
  const listRef = useRef<HTMLUListElement | null>(null);
  const [courseContentLength, setCourseContentLength] = useState(0);
  const [isHideMoreContent, setIsHideMoreContent] = useState(false);

  if (!coursePartList.length) return null;

  useEffect(() => {
    if (!coursePartList.length) return;

    let totalContentLength = 0;
    let courseContentLength = 0;
    coursePartList.forEach((part) => {
      totalContentLength += 1;
      if (part.CHAPTER) {
        part.CHAPTER.forEach((chapter) => {
          totalContentLength += 1;
          if (chapter.CONTENT) {
            chapter.CONTENT.forEach(() => {
              totalContentLength += 1;
              courseContentLength += 1;
            });
          }
        });
      }
      if (part.CONTENT) {
        part.CONTENT.forEach(() => {
          totalContentLength += 1;
          courseContentLength += 1;
        });
      }
    });
    setCourseContentLength(courseContentLength);
    setIsHideMoreContent(totalContentLength > MAX_LIST_LENGTH);
  }, coursePartList);

  return (
    <CurriculumBlock isHideMoreContent={isHideMoreContent}>
      <div className="curriculum">
        <div className="header">
          <span>강의 명</span>
          <span className="play-time">학습시간</span>
        </div>
        <ul ref={listRef}>
          {coursePartList.map((part) => (
            <React.Fragment key={part.id}>
              <li className="part">
                {part.title}
                <span className="play-time">{DateUtil.getTimeStringFromSeconds(getPartPlaytime(part))}</span>
              </li>
              {part.CHAPTER &&
                part.CHAPTER.map((chapter) => (
                  <React.Fragment key={chapter.id}>
                    <li className="chapter">
                      {chapter.title}
                      <span className="play-time">
                        {DateUtil.getTimeStringFromSeconds(getChapterPlaytime(chapter))}
                      </span>
                    </li>
                    {chapter.CONTENT &&
                      chapter.CONTENT.length > 0 &&
                      chapter.CONTENT.map((courseContent) => (
                        <li key={courseContent.courseContentId} className="course-content">
                          {courseContent.courseContentName}
                          <span className="play-time">
                            {DateUtil.getTimeStringFromSeconds(courseContent.playTime || 0)}
                          </span>
                        </li>
                      ))}
                  </React.Fragment>
                ))}
            </React.Fragment>
          ))}
          {isHideMoreContent && <div className="linear-gradient" />}
        </ul>
      </div>
      {isHideMoreContent && (
        <div className="more-view" onClick={() => setIsHideMoreContent(false)}>
          모든 {courseContentLength}개 강의 보기
        </div>
      )}
    </CurriculumBlock>
  );
};

export default Curriculum;
