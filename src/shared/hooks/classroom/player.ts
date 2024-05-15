import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } from '@day1co/browser-util';
import { TimeRange } from '@day1co/pebbles/lib/time-range';

import { useClassroomParams, useClassroomNavigate, useCourseContentListByContentIndex } from '.';

import { useTotalScore } from '../enrollment';
import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';
import { useCurrentMember } from '../useCurrentMember';
import { useErrorHandler } from '../useErrorHandler';
import { useModal } from '../useModal';
import { useProduct } from '../useProduct';

import type { HttpClientError } from '@/types/api.interface';
import type { VideoInfo } from '@/types/classroom.interface';
import type { LabelValue } from '@/types/common.interface';
import type {
  PlayerCommand,
  VideoProgressStorage,
  PlayerProgress,
  VideoProgressRecordPayload,
  KollusPlayerInfo,
} from '@/types/player.interface';

import { getVideoInfo, startVideoProgress, updateVideoProgress, completeVideoProgress } from '@/shared/api/classroom';
import config from '@/shared/config';
import {
  QUERY_KEYS,
  VideoQualityList,
  PLAYER_UPDATE_INTERVAL,
  DEFAULT_PLAYER_SPEED,
  DEFAULT_PLAYER_VOLUME,
} from '@/shared/policy';
import slices from '@/shared/store/slices';
import { getLogger } from '@/shared/utils/logger';
import { VideoProgress } from '@/shared/utils/video-progress';

const logger = getLogger('hooks', 'player');

export const usePlayerCommand = () => {
  const dispatch = useAppDispatch();
  const { setPlayerCommand: createPlayerCommandAction } = slices.actions.classroom;

  return {
    setPlayerCommand: (command: PlayerCommand) => dispatch(createPlayerCommandAction(command)),
  };
};

export const useVideoProgress = () => {
  let timerId: ReturnType<typeof setTimeout>;
  const UPDATE_DELAY = 1000;

  const { mutateAsync: sendStartVideoProgress } = useMutation((payload: VideoProgressRecordPayload) => {
    return startVideoProgress(payload);
  });
  const { mutateAsync: sendUpdateVideoProgress } = useMutation((payload: VideoProgressRecordPayload) => {
    return updateVideoProgress(payload);
  });
  const { mutateAsync: sendCompleteVideoProgress } = useMutation((payload: VideoProgressRecordPayload) => {
    return completeVideoProgress(payload);
  });

  const debouncedUpdateVideoProgress = (payload: VideoProgressRecordPayload) => {
    if (timerId) clearTimeout(timerId);

    const timeRangeInstance = new TimeRange(payload.extras.timeRange);
    timeRangeInstance.merge();

    return new Promise((resolve, reject) => {
      timerId = setTimeout(() => {
        sendUpdateVideoProgress({ ...payload, extras: { ...payload.extras, timeRange: timeRangeInstance.value() } })
          .then(() => {
            resolve(true);
          })
          .catch(reject);
      }, UPDATE_DELAY);
    });
  };

  return {
    sendStartVideoProgress,
    sendUpdateVideoProgress,
    sendCompleteVideoProgress,
    debouncedUpdateVideoProgress,
  };
};

export const useClassroomController = () => {
  const { courseContentId: currentCourseContentId } = useClassroomParams();
  const classroomNavigate = useClassroomNavigate();

  const courseContentIdList = useCourseContentListByContentIndex();

  const currentContentIndex = courseContentIdList.findIndex((id) => id === Number(currentCourseContentId));

  const playNextPrevContent = (direction: number) => {
    const foundContentId = courseContentIdList[currentContentIndex + direction];
    if (foundContentId) {
      classroomNavigate({ courseContentId: foundContentId });
    }
  };

  return {
    isFirstContent: courseContentIdList.indexOf(currentCourseContentId) === 0,
    isLastContent: courseContentIdList.indexOf(currentCourseContentId) === courseContentIdList.length - 1,
    playNextPrevContent,
  };
};

