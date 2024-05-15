import { css } from '@emotion/react';
import classNames from 'classnames';
import React, { ReactNode } from 'react';

import BasicModal from './BasicModal';
import { CommonSubModalProps } from './Modal.interface';

import { renewalTypographyMixin } from '@/styles/renewal-mixins';

interface AlertModalProps extends CommonSubModalProps {
  size?: 'medium' | 'small';
  image?: ReactNode;
}

const AlertModalStyle = css`
  width: 36.8rem;

  .content {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
    padding: 4rem 4rem 0;
  }

  .graphic-image {
    max-width: 100%;
    aspect-ratio: 1 / 1;
  }

  &.small-modal {
    width: 28rem;

    .content {
      display: flex;
      gap: 1.2rem;
      padding: 2rem 2rem 0;
    }

    ${BasicModal.Title} {
      ${renewalTypographyMixin('title', 3)}
    }

    ${BasicModal.Description} {
      ${renewalTypographyMixin('body', 4)}
    }

    ${BasicModal.ButtonWrapper} {
      padding: 1.6rem 2rem 2rem;
    }
  }
`;

const AlertModal = ({
  image,
  title,
  description,
  size = 'medium',
  confirmButtonText,
  isCriticalAction = false,
  cancleButtonText,
  onConfirm,
  onClose,
}: AlertModalProps) => {
  return (
    <BasicModal
      className={classNames({
        'small-modal': size === 'small',
        'medium-modal': size === 'medium',
      })}
      cancleButtonText={cancleButtonText}
      confirmButtonText={confirmButtonText}
      isCriticalAction={isCriticalAction}
      onConfirm={onConfirm}
      onClose={onClose}
      css={AlertModalStyle}
      buttonWrapperStyle={size === 'medium' ? 'normal' : 'column'}
    >
      <div className="content">
        {typeof image === 'string' ? <img src={image} alt="모달 이미지" className="graphic-image" /> : image}
        <div className="text-content">
          {title && <BasicModal.Title>{title}</BasicModal.Title>}
          <BasicModal.Description>{description}</BasicModal.Description>
        </div>
      </div>
    </BasicModal>
  );
};

export default AlertModal;
