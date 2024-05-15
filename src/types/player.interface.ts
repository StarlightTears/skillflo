export interface PlayerCommand {
  type: 'none' | 'play' | 'pause';
  position?: number;
}

export interface PlayerProgress {
  percent: number;
  position: number;
  duration: number;
}

export interface KollusPlayerInfo {
  speed?: number;
  volume?: number;
}

export interface TimeSection {
  start: number;
  end: number;
  interval: number;
}

export interface VideoProgressStorage {
  timeRange: TimeSection[];
  position: number;
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
