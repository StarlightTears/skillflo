import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channelTalk',
  initialState: {
    isShowChannelTalkButton: true,
  },
  reducers: {
    showChannelTalkButton(state) {
      state.isShowChannelTalkButton = true;
    },
    hideChannelTalkButton(state) {
      state.isShowChannelTalkButton = false;
    },
  },
});

export default {
  reducer: slice.reducer,
  actions: {
    ...slice.actions,
  },
};
