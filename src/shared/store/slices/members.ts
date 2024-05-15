import { createSlice } from '@reduxjs/toolkit';

import type { Member } from '@/types/member.interface';

interface InitialState {
  members: Member[];
  currentMember: Member | null;
}

const initialState: InitialState = {
  members: [],
  currentMember: null,
};

const slice = createSlice({
  name: 'members',
  initialState: initialState,
  reducers: {
    setMembers(state, action) {
      state.members = action.payload;
    },
    setCurrentMember(state, action) {
      state.currentMember = action.payload;
    },
  },
});

export default {
  reducer: slice.reducer,
  actions: {
    ...slice.actions,
  },
};
