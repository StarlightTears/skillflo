import styled from '@emotion/styled';
import React, { PropsWithChildren } from 'react';

import type { OriginCourse } from '@/types/course.interface';

import thumbNailEmpty from '@/assets/images/thumbnail_empty.png';
import { Time, VerticalLine, Video } from '@/components';
import { writePlayTime } from '@/shared/utils/time';
import { homeMedia, textEllipsis, typographyMixin } from '@/styles/mixins';

interface BridgeCoverProps {
  thumbnailUrl?: string;
  title?: string;
  categoryName?: string;
  course?: OriginCourse;
}

const BridgeCoverBlock = styled.article`
  .thumbnail {
    margin: 0 auto;

    img {
      width: 100%;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 2rem 2rem 1.6rem;
    background-color: var(--color-primary-700-transparency-5);

    .title {
      ${textEllipsis(2)};
      ${typographyMixin('h6', 'bold')}
    }

    .sub {
      display: flex;
      flex-direction: column;
      margin-top: 1.2rem;

      .sub-info {
        display: flex;
        align-items: center;

        .category {
          ${typographyMixin('p3', 'bold')};
          color: var(--color-gray-500);
        }

        .course-info {
          display: flex;
          align-items: center;
          ${typographyMixin('p3')};

          svg {
            margin-right: 0.4rem;
          }

          span {
            margin-right: 1.2rem;
            color: var(--color-gray-500);
          }
        }
      }

      .children {
        display: flex;
        justify-content: flex-end;

        & > button {
          margin-top: 2.4rem;
        }
      }
    }
  }

  ${homeMedia('medium')} {
    .thumbnail {
      width: 64rem;
    }

    .info {
      width: 64rem;
    }
  }

  ${homeMedia('large')} {
    padding: 2.8rem 1.2rem;

    .info {
      flex: 1;
      padding: 0;
    }
  }

  ${homeMedia('xlarge')} {
    justify-content: center;
    padding: 2.8rem 0;

    .info {
      padding: 0;
    }
  }

  ${homeMedia('large', 'xlarge')} {
    display: flex;
    justify-content: center;
    background-color: var(--color-primary-700-transparency-5);

    .thumbnail {
      margin: 0 4rem 0 0;

      img {
        width: 32rem;
        height: 18rem;
        border-radius: 0.6rem;
      }
    }

    .info {
      flex: 57.6rem 0 0;
      margin: 0;
      background-color: transparent;

      .title {
        margin-top: 0.8rem;
      }

      .sub {
        flex: 1;
        flex-direction: row;
        justify-content: space-between;

        .sub-info {
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;

          .vertical-line {
            display: none;
          }

          .category {
            ${typographyMixin('p2', 'bold')};
            color: var(--color-gray-600);
          }

          .course-info {
            ${typographyMixin('p2')};
          }
        }

        .children {
          position: relative;
          gap: 1.2rem;
          align-items: flex-end;
          margin-top: 0;
        }
      }
    }
  }
`;

const BridgeCover = ({ thumbnailUrl, title, categoryName, course, children }: PropsWithChildren<BridgeCoverProps>) => {
  return (
    <BridgeCoverBlock>
      <div className="thumbnail">
        <img src={thumbnailUrl || thumbNailEmpty} alt="thumbnail-img" />
      </div>
      <div className="info">
        <h6 className="title">{title}</h6>
        <div className="sub">
          <div className="sub-info">
            <div className="category">{categoryName}</div>
            <VerticalLine className="vertical-line" height={1.6} />
            <div className="course-info">
              <Video />
              <span>강의 {course?.extras.totalCourseContentCount}개</span>
              <Time />
              <span>{writePlayTime(course?.extras.totalPlayTime || 0)}</span>
            </div>
          </div>
          <div className="children">{children}</div>
        </div>
      </div>
    </BridgeCoverBlock>
  );
};

export default BridgeCover;
