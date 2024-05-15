import { createSlice, createAction } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'ping',
  initialState: { ping: 'ping' },
  reducers: {
    setPing(state, action) {
      state.ping = action.payload;
    },
  },
});

export default {
  reducer: slice.reducer,
  actions: {
    ...slice.actions,
    checkPing: createAction('CHECK_PING'),
  },
};
