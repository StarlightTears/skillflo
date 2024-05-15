import type { ModalOption } from '@/types/modal.interface';

import { useAppDispatch } from '@/shared/hooks';
import { slices } from '@/shared/store/slices';

export const useModal = () => {
  const dispatch = useAppDispatch();
  const { setOption, modifyOption } = slices.modal.actions;

  return {
    openModal: (modalOption: Partial<Omit<ModalOption, 'visible'>>) => {
      dispatch(setOption({ visible: true, ...modalOption }));
    },
    closeModal: () => {
      dispatch(setOption({ visible: false, content: null }));
    },
    modifyModalOption: (modalOption: Partial<ModalOption>) => {
      dispatch(modifyOption({ ...modalOption }));
    },
  };
};
