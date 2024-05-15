import { createSlice } from '@reduxjs/toolkit';

import { getLocalStorageItem, setLocalStorageItem } from '@day1co/browser-util';

import { setAccessTokenInRequestHeaders, setMemberTokenInRequestHeaders } from '@/shared/api';
import config from '@/shared/config';

const slice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: getLocalStorageItem(config.ACCESS_TOKEN),
    memberToken: getLocalStorageItem(config.MEMBER_TOKEN),
  },
  reducers: {
    setAccessToken(state, action) {
      setLocalStorageItem(config.ACCESS_TOKEN, action.payload);
      setAccessTokenInRequestHeaders(action.payload);
      state.accessToken = action.payload;
    },
    setMemberToken(state, action) {
      setLocalStorageItem(config.MEMBER_TOKEN, action.payload);
      setMemberTokenInRequestHeaders(action.payload);
      state.memberToken = action.payload;
    },
  },
});

export default {
  reducer: slice.reducer,
  actions: {
    ...slice.actions,
  },
};
