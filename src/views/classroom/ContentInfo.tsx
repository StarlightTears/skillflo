import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import type { Asset } from '@/types/asset.interface';

import { TaskContent, Badge, ClassroomAssetsSelect, ClassroomExclude, ClassroomQuestionAnswer } from '@/components';
import { useModal, useViewport } from '@/shared/hooks';
import {
  useClassroomParams,
  useCurrentCourseContent,
  useCourseContentTaskList,
  useClassroomCourse,
} from '@/shared/hooks/classroom';
import { usePlayerCommand } from '@/shared/hooks/classroom/player';
import { useProduct } from '@/shared/hooks/useProduct';
import { useSupplementList } from '@/shared/hooks/useSupplementList';
import { QUERY_KEYS } from '@/shared/policy';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { classroomMedia } from '@/styles/mixins';

interface ClassroomContentInfoProps {
  isOpenAside: boolean;
}

const ClassroomContentInfoBlock = styled.footer`
  display: flex;
  align-items: center;
  padding: 1.6rem;
  background-color: var(--legacy-color-gray-900);

  ${classroomMedia('small', 'medium')} {
    flex-direction: column;
    align-items: flex-start;
    border-top: 0.1rem solid var(--legacy-color-gray-800);
  }

  ${classroomMedia('medium')} {
    width: 41.4rem;
    margin: 0 auto;
  }

  ${classroomMedia('large')} {
    height: var(--classroom-content-info-large-viewport-height);
    border-top: 0.1rem solid var(--legacy-color-gray-800);
  }
`;

const ClassroomContentInfoTitle = styled.div`
  ${legacyTypographyMixin('body2')}
  font-weight: 700;

  ${classroomMedia('small', 'medium')} {
    margin-top: 0.8rem;
  }

  ${classroomMedia('large')} {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 100%;
    margin-left: 1.2rem;
    white-space: pre-wrap;
    ${legacyTypographyMixin('body1')};
  }
`;

const ClassroomContentInfoAssets = styled.div`
  display: flex;
  margin-left: auto;
`;

const ClassroomContentInfo = ({ isOpenAside }: ClassroomContentInfoProps) => {
  const { productId, courseId, courseContentId } = useClassroomParams();
  const { isMeetCourse } = useClassroomCourse();
  const { isLargeViewport } = useViewport('classroom');
  const { openModal } = useModal();
  const courseContent = useCurrentCourseContent();
  const taskList = useCourseContentTaskList();
  const { data: product } = useProduct(productId);

  const supplementList = useSupplementList(courseContent?.extras.supplementIds || [], Number(courseContentId));

  const navigate = useNavigate();
  const { setPlayerCommand } = usePlayerCommand();

  const getSupplement = (item: Asset) => {
    window.open(item.url, '_blank');
  };

  const navigateTask = (task: Asset) => {
    if (task.evaluateState !== 'NONE') {
      navigate(`/task/${task.id}/${productId}/${courseId}/${courseContentId}`);
      return;
    }
    setPlayerCommand({ type: 'pause' });
    openModal({
      title: '과제',
      size: 'medium',
      hasCloseButton: true,
      hasContentHr: true,
      content: (
        <TaskContent
          taskId={task.id as number}
          productId={productId}
          courseId={courseId}
          courseContentId={courseContentId}
          queryKeyToReload={QUERY_KEYS.COURSE_CONTENT_TASK(task.id as number, productId, courseId, courseContentId)}
        />
      ),
      confirmButtonText: '저장',
    });
  };

  return (
    <ClassroomContentInfoBlock>
      {!isMeetCourse && (
        <Badge
          css={css`
            width: 6rem;
          `}
          theme="blue"
          size="medium"
        >
          학습중 <ClassroomExclude />
        </Badge>
      )}
      <ClassroomContentInfoTitle>{courseContent?.name}</ClassroomContentInfoTitle>
      {isLargeViewport && (
        <ClassroomContentInfoAssets>
          <ClassroomAssetsSelect
            css={css`
              width: 7.7rem;
            `}
            assetsList={taskList}
            label="과제"
            onClickAssetItem={navigateTask}
          />
          <ClassroomAssetsSelect
            css={css`
              width: 10.1rem;
            `}
            assetsList={supplementList}
            label="강의자료"
            onClickAssetItem={getSupplement}
          />
        </ClassroomContentInfoAssets>
      )}
      {isOpenAside && !isLargeViewport && product?.extras && <ClassroomQuestionAnswer />}
    </ClassroomContentInfoBlock>
  );
};

export default ClassroomContentInfo;