export const useClassroomPlayer = () => {
  const dispatch = useAppDispatch();
  const { productId, courseId, courseContentId } = useClassroomParams();
  const { openModal, closeModal } = useModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { putTotalScore } = useTotalScore(productId, courseId);
  const { debouncedUpdateVideoProgress, sendUpdateVideoProgress } = useVideoProgress();
  const { playNextPrevContent } = useClassroomController();
  const { setPlayerCommand } = usePlayerCommand();
  const { data: product } = useProduct(productId);
  const currentPlayerInfo = JSON.parse(getLocalStorageItem('KOLLUS_PLAYER_INFO') || '{}');

  const errorHandler = useErrorHandler();

  const [videoSrc, setVideoSrc] = useState('');
  const [selectedVideoQuality, setSelectedVideoQuality] = useState<LabelValue>(VideoQualityList[0]);
  const volume = currentPlayerInfo['volume'] ?? DEFAULT_PLAYER_VOLUME;
  const speed = currentPlayerInfo['speed'] ?? DEFAULT_PLAYER_SPEED;
  const command = useAppSelector((state) => state.classroom.playerCommand);
  const videoProgressInstance = useAppSelector((state) => state.classroom.videoProgressInstance);
  const { setVideoProgressInstance, setPlayerProgress } = slices.actions.classroom;
  const lastPositionBuffer = useRef<{
    reason: 'FIRST_PLAY' | 'CONTINUE_PLAY' | 'NOTE_PLAY';
    position: number;
    courseContentId?: number;
  }>({ reason: 'FIRST_PLAY', position: 0 });
  const { member } = useCurrentMember();
  const storageId = `LXPVP_${productId}_${courseId}_${courseContentId}_${member?.id}`;

  const updateVideoProgressHandler = (videoProgressStorage: VideoProgressStorage) => {
    return debouncedUpdateVideoProgress({
      productId,
      courseId,
      courseContentId,
      extras: { timeRange: videoProgressStorage.timeRange, position: videoProgressStorage.position },
    });
  };

  const updateLearningProgressAndScore = () => {
    queryClient.invalidateQueries(QUERY_KEYS.CLASSROOM_COURSE_LEARNING_PROGRESS_TIME(productId, courseId));
    queryClient.invalidateQueries(QUERY_KEYS.COMPLETED_CONTENT_LIST(productId, courseId));

    putTotalScore().catch((error: HttpClientError) => {
      logger.error(
        '시청기록 업데이트 후 totalScore 업데이트에 실패했습니다.',
        { memberId: member?.id, productId, courseId, courseContentId },
        error
      );
    });
  };

  const initializeVideoProgress = (isAutoplayDisabled = false) => {
    videoProgressInstance?.initialize({
      storageId,
      updateVideoProgressHandler,
      callbackAfterPause() {
        queryClient.invalidateQueries(QUERY_KEYS.CLASSROOM_COURSE_LEARNING_PROGRESS_TIME(productId, courseId));
        queryClient.invalidateQueries(QUERY_KEYS.COMPLETED_CONTENT_LIST(productId, courseId));

        putTotalScore().catch((error: HttpClientError) => {
          logger.error(
            'pause 시청기록 update 이후 totalScore 업데이트에 실패했습니다.',
            { memberId: member?.id, productId, courseId, courseContentId },
            error
          );
        });
      },
      async callbackAfterDone() {
        if (!isAutoplayDisabled) {
          playNextPrevContent(1);
        }
      },
    });
  };

  const setLastPositionBuffer = (videoInfo: VideoInfo) => {
    // 이어보기 설정
    if (Number(searchParams.get('position'))) {
      // 1. 마이페이지 > 노트 play버튼으로 강의장 접근시 - 저장된 포지션에서 재생한다
      lastPositionBuffer.current = { reason: 'NOTE_PLAY', position: Number(searchParams.get('position')) };
      setSearchParams({}, { replace: true });
    } else if (
      // 2. 해상도 변경시 이어보기 모달 - 동일한 courseContentId인 경우 cleanup에서 저장된 positionBuffer를 활용
      lastPositionBuffer.current.reason === 'CONTINUE_PLAY' &&
      lastPositionBuffer.current.courseContentId === courseContentId
    ) {
      true;
    } else if (videoInfo && videoInfo.position > 0) {
      // 3. 기존 시청기록으로 이어보기 모달
      lastPositionBuffer.current = { reason: 'CONTINUE_PLAY', position: videoInfo.position };
    } else {
      // 4. 기존 기록이 없는 경우 첫 재생
      lastPositionBuffer.current = { reason: 'FIRST_PLAY', position: 0 };
    }
  };

  const cleanUpVideoProgressHistory = () => {
    return Promise.allSettled(
      Object.keys(localStorage)
        .filter((key) => {
          const splitKey = key.split('_');
          const parsedMemberId = Number(splitKey[4]);
          return key.includes('LXPVP_') && parsedMemberId === member?.id;
        })
        .map((key) => {
          const splitKey = key.split('_');
          const parsedProductId = Number(splitKey[1]);
          const parsedCourseId = Number(splitKey[2]);
          const parsedCourseContentId = Number(splitKey[3]);

          const localVideoProgressStorage = getLocalStorageItem(key);
          const parsedStorage: VideoProgressStorage = JSON.parse(localVideoProgressStorage);

          return sendUpdateVideoProgress({
            productId: parsedProductId,
            courseId: parsedCourseId,
            courseContentId: parsedCourseContentId,
            extras: { timeRange: parsedStorage.timeRange, position: parsedStorage.position },
          })
            .then(() => {
              removeLocalStorageItem(key);
            })
            .catch((error: HttpClientError) => {
              // 404 에러는 이미 삭제된 컨텐츠이므로 로컬스토리지에서 제거
              if (error.response?.status === 404) {
                removeLocalStorageItem(key);
                logger.error(
                  '삭제된 코스컨텐츠의 시청기록이므로 로컬시청기록을 제거합니다.',
                  { memberId: member?.id, productId, courseId, courseContentId },
                  error
                );
                return;
              }
              logger.error(
                '로컬시청기록 전송에 실패하였습니다. 기존 시청기록이 누락되었을 수 있습니다.',
                { memberId: member?.id, productId, courseId, courseContentId },
                error
              );
              alert('로컬시청기록 전송에 실패하였습니다. 기존 시청기록이 누락되었을 수 있습니다.');
            });
        })
    );
  };

  // 로컬스토리지에 남아있던 시청기록을 서버 전송 hook (강의장 진입시 한번만 진행)
  useEffect(() => {
    if (!member) return;

    cleanUpVideoProgressHistory().finally(() => {
      // 시청기록 모듈 생성
      dispatch(setVideoProgressInstance(new VideoProgress({ storageId, updateVideoProgressHandler })));
    });

    return function cleanUpVideoProgressInstance() {
      dispatch(setVideoProgressInstance(null));
    };
  }, [member]);

  // 시청기록 모듈초기화 / 이어보기 buffer 저장 / 코스컨텐츠 및 화질변경시 video src 변경 hook
  useEffect(() => {
    if (!videoProgressInstance) return;

    getVideoInfo({
      productId,
      courseId,
      courseContentId,
      deviceType: selectedVideoQuality.value as string,
    })
      .then(({ data: { data: videoInfo } }) => {
        initializeVideoProgress(product?.extras.isAutoplayDisabled);
        setLastPositionBuffer(videoInfo);
        setVideoSrc(`${config.KOLLUS_URL}/s?jwt=${videoInfo.jwt}&custom_key=${config.KOLLUS_CUSTOM_KEY}&s=0`);
      })
      .catch((error: HttpClientError) => {
        logger.error(
          '비디오정보를 가져오는데 실패하였습니다. 개발실에 문의해주세요.',
          { memberId: member?.id, productId, courseId, courseContentId },
          error
        );
        alert('비디오정보를 가져오는데 실패하였습니다. 개발실에 문의해주세요.');
      });

    return function sendLastVideoProgress() {
      // 이어보기 모달이 열려있다면 닫아줍니다.(퇴장시, 컨텐츠 변경시)
      closeModal();

      if (!videoProgressInstance) return;

      // 재생중 다른 코스컨텐츠로 변경시 업데이트
      if (videoProgressInstance.getPlayerState() === 'play') {
        videoProgressInstance?.clearUpdateTimer();
        const videoProgressStorage = videoProgressInstance.getMergedVideoProgressStorage();

        // 해상도 변경시 이어보기를 위한 position 저장
        lastPositionBuffer.current = {
          reason: 'CONTINUE_PLAY',
          position: videoProgressStorage?.position || 0,
          courseContentId,
        };

        debouncedUpdateVideoProgress({
          productId,
          courseId,
          courseContentId,
          extras: {
            timeRange: videoProgressStorage?.timeRange || [],
            position: videoProgressStorage?.position || 0,
          },
        })
          .then(() => {
            removeLocalStorageItem(storageId);
            queryClient.invalidateQueries(QUERY_KEYS.CLASSROOM_COURSE_LEARNING_PROGRESS_TIME(productId, courseId));
            queryClient.invalidateQueries(QUERY_KEYS.COMPLETED_CONTENT_LIST(productId, courseId));

            putTotalScore().catch((error: HttpClientError) => {
              logger.error(
                '재생중 다른 컨텐츠로 변경하기 전 totalScore 업데이트에 실패했습니다.',
                { memberId: member?.id, productId, courseId, courseContentId },
                error
              );
            });
          })
          .catch((error: HttpClientError) => {
            logger.error(
              '목차 컨텐츠 변경시 또는 ui 뒤로가기시 시청기록 업데이트에 실패했습니다.',
              { memberId: member?.id, productId, courseId, courseContentId },
              error
            );
            errorHandler(error);
          });
      }
    };
  }, [videoProgressInstance, courseContentId, selectedVideoQuality]);

  // 새로고침, 브라우저 탭종료시 직전 시청기록을 전송
  useEffect(() => {
    const updateVideoProgressBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();

      if (!videoProgressInstance) return;

      if (videoProgressInstance.getPlayerState() === 'play') {
        const videoProgressStorage = videoProgressInstance.getMergedVideoProgressStorage();

        sendUpdateVideoProgress({
          productId,
          courseId,
          courseContentId,
          extras: {
            timeRange: videoProgressStorage?.timeRange || [],
            position: videoProgressStorage?.position || 0,
          },
        })
          .then(() => {
            removeLocalStorageItem(storageId);

            putTotalScore().catch((error: HttpClientError) => {
              logger.error(
                '새로고침, 브라우저 탭 종료 전 totalScore 업데이트에 실패했습니다.',
                { memberId: member?.id, productId, courseId, courseContentId },
                error
              );
            });
          })
          .catch((error: HttpClientError) => {
            logger.error(
              '강의장 이탈 전 시청기록 업데이트에 실패했습니다.',
              { memberId: member?.id, productId, courseId, courseContentId },
              error
            );
            errorHandler(error);
          });
      }

      return (event.returnValue = '강의장을 떠나시겠습니까?');
    };

    window.addEventListener('beforeunload', updateVideoProgressBeforeUnload);

    return function removeUpdateVideoProgressBeforeUnload() {
      window.removeEventListener('beforeunload', updateVideoProgressBeforeUnload);
    };
  }, [videoProgressInstance, courseContentId]);

  const onReady = useCallback(() => {
    switch (lastPositionBuffer.current.reason) {
      case 'CONTINUE_PLAY': // 이어보기
        openModal({
          title: '이어보기 알림',
          content: '이전에 시청한 마지막 장면부터 이어서 보시겠습니까?',
          cancelButtonText: '처음부터 보기',
          confirmButtonText: '이어서 보기',
          onConfirm: () => {
            videoProgressInstance?.clearProgressListExceptSpecificProgress(lastPositionBuffer.current.position);
            setPlayerCommand({ type: 'play', position: lastPositionBuffer.current.position });
            closeModal();
          },
          onCancel: () => {
            videoProgressInstance?.clearProgressListExceptSpecificProgress(0);
            setPlayerCommand({ type: 'play', position: 0 });
            closeModal();
          },
        });
        break;
      case 'FIRST_PLAY': // 첫 재생시
      case 'NOTE_PLAY': // 마이페이지 > 노트 play
      default:
        videoProgressInstance?.clearProgressListExceptSpecificProgress(lastPositionBuffer.current.position);
        setPlayerCommand({ type: 'play', position: lastPositionBuffer.current.position });
        break;
    }
  }, [videoProgressInstance]);

  const onPlay = useCallback(() => {
    // worker가 있는 환경에서는 worker 설정, 없는 환경에서는 setInterval 사용
    if (window.Worker) {
      const worker = new Worker(new URL('./player-update-worker.ts', import.meta.url));
      worker.onmessage = () => {
        videoProgressInstance?.updateLastVideoProgress({
          callback: () => {
            updateLearningProgressAndScore();
          },
          errorCallback: (error) => {
            logger.error(
              'worker를 사용한 시청기록 업데이트에 실패했습니다.',
              { memberId: member?.id, productId, courseId, courseContentId },
              error
            );
            errorHandler(error);
          },
        });
      };
      videoProgressInstance?.setUpdateWorker(worker);
    } else {
      videoProgressInstance?.setUpdateInterval(
        setInterval(() => {
          videoProgressInstance?.updateLastVideoProgress({
            callback: () => {
              updateLearningProgressAndScore();
            },
            errorCallback: (error) => {
              logger.error(
                'worker를 사용하지 않은 시청기록 업데이트에 실패했습니다.',
                { memberId: member?.id, productId, courseId, courseContentId },
                error
              );
              errorHandler(error);
            },
          });
        }, PLAYER_UPDATE_INTERVAL)
      );
    }
    videoProgressInstance?.runProcessByPlayEvent();
  }, [videoProgressInstance]);

  const onPause = useCallback(() => {
    videoProgressInstance?.clearUpdateTimer();
    videoProgressInstance?.runProcessByPauseEvent({
      errorCallback: (error) => {
        logger.error(
          'pause event 시청기록 업데이트에 실패했습니다.',
          { memberId: member?.id, productId, courseId, courseContentId },
          error
        );
        errorHandler(error);
      },
    });
  }, [videoProgressInstance]);

  const onProgress = useCallback(
    (progress: PlayerProgress) => {
      dispatch(setPlayerProgress(progress));
      videoProgressInstance?.runProcessByProgressEvent(progress.position);
    },
    [videoProgressInstance]
  );

  const onDone = useCallback(() => {
    videoProgressInstance?.runProcessByDoneEvent();
  }, [videoProgressInstance]);

  const onSeeked = useCallback(() => {
    videoProgressInstance?.runProcessBySeekedEvent();
  }, [videoProgressInstance]);

  const onSpeedChanged = useCallback((speed: number) => {
    const currentInfo: KollusPlayerInfo = JSON.parse(getLocalStorageItem('KOLLUS_PLAYER_INFO') || '{}');

    const updatedInfo = {
      ...currentInfo,
      speed: speed,
    };
    setLocalStorageItem('KOLLUS_PLAYER_INFO', JSON.stringify(updatedInfo));
  }, []);

  const onVolumeChanged = useCallback((volume: number) => {
    const currentInfo: KollusPlayerInfo = JSON.parse(getLocalStorageItem('KOLLUS_PLAYER_INFO') || '{}');

    const updatedInfo = {
      ...currentInfo,
      volume: volume,
    };
    setLocalStorageItem('KOLLUS_PLAYER_INFO', JSON.stringify(updatedInfo));
  }, []);

  const onScriptLoadError = useCallback(() => {
    logger.error('콜러스 플레이어 스크립트 불러오기를 실패하였습니다. 시청기록이 저장되지 않을 수  있습니다.', {
      memberId: member?.id,
      productId,
      courseId,
      courseContentId,
    });
    alert('콜러스 플레이어 스크립트 불러오기를 실패하였습니다. 시청기록이 저장되지 않을 수  있습니다.');
  }, []);

  return {
    videoSrc,
    command,
    speed,
    volume,
    onReady,
    onPlay,
    onPause,
    onProgress,
    onSpeedChanged,
    onVolumeChanged,
    onDone,
    onSeeked,
    onScriptLoadError,
    selectedVideoQuality,
    setSelectedVideoQuality,
  };
};
