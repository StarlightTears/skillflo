import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { ModalOption } from '@/types/modal.interface';

const initialOption: ModalOption = {
  visible: false,
  title: '',
  content: '',
  size: 'small',
  hasCloseButton: false,
  hideCancelButton: false,
  hasContentHr: false,
  hideHeader: false,
  hideFooter: false,
  fullScreen: false,
  onConfirm: () => {
    console.info('onConfirm');
  },
  confirmButtonText: '확인',
  cancelButtonText: '취소',
};

const slice = createSlice({
  name: 'modal',
  initialState: { option: initialOption },
  reducers: {
    setOption(state, action: PayloadAction<Partial<ModalOption>>) {
      state.option = { ...initialOption, ...action.payload };
    },
    modifyOption(state, action) {
      state.option = { ...state.option, ...action.payload };
    },
  },
});

export default {
  reducer: slice.reducer,
  actions: {
    ...slice.actions,
  },
};
