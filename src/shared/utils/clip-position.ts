import { getLocalStorageItem, setLocalStorageItem } from '@day1co/browser-util';
import { TimeRange } from '@day1co/pebbles/lib/time-range';

export interface Progress {
  position: number;
  percent: number;
  duration: number;
  interval?: number | undefined | null;
}

interface ClipPositionProps {
  positionRangeListId: string;
  positionListMaxLength?: number;
  positionRangePollingTime?: number;
  sendTimeRangeHandler: (list: TimeSection[], lastPosition: Progress) => void;
}
interface TimeSection {
  start: number;
  end: number;
  interval: number;
}

export class ClipPosition {
  positionRangeListId: string;
  positionListMaxLength: number;
  playerEventStartAt: number | null;
  playerEventInterval: number | null;
  positionList: Progress[];
  lastPosition: Progress | null;
  positionRangePolling: ReturnType<typeof setInterval> | null;
  positionRangePollingTime: number;
  sendTimeRangeHandler: (list: TimeSection[], lastPosition: Progress) => void;

  constructor({
    positionRangeListId,
    positionListMaxLength,
    positionRangePollingTime,
    sendTimeRangeHandler,
  }: ClipPositionProps) {
    this.playerEventStartAt = null;
    this.playerEventInterval = null;
    this.positionList = [];
    this.lastPosition = null;
    this.positionListMaxLength = positionListMaxLength || 40;
    this.positionRangeListId = positionRangeListId;
    this.positionRangePolling = null;
    this.positionRangePollingTime = positionRangePollingTime || 60000;
    this.sendTimeRangeHandler = sendTimeRangeHandler;

    this.initPositionRangeList();
  }
  setPlayerEventStartAt(value: number | null) {
    this.playerEventStartAt = value;
  }
  initVariable() {
    this.playerEventStartAt = null;
    this.playerEventInterval = null;
    this.positionRangePolling = null;
    this.positionList = [];
  }
  initPositionRangeList() {
    if (!getLocalStorageItem(this.positionRangeListId)) {
      setLocalStorageItem(this.positionRangeListId, JSON.stringify([]));
    }
  }
  doActionByPlayerState(state: string) {
    switch (state) {
      case 'PLAY':
        this.setPlayerEventStartAt(Date.now());
        this.pollingPositionRange();
        return;
      case 'PROGRESS':
        if (this.positionList.length >= this.positionListMaxLength) {
          this.pushPositionRangeToLocalStorage();
        }
        return;
      case 'PAUSE':
        this.stopPollingPositionRange();
        this.setPlayerEventStartAt(null);
        this.sendTimeRange();
        return;
    }
  }
  createTimeRange() {
    const clipPositionRangeList = JSON.parse(getLocalStorageItem(this.positionRangeListId));
    const timeRange = new TimeRange(clipPositionRangeList);
    timeRange.merge();
    return timeRange;
  }
  setPositionRangeList(list: TimeSection[]) {
    setLocalStorageItem(this.positionRangeListId, JSON.stringify(list));
  }
  savePositionRangeWithEndPosition(timeRange: TimeRange) {
    // merge할 때 정렬이 되므로, 마지막 시청기록의 end position을 저장해서 이후 시청기록을 이어나가도록 한다
    const mergedPositionRangeList = timeRange.value();
    const positionRangeList = JSON.parse(getLocalStorageItem(this.positionRangeListId));
    const lastPositionRange = positionRangeList[positionRangeList.length - 1];
    if (lastPositionRange) {
      mergedPositionRangeList.push({
        start: lastPositionRange.end,
        end: lastPositionRange.end,
        interval: 0,
      });
      this.setPositionRangeList(mergedPositionRangeList);
    }
  }
  async sendTimeRange(isBeforeDestroy?: boolean) {
    this.pushPositionRangeToLocalStorage();
    const timeRange = this.createTimeRange();
    await this.sendTimeRangeHandler(timeRange.value(), this.lastPosition as Progress);
    this.savePositionRangeWithEndPosition(timeRange);
    if (isBeforeDestroy) {
      this.stopPollingPositionRange();
    }
  }
  calcPlayerEventInterval() {
    if (this.playerEventStartAt) {
      const now = Date.now();
      this.playerEventInterval = now - this.playerEventStartAt;
      this.playerEventStartAt = now;
    }
  }
  pushPositionWithInterval(position: Progress) {
    this.calcPlayerEventInterval();
    position.interval = this.playerEventStartAt ? (this.playerEventInterval as number) / 1000 : 0;
    this.positionList.push(position);
    this.lastPosition = position;
    this.doActionByPlayerState('PROGRESS');
  }
  pushPositionRangeToLocalStorage(isSeeked?: boolean) {
    if (!isSeeked && this.positionList.length === 0) {
      return;
    }
    const positionRange: Partial<TimeSection> = {};
    const positionRangeList = JSON.parse(getLocalStorageItem(this.positionRangeListId));
    const lastPosition = this.positionList[this.positionList.length - 1];
    if (isSeeked) {
      positionRange.start = lastPosition.position;
      positionRange.end = lastPosition.position;
      positionRange.interval = 0;
    } else {
      const lastPositionRange = positionRangeList[positionRangeList.length - 1];
      positionRange.start = positionRangeList.length > 0 ? lastPositionRange.end : 0;
      positionRange.end = lastPosition.position;
      positionRange.interval = this.positionList.reduce((prev, current) => prev + (current.interval as number), 0);
    }
    positionRangeList.push(positionRange);
    this.setPositionRangeList(positionRangeList);
    this.positionList = [];
  }
  pollingPositionRange() {
    this.positionRangePolling = setInterval(() => {
      this.sendTimeRange();
    }, this.positionRangePollingTime);
  }
  stopPollingPositionRange() {
    if (this.positionRangePolling) {
      clearInterval(this.positionRangePolling);
    }
  }
}
