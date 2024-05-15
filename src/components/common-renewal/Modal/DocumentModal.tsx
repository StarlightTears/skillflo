import { css } from '@emotion/react';
import React from 'react';

import BasicModal from './BasicModal';
import { CommonSubModalProps } from './Modal.interface';

import { renewalTypographyMixin } from '@/styles/renewal-mixins';

interface DocumentModalProps extends Omit<CommonSubModalProps, 'description'> {
  title: string;
  documents: { title: string; description?: string }[];
}

const documentModalStyle = css`
  width: 56rem;
  max-height: calc(100vh - 16rem);

  ${BasicModal.Title} {
    padding: 4rem 4rem 1.2rem;
  }

  .documents {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    overflow: auto;
    max-height: calc(100vh - 16rem - 9rem - 11.2rem);
    padding: 1.6rem 4rem;

    .title {
      ${renewalTypographyMixin('body', 3, true)}
    }

    .description {
      color: var(--color-semantic-informative-primary-low);
      ${renewalTypographyMixin('body', 3)};
    }
  }
`;

const DocumentModal = ({
  title,
  confirmButtonText,
  cancleButtonText,
  onConfirm,
  onClose,
  documents,
}: DocumentModalProps) => {
  return (
    <BasicModal
      cancleButtonText={cancleButtonText}
      confirmButtonText={confirmButtonText}
      onConfirm={onConfirm}
      onClose={onClose}
      css={documentModalStyle}
      buttonWrapperStyle="stress-confirm"
    >
      <BasicModal.Title>{title}</BasicModal.Title>
      <ul className="documents">
        {documents.map((document) => (
          <li key={document.title}>
            <h4 className="title">{document.title}</h4>
            {document.description && <p className="description">{document.description}</p>}
          </li>
        ))}
      </ul>
    </BasicModal>
  );
};

export default DocumentModal;
