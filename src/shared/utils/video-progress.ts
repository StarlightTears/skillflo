import { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem } from '@day1co/browser-util';
import { NumberUtil } from '@day1co/pebbles';
import { TimeRange } from '@day1co/pebbles/lib/time-range';

import type { HttpClientError } from '@/types/api.interface';
import type { VideoProgressStorage } from '@/types/player.interface';

const KOLLUS_PLAYER_PROGRESS_POSITION_DECIMAL_PLACE = 5;

interface VideoProgressProps {
  storageId?: string;
  progressListMaxLength?: number;
  updateVideoProgressHandler: (videoProgressStorage: VideoProgressStorage) => Promise<unknown>;
  callbackAfterPlay?: (videoProgressStorage: VideoProgressStorage) => void;
  callbackAfterSeeked?: (videoProgressStorage: VideoProgressStorage) => void;
  callbackAfterPause?: (videoProgressStorage: VideoProgressStorage) => void;
  callbackAfterDone?: (videoProgressStorage: VideoProgressStorage) => void;
}

interface VideoProgressUpdateHandlerProps {
  callback?: () => void;
  errorCallback?: (error: HttpClientError) => void;
}

export class VideoProgress {
  storageId: string;
  playerState: 'none' | 'play' | 'pause' | 'done';
  progressList: number[];
  progressListMaxLength: number;
  isFirstPlay: boolean;
  worker: Worker | ReturnType<typeof setInterval> | null;
  intervalId: ReturnType<typeof setInterval> | null;

  updateVideoProgressHandler: (videoProgressStorage: VideoProgressStorage) => Promise<unknown>;
  callbackAfterPlay?: (videoProgressStorage: VideoProgressStorage) => void;
  callbackAfterSeeked?: (videoProgressStorage: VideoProgressStorage) => void;
  callbackAfterPause?: (videoProgressStorage: VideoProgressStorage) => void;
  callbackAfterDone?: (videoProgressStorage: VideoProgressStorage) => void;

