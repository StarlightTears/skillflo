import styled from '@emotion/styled';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import slices from '@/shared/store/slices';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const ToastBlock = styled.div<{ visible: boolean }>`
  ${legacyTypographyMixin('body2')}
  position: fixed;
  left: 50%;
  ${({ visible }) => visible && 'z-index: var(--z-toast);'}
  width: 32.8rem;
  padding: 1.4rem 3.4rem;
  border-radius: 0.6rem;
  background-color: var(--legacy-color-gray-800);
  font-weight: 700;
  color: var(--color-white);
  text-align: center;
  white-space: pre;
  transition: transform ease 300ms;
  transform: ${({ visible }) => (visible ? 'translate(-50%, 3.2rem)' : 'translate(-50%,-8rem)')};
`;

const Toast = () => {
  const ANIMATION_DURATION = 300;
  const ANIMATION_DELAY = 1200;
  const option = useAppSelector((state) => state.toast.option);
  const { setOption } = slices.actions.toast;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (option.visible) {
      setTimeout(() => {
        dispatch(setOption({ visible: false }));
      }, ANIMATION_DELAY + ANIMATION_DURATION);
    }
  }, [option.visible]);

  return (
    <ToastBlock
      visible={option.visible}
      data-e2e="toast"
      onTransitionEnd={() => {
        if (option.visible) return;
        dispatch(setOption({ content: '' }));
      }}
    >
      {option.content}
    </ToastBlock>
  );
};

export default Toast;
