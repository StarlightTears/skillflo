import { ReactNode } from 'react';

export interface ModalOption {
  visible: boolean;
  title: string;
  content: ReactNode;
  size: ModalSize;
  hasCloseButton?: boolean;
  hideCancelButton?: boolean;
  hasContentHr?: boolean;
  hideHeader?: boolean;
  hideFooter?: boolean;
  fullScreen?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export type ModalSize = 'small' | 'medium' | 'fit';