  constructor({
    storageId,
    progressListMaxLength,
    updateVideoProgressHandler,
    callbackAfterPlay,
    callbackAfterSeeked,
    callbackAfterPause,
    callbackAfterDone,
  }: VideoProgressProps) {
    this.storageId = storageId || '';
    this.playerState = 'none';
    this.progressList = [];
    this.progressListMaxLength = progressListMaxLength || 10;
    this.isFirstPlay = true;
    this.worker = null;
    this.intervalId = null;

    this.updateVideoProgressHandler = updateVideoProgressHandler;
    this.callbackAfterPlay = callbackAfterPlay;
    this.callbackAfterSeeked = callbackAfterSeeked;
    this.callbackAfterPause = callbackAfterPause;
    this.callbackAfterDone = callbackAfterDone;
  }
  initialize({
    storageId,
    progressListMaxLength,
    updateVideoProgressHandler,
    callbackAfterPlay,
    callbackAfterSeeked,
    callbackAfterPause,
    callbackAfterDone,
  }: VideoProgressProps) {
    this.storageId = storageId || '';
    this.playerState = 'none';
    this.progressList = [];
    this.progressListMaxLength = progressListMaxLength || 10;
    this.isFirstPlay = true;
    this.worker = null;
    this.intervalId = null;

    this.updateVideoProgressHandler = updateVideoProgressHandler;
    this.callbackAfterPlay = callbackAfterPlay;
    this.callbackAfterSeeked = callbackAfterSeeked;
    this.callbackAfterPause = callbackAfterPause;
    this.callbackAfterDone = callbackAfterDone;
  }
  runProcessByPlayEvent() {
    this.playerState = 'play';

    // 첫 play시 seeking-seeked event가 2번 실행되는 현상 대응
    if (this.isFirstPlay) {
      // firefox에서는 재생전 position 0인 progress가 전달되지 않는 상황 대응
      if (!this.progressList.length) this.progressList = [0];
      setTimeout(() => {
        this.isFirstPlay = false;
      }, 500);
    }

    const storage = this.createVideoProgressStorage();

    if (this.callbackAfterPlay) {
      this.callbackAfterPlay(storage);
    }
  }
  runProcessByProgressEvent(progress: number) {
    this.progressList.push(progress);

    if (this.progressList.length >= this.progressListMaxLength) {
      this.mergeVideoProgressToLocalStorage();
    }
  }
  runProcessBySeekedEvent() {
    // 첫 play시 seeking-seeked event가 2번 실행되는 현상 대응
    if (this.isFirstPlay) return;

    this.clearProgressListExceptLastProgress();
    const storage = this.createVideoProgressStorage();

    if (this.callbackAfterSeeked) {
      this.callbackAfterSeeked(storage);
    }
    this.clearProgressListExceptLastProgress();
  }
  runProcessByPauseEvent({ errorCallback }: Pick<VideoProgressUpdateHandlerProps, 'errorCallback'>) {
    this.playerState = 'pause';

    this.mergeVideoProgressToLocalStorage();
    const mergedStorage = this.getVideoProgressStorageInLocal();

    const storageId = this.storageId;

    this.updateVideoProgressHandler(mergedStorage as VideoProgressStorage)
      .then(() => {
        if (this.callbackAfterPause) {
          this.callbackAfterPause(mergedStorage as VideoProgressStorage);
        }
        removeLocalStorageItem(storageId);
      })
      .catch((error) => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  }
  runProcessByDoneEvent() {
    this.playerState = 'done';

    this.mergeVideoProgressToLocalStorage();
    const mergedStorage = this.getVideoProgressStorageInLocal();

    if (this.callbackAfterDone) {
      this.callbackAfterDone(mergedStorage as VideoProgressStorage);
    }
  }
  getPlayerState() {
    return this.playerState;
  }
  getFirstProgress() {
    return this.progressList[0];
  }
  getLastProgress() {
    return this.progressList[this.progressList.length - 1];
  }
  clearProgressListExceptLastProgress() {
    this.progressList = [this.getLastProgress()];
  }
  clearProgressListExceptSpecificProgress(progress: number) {
    this.progressList = [progress];
  }
  createTimeSection() {
    const firstProgress = this.getFirstProgress();
    const lastProgress = this.getLastProgress();

    // player 오작동(로딩화면) 대응 (이어보기 -> player 자동재생 -> 로딩 -> pause의 경우 구간기록이 음수가 발생할 수 있다)
    // end - start의 결과가 음수의 경우, start/end/interval 값을 모두 0으로 보정하도록 한다
    const isFirstProgressSmallerThanLastProgress = lastProgress >= firstProgress;

    return {
      start: isFirstProgressSmallerThanLastProgress ? firstProgress : 0,
      end: isFirstProgressSmallerThanLastProgress ? lastProgress : 0,
      interval: isFirstProgressSmallerThanLastProgress
        ? this.calcIntervalFloatingPointSafe(lastProgress, firstProgress)
        : 0,
    };
  }
  createVideoProgressStorage() {
    return { timeRange: [this.createTimeSection()], position: this.getLastProgress() };
  }
  getVideoProgressStorageInLocal(): VideoProgressStorage | null {
    const lastStorage: string | null = getLocalStorageItem(this.storageId);
    return lastStorage ? JSON.parse(lastStorage) : lastStorage;
  }
  mergeVideoProgressToLocalStorage() {
    const storage = this.createVideoProgressStorage();
    const lastStorage = this.getVideoProgressStorageInLocal();

    if (lastStorage) {
      const timeRange = new TimeRange(
        [...lastStorage.timeRange, ...storage.timeRange],
        KOLLUS_PLAYER_PROGRESS_POSITION_DECIMAL_PLACE
      );
      timeRange.merge();
      storage.timeRange = timeRange.value();
    }

    setLocalStorageItem(this.storageId, JSON.stringify(storage));

    this.clearProgressListExceptLastProgress();
  }
  getMergedVideoProgressStorage() {
    this.mergeVideoProgressToLocalStorage();
    return this.getVideoProgressStorageInLocal();
  }
  updateLastVideoProgress({ callback, errorCallback }: VideoProgressUpdateHandlerProps) {
    const mergedStorage = this.getMergedVideoProgressStorage();

    const storageId = this.storageId;

    this.updateVideoProgressHandler(mergedStorage as VideoProgressStorage)
      .then(() => {
        if (callback) {
          callback();
        }
        removeLocalStorageItem(storageId);
      })
      .catch((error) => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  }
  setUpdateWorker(worker: Worker) {
    this.worker = worker;
  }
  setUpdateInterval(id: ReturnType<typeof setInterval>) {
    this.intervalId = id;
  }
  clearUpdateTimer() {
    if (window.Worker) {
      if (this.worker) {
        (this.worker as Worker).terminate();
      }
    } else {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }
  }
  calcIntervalFloatingPointSafe(end: number, start: number) {
    const endDecimal = NumberUtil.decimalRoundUp(end, KOLLUS_PLAYER_PROGRESS_POSITION_DECIMAL_PLACE);
    const startDecimal = NumberUtil.decimalRoundUp(start, KOLLUS_PLAYER_PROGRESS_POSITION_DECIMAL_PLACE);

    const intervalFloatingPointSafe = NumberUtil.decimalRoundDown(
      endDecimal - startDecimal,
      KOLLUS_PLAYER_PROGRESS_POSITION_DECIMAL_PLACE
    );

    return intervalFloatingPointSafe;
  }
}
