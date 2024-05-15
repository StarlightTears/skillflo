import styled from '@emotion/styled';
import classNames from 'classnames';
import React from 'react';

import type { LabelValue } from '@/types/common.interface';

import { ClassroomNext, ClassroomPrev, ClassroomOptionButton } from '@/components';
import { useClassroomController } from '@/shared/hooks/classroom/player';
import { VideoQualityList } from '@/shared/policy';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { classroomMedia } from '@/styles/mixins';

interface ClassroomContentControllerProps {
  selectedVideoQuality: LabelValue;
  setSelectedVideoQuality: React.Dispatch<React.SetStateAction<LabelValue>>;
}

const ClassroomContentControllerBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.2rem;
  ${legacyTypographyMixin('caption')}
  font-weight: 700;

  ${classroomMedia('medium')} {
    width: 41.4rem;
    margin: 0 auto;
  }

  ${classroomMedia('large')} {
    height: var(--classroom-content-controller-large-viewport-height);
  }

  .prev {
    margin-right: 1.2rem;
    padding: 0.4rem 0.8rem 0.4rem 0.4rem;
  }

  .next {
    padding: 0.4rem 0.4rem 0.4rem 0.8rem;
  }

  .quality-label {
    ${legacyTypographyMixin('caption')}
    margin-right: 0.8rem;
    margin-left: auto;
    font-weight: 400;
    color: var(--legacy-color-gray-400);
  }

  .video-quality-list {
    width: 7.4rem;
  }
`;

const ControllerButton = styled.div`
  display: inline-flex;
  gap: 0.2rem;
  align-items: center;
  border-radius: 0.4rem;

  &:hover {
    background-color: var(--legacy-color-gray-700);
    cursor: pointer;
  }

  &.disable {
    opacity: 0.3;
    pointer-events: none;
  }
`;

const ClassroomContentController = ({
  selectedVideoQuality,
  setSelectedVideoQuality,
}: ClassroomContentControllerProps) => {
  const { isFirstContent, isLastContent, playNextPrevContent } = useClassroomController();

  return (
    <ClassroomContentControllerBlock>
      <ControllerButton
        className={classNames(['prev', { disable: isFirstContent }])}
        onClick={() => playNextPrevContent(-1)}
      >
        <ClassroomPrev />
        이전강의
      </ControllerButton>
      <ControllerButton
        className={classNames(['next', { disable: isLastContent }])}
        onClick={() => playNextPrevContent(1)}
      >
        다음강의
        <ClassroomNext />
      </ControllerButton>
      <span className="quality-label">화질설정</span>
      <ClassroomOptionButton
        className="video-quality-list"
        direction="up"
        list={VideoQualityList}
        selectedItem={selectedVideoQuality}
        setListItem={(value) => {
          setSelectedVideoQuality(value);
        }}
      />
    </ClassroomContentControllerBlock>
  );
};

export default ClassroomContentController;
