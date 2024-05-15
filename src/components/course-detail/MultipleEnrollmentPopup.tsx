import styled from '@emotion/styled';
import React, { PropsWithChildren, RefObject } from 'react';

import { CloseLarge } from '..';

import { typographyMixin } from '@/styles/mixins';

interface MultipleEnrollmentPopup {
  onClosePopup: () => void;
  modalRef: RefObject<HTMLDivElement>;
}

const MultipleEnrollmentPopupBlock = styled.div`
  position: absolute;
  top: 9.3rem;
  z-index: var(--z-course-detail-multiple-enrollment-popup);
  width: 93.6rem;
  max-height: 56rem;
  padding: 0 2rem;
  border-radius: 0.6rem;
  background-color: var(--color-white);
  box-shadow: 0 0.4rem 1.2rem -0.2rem var(--color-gray-800-transparency-10);

  .enrollment-title {
    display: flex;
    justify-content: space-between;
    padding: 2.4rem 0 2rem;
    border-bottom: 0.1rem solid var(--color-gray-100);
    ${typographyMixin('p1', 'bold')};

    svg {
      cursor: pointer;
    }
  }

  .enrollment-content {
    overflow-y: auto;
    padding: 2rem 0 4rem;
  }
`;

const MultipleEnrollmentPopup = ({ children, onClosePopup, modalRef }: PropsWithChildren<MultipleEnrollmentPopup>) => {
  return (
    <MultipleEnrollmentPopupBlock ref={modalRef}>
      <div className="enrollment-title">
        이수중인 과정의 수강신청 현황입니다. <CloseLarge onClick={onClosePopup} />
      </div>
      <div className="enrollment-content">{children}</div>
    </MultipleEnrollmentPopupBlock>
  );
};

export default MultipleEnrollmentPopup;
