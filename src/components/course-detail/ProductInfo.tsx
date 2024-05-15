import styled from '@emotion/styled';
import React from 'react';

import Button from '../common-renewal/Button';

import type { BridgeProduct } from '@/types/product.interface';

import { dateFormat } from '@/shared/utils/date';
import { homeMedia, textEllipsis, typographyMixin } from '@/styles/mixins';

interface ProductInfoProps {
  product?: BridgeProduct;
  isEnrollmentCancel?: boolean;
  isEnrollableCourse?: boolean;
  doEnrollmentProcess: (event: 'PROPOSAL' | 'CANCELED', productId: number) => Promise<void>;
}

const ProductInfoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .empty-product {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1.6rem 0;
    border-radius: 0.6rem;
    background-color: var(--color-gray-50);
    color: var(--color-gray-500);
    ${typographyMixin('p3', 'bold')};
  }

  .info {
    width: 100%;

    .title {
      margin-bottom: 0.8rem;
      ${typographyMixin('p2')};

      ${homeMedia('small', 'medium')} {
        ${textEllipsis(2)};
      }

      ${homeMedia('large', 'xlarge')} {
        width: 68rem;
        ${textEllipsis(1)};
      }
    }

    .period {
      display: flex;
      flex-direction: column;
      color: var(--color-gray-500);

      .label {
        margin-right: 0.8rem;
        ${typographyMixin('p3', 'bold')};
      }

      & > div {
        display: flex;
        align-items: center;
      }

      ${typographyMixin('p2')};

      ${homeMedia('large', 'xlarge')} {
        flex-direction: row;

        .course-period {
          margin-left: 1.2rem;
        }
      }
    }
  }

  .enrollment {
    display: flex;
    justify-content: flex-end;
    width: 12rem;

    ${homeMedia('small', 'medium')} {
      display: none;
    }
  }
`;

const ProductInfo = ({ product, isEnrollmentCancel, isEnrollableCourse, doEnrollmentProcess }: ProductInfoProps) => {
  return (
    <ProductInfoBlock>
      {product ? (
        <>
          <div className="info">
            <div className="title">{product.extras.publicName}</div>
            <div className="period">
              <div className="enrollment-period">
                <span className="label">수강 신청 기간</span>
                <span>
                  {dateFormat(product.extras.enrollmentStartedAt)}&nbsp;~&nbsp;
                  {dateFormat(product.extras.enrollmentEndedAt)}
                </span>
              </div>
              <div className="course-period">
                <span className="label">학습 가능 기간</span>
                <span>
                  {dateFormat(product.extras.courseStartedAt)}&nbsp;~&nbsp;
                  {dateFormat(product.extras.courseEndedAt)}
                </span>
              </div>
            </div>
          </div>
          <div className="enrollment">
            {isEnrollableCourse && (
              <Button theme="primary" size="medium" onClick={() => doEnrollmentProcess('PROPOSAL', product.id)}>
                수강신청
              </Button>
            )}
            {isEnrollmentCancel && (
              <Button theme="outline" size="medium" onClick={() => doEnrollmentProcess('CANCELED', product.id)}>
                수강 취소
              </Button>
            )}
          </div>
        </>
      ) : (
        <pre className="empty-product">
          {`해당 강의는 부여된 학습과정이 없어 현재 수강이 불가능합니다.
          자세한 내용은 담당자에게 문의하세요.`}
        </pre>
      )}
    </ProductInfoBlock>
  );
};

export default ProductInfo;
