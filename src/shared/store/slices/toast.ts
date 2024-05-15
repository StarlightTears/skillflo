import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

interface ToastOption {
  visible: boolean;
  content: ReactNode;
}

const initialOption: ToastOption = {
  visible: false,
  content: '',
};

const slice = createSlice({
  name: 'toast',
  initialState: { option: initialOption },
  reducers: {
    setOption(state, action: PayloadAction<Partial<ToastOption>>) {
      state.option = { ...state.option, ...action.payload };
    },
    clearOption(state) {
      state.option = initialOption;
    },
  },
});

export default {
  reducer: slice.reducer,
  actions: {
    ...slice.actions,
  },
};
