import { ReactNode } from 'react';

export interface CommonSubModalProps {
  title?: string;
  description: ReactNode; // * ReactNode로 바꾸는 날이 오지 않기를 빌며... 🙏🙏🙏
  confirmButtonText?: ReactNode;
  isCriticalAction?: boolean;
  cancleButtonText?: ReactNode;
  onConfirm: () => void;
  onClose?: () => void;
}
