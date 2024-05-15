import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { Player } from '@fastcampus/fastcomponents';

import ClassroomContentController from './ContentController';

import { useClassroomPlayer } from '@/shared/hooks/classroom/player';
import { classroomMedia } from '@/styles/mixins';

const ClassroomContentPlayerBlock = styled.div`
  ${classroomMedia('small', 'medium')} {
    height: var(--classroom-player-small-large-viewport-height);
  }

  ${classroomMedia('medium')} {
    width: 41.4rem;
    height: calc(41.4rem * (9 / 16));
    margin: 0 auto;
  }

  ${classroomMedia('large')} {
    height: calc(
      100vh - var(--classroom-content-info-large-viewport-height) - var(
          --classroom-content-controller-large-viewport-height
        )
    );
  }
`;

const ClassroomContentPlayer = () => {
  const {
    videoSrc,
    command,
    speed,
    volume,
    onReady,
    onPlay,
    onPause,
    onProgress,
    onDone,
    onSeeked,
    onScriptLoadError,
    selectedVideoQuality,
    setSelectedVideoQuality,
    onSpeedChanged,
    onVolumeChanged,
  } = useClassroomPlayer();
  return (
    <>
      <ClassroomContentPlayerBlock>
        <Player
          css={css`
            height: 100%;
          `}
          src={videoSrc}
          speed={speed}
          volume={volume}
          command={command}
          onReady={onReady}
          onSpeedChanged={onSpeedChanged}
          onVolumeChanged={onVolumeChanged}
          onPlay={onPlay}
          onProgress={onProgress}
          onPause={onPause}
          onSeeked={onSeeked}
          onDone={onDone}
          errorHandler={onScriptLoadError}
        />
      </ClassroomContentPlayerBlock>
      <ClassroomContentController
        selectedVideoQuality={selectedVideoQuality}
        setSelectedVideoQuality={setSelectedVideoQuality}
      />
    </>
  );
};

export default ClassroomContentPlayer;
