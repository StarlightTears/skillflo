import styled from '@emotion/styled';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DateUtil } from '@day1co/pebbles';

import type { PropsWithStyle } from '@/types/component.interface';

import { ClassroomPanel, Prev } from '@/components';
import { useAppDispatch, useAppSelector, useCurrentMemberGroup } from '@/shared/hooks';
import { useClassroomCourse, useClassroomContentList, useCourseLearningProgressTime } from '@/shared/hooks/classroom';
import { slices } from '@/shared/store/slices';
import { hasAccessPermissionForAllPage } from '@/shared/utils/screenAccessControl';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { classroomMedia, textEllipsis } from '@/styles/mixins';

const ClassroomHeaderBlock = styled.header`
  background: rgb(0 0 0 / 50%);

  backdrop-filter: blur(20px);

  ${legacyTypographyMixin('caption')}

  .navigation {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
  }

  .previous-link {
    flex: 0 0 auto;
    margin: 0 0.8rem 0 0;
    cursor: pointer;
  }

  .title {
    ${textEllipsis()}
    ${legacyTypographyMixin('body2')}
    display: block;
    flex: 1 1 auto;
    font-weight: bold;
  }

  .course-info {
    display: flex;
    gap: 0.8rem;

    color: var(--legacy-color-gray-100);
  }

  .index-toggle-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 7.2rem;
    cursor: pointer;

    svg {
      margin: 0 0 0 0.2rem;
    }
  }

  ${classroomMedia('small', 'medium')} {
    height: 5.8rem;
    padding: 0.8rem 1.2rem;

    .index-toggle-button {
      display: none;
    }

    .course-info {
      margin: 0.4rem 0 0;
      padding: 0 0 0 3.2rem;
    }
  }

  ${classroomMedia('large')} {
    display: flex;
    gap: 1.2rem;
    align-items: center;
    height: 4.8rem;
    padding: 0 1.6rem 0 1.2rem;

    & > * {
      flex: 0 0 auto;
    }

    .title {
      width: calc(100vw - 83rem);
    }
  }
`;

const ClassroomHeader = ({ className }: PropsWithStyle) => {
  const isOpenAside = useAppSelector((state) => state.classroom.isOpenAside);
  const { setIsOpenAside } = slices.classroom.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId, courseId } = useParams();

  const { data: course, isMeetCourse } = useClassroomCourse();

  const { data: contentList } = useClassroomContentList();
  const totalLearingTime =
    course?.extras.totalPlayTime ||
    contentList?.reduce((totalLearingTime, part) => totalLearingTime + part.extras.playtime, 0) ||
    0;

  const { data: learningProgressData } = useCourseLearningProgressTime();
  const learningProgressTime = Math.round(
    learningProgressData && learningProgressData.time >= 0 ? learningProgressData.time : 0
  );

  const { data: memberGroup } = useCurrentMemberGroup();

  const hasScreenAccessControl = memberGroup && hasAccessPermissionForAllPage(memberGroup);

  const backPreviousPage = () => {
    navigate(`/course-detail/${productId}/${courseId}`);
  };

  const toggleClassroomAside = () => {
    dispatch(setIsOpenAside(!isOpenAside));
  };

  return (
    <ClassroomHeaderBlock className={className}>
      <div className="navigation">
        {hasScreenAccessControl && <Prev onClick={backPreviousPage} className="previous-link" />}
        <div className="title">{course?.publicName}</div>
      </div>
      {!isMeetCourse && (
        <div className="course-info">
          <span>수강률: {learningProgressData?.rate || 0}%</span>
          <span>수강시간: {DateUtil.getTimeStringFromSeconds(learningProgressTime)}</span>
          <span>강의시간: {DateUtil.getTimeStringFromSeconds(totalLearingTime)}</span>
        </div>
      )}
      <div className="index-toggle-button" onClick={toggleClassroomAside}>
        {isOpenAside ? '목록닫기' : '목록열기'}
        <ClassroomPanel />
      </div>
    </ClassroomHeaderBlock>
  );
};

export default ClassroomHeader;
