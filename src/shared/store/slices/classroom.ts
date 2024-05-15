import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Command, VgController } from '@fastcampus/fastcomponents';

import type { VideoProgress } from '@/shared/utils/video-progress';
import type { Progress } from '@/types/clipPosition.interface';

interface ClassroomState {
  isOpenAside: boolean;
  playerProgress: Progress;
  playerCommand: Command;
  vgController: VgController | null;
  videoProgressInstance: VideoProgress | null;
  isFloatingChatOpened: boolean;
}

const initialState: ClassroomState = {
  isOpenAside: true,
  playerProgress: { position: 0, percent: 0, duration: 0 },
  playerCommand: { type: 'none' },
  vgController: null,
  videoProgressInstance: null,
  isFloatingChatOpened: false,
};

const slice = createSlice({
  name: 'classroom',
  initialState: initialState,
  reducers: {
    setIsOpenAside(state, action) {
      state.isOpenAside = action.payload;
    },
    setPlayerProgress(state, action: PayloadAction<Progress>) {
      state.playerProgress = action.payload;
    },
    setPlayerCommand(state, action: PayloadAction<Command>) {
      state.playerCommand = action.payload;
    },
    setVgController(state, action: PayloadAction<VgController>) {
      state.vgController = action.payload;
    },
    setVideoProgressInstance(state, action: PayloadAction<VideoProgress | null>) {
      state.videoProgressInstance = action.payload;
    },
    setIsFloatingChatOpened(state, action: PayloadAction<boolean>) {
      state.isFloatingChatOpened = action.payload;
    },
  },
});

export default {
  reducer: slice.reducer,
  actions: {
    ...slice.actions,
  },
};
