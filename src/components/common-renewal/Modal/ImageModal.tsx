import { css } from '@emotion/react';
import React, { ComponentProps } from 'react';

import BasicModal from './BasicModal';
import { CommonSubModalProps } from './Modal.interface';

import SectionMessage from '@/components/common/SectionMessage';

interface ImageModalProps extends CommonSubModalProps {
  imageSrc: string;
  sectionMessages?: ComponentProps<typeof SectionMessage>[];
}

const imageModalStyle = css`
  width: 56rem;
  max-height: calc(100vh - 16rem);

  & > .content {
    padding: 3.2rem 4rem 0;
  }

  .image-wrapper {
    display: flex;

    img {
      display: block;
      object-fit: contain;
      width: 100%;
      aspect-ratio: 16 / 10;
    }
  }

  .section-messages {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    align-items: center;
    justify-content: center;
    margin: 1.6rem 0 0;
  }
`;

const ImageModal = ({
  title,
  description,
  confirmButtonText,
  cancleButtonText,
  onConfirm,
  onClose,
  imageSrc,
  sectionMessages,
}: ImageModalProps) => {
  return (
    <BasicModal
      cancleButtonText={cancleButtonText}
      confirmButtonText={confirmButtonText}
      onConfirm={onConfirm}
      onClose={onClose}
      css={imageModalStyle}
      buttonWrapperStyle="stress-confirm"
      disableDimClose
    >
      <div className="image-wrapper">
        <img src={imageSrc} alt="이미지 모달 이미지" />
      </div>
      <div className="content">
        <div className="text-content">
          {title && <BasicModal.Title>{title}</BasicModal.Title>}
          <BasicModal.Description>{description}</BasicModal.Description>
        </div>
        {sectionMessages && (
          <div className="section-messages">
            {sectionMessages.map((sectionMessageProps) => (
              <SectionMessage key={sectionMessageProps.description} {...sectionMessageProps} />
            ))}
          </div>
        )}
      </div>
    </BasicModal>
  );
};

export default ImageModal;
