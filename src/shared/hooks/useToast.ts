import { useAppDispatch } from '@/shared/hooks';
import { slices } from '@/shared/store/slices';

interface ToastOption {
  content: string;
}

export const useToast = () => {
  const dispatch = useAppDispatch();
  const { setOption } = slices.toast.actions;

  return {
    openToast: ({ content }: ToastOption) => {
      dispatch(setOption({ visible: true, content }));
    },
  };
};
