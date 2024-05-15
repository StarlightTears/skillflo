export interface ClipPositionInstance {
  lastPosition: Progress;
  positionList: Progress[];
  doActionByPlayerState(event: string): () => void;
  pushPositionRangeToLocalStorage(isSeeked: boolean): () => void;
  pushPositionWithInterval(progress: Progress): () => void;
  sendTimeRange(isBeforeDestroy: boolean): () => void;
  createTimeRange(): TimeRange;
}

export interface Progress {
  position: number;
  percent: number;
  duration: number;
}

export interface TimeRange {
  value(): TimeSection[];
}

export interface TimeSection {
  start: number;
  end: number;
  interval: number;
}

export interface VideoProgressRecordPayload {
  productId: number;
  courseId: number;
  courseContentId: number;
  extras: {
    timeRange: TimeSection[];
    position: number;
  };
}

export interface MemberClipProgress {
  id: number;
  state: string;
  productId: number;
  courseId: number;
  courseContentId: number;
  memberId: number;
  extras: {
    position: number;
    timeRange: TimeSection[];
  };
}
