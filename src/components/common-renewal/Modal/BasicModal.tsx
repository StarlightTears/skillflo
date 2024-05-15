import styled from '@emotion/styled';
import classNames from 'classnames';
import React, { PropsWithChildren, ReactNode } from 'react';

import { Portal } from '@/components';
import { RenewalButton as Button } from '@/components/common-renewal/RenewalButton';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';
import { PropsWithStyle } from '@/types/component.interface';

interface BasicModalProps {
  confirmButtonText?: ReactNode;
  isCriticalAction?: boolean;
  cancleButtonText?: ReactNode;
  onConfirm: () => void;
  onClose?: () => void;
  disableDimClose?: boolean;
  // ? 프로퍼티로 어떻게 스타일을 잡을지 정할까? 아니면 외부에서 css 스타일을 하도록 할까?
  buttonWrapperStyle?: 'normal' | 'column' | 'stress-confirm';
}

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const ModalDim = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--color-gray-900);
  opacity: 0.8;
`;

const ModalContent = styled.div`
  position: relative;
  justify-self: center;
  overflow: hidden;
  border-radius: 0.6rem;
  background-color: var(--color-white);
  box-shadow: 0 0.2rem 1.2rem -0.2rem var(--scale-color-gray-alpha-100, rgba(22 24 27 / 15%));

  color: var(--color-semantic-informative-primary);

  /* TODO: 신규 디자인 시스템 적용시 수정 가능성 존재 */
`;

const ModalTitleBlock = styled.h3`
  margin: 0 0 0.4rem;

  text-align: center;
  ${renewalTypographyMixin('title', 2)}
`;

const ModalDescriptionBlock = styled.p`
  text-align: center;
  word-break: keep-all;
  ${renewalTypographyMixin('body', 3)}
`;

const ModalButtonWrapper = styled.div`
  display: grid;
  gap: 0.8rem;
  padding: 3.2rem 4rem 4rem;

  &.multiple {
    &.normal {
      grid-template-columns: repeat(2, 1fr);
    }

    &.column {
      display: flex;
      flex-direction: column-reverse;
    }

    &.stress-confirm {
      grid-template-columns: 5.6rem 1fr;
    }
  }
`;

const BasicModal = ({
  confirmButtonText,
  cancleButtonText,
  onClose,
  onConfirm,
  buttonWrapperStyle = 'normal',
  className,
  children,
  disableDimClose,
  isCriticalAction = false,
}: PropsWithStyle<PropsWithChildren<BasicModalProps>>) => {
  const shouldRenderCancelButton = !!cancleButtonText;

  return (
    <Portal>
      <ModalWrapper>
        <ModalDim onClick={disableDimClose ? undefined : onClose} />
        <ModalContent className={classNames(className)}>
          {children}
          <ModalButtonWrapper className={classNames({ multiple: shouldRenderCancelButton }, buttonWrapperStyle)}>
            {shouldRenderCancelButton && (
              <Button theme="outline" color="gray" size="medium" className="button" onClick={onClose}>
                {cancleButtonText}
              </Button>
            )}
            <Button
              theme="solid"
              color={isCriticalAction ? 'alert' : 'accent'}
              size="medium"
              className="button"
              onClick={onConfirm}
            >
              {confirmButtonText}
            </Button>
          </ModalButtonWrapper>
        </ModalContent>
      </ModalWrapper>
    </Portal>
  );
};

BasicModal.Title = ModalTitleBlock;
BasicModal.Description = ModalDescriptionBlock;
BasicModal.ButtonWrapper = ModalButtonWrapper;
BasicModal.Dim = ModalDim;

export default BasicModal;
