import React from 'react';

import { Modal } from '@/components';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { slices } from '@/shared/store/slices';

const ReduxModal = () => {
  const option = useAppSelector((state) => state.modal.option);
  const { setOption } = slices.modal.actions;
  const dispatch = useAppDispatch();

  const closeModal = () => {
    option.onCancel?.();
    dispatch(setOption({ visible: false }));
  };

  if (!option.visible) return null;

  return (
    <Modal
      size={option.size}
      hideHeader={option.hideHeader}
      fullScreen={option.fullScreen}
      title={option.title}
      content={option.content}
      hasCloseButton={option.hasCloseButton}
      hideCancelButton={option.hideCancelButton}
      hasContentHr={option.hasContentHr}
      onConfirm={option.onConfirm}
      onCloseModal={closeModal}
      confirmButtonText={option.confirmButtonText}
      cancelButtonText={option.cancelButtonText}
    />
  );
};

export default ReduxModal;
