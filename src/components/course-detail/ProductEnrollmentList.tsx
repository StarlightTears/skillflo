import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowRight } from '..';
import Button from '../common-renewal/Button';

import type { OriginCourse } from '@/types/course.interface';
import type { BridgeProduct } from '@/types/product.interface';

import NoticeProductEntrollment from '@/components/course-detail/NoticeProductEntrollment';
import { useViewport } from '@/shared/hooks';
import { getCourseEnrollmentState } from '@/shared/utils/course';
import { dateFormat } from '@/shared/utils/date';
import { homeMedia, textEllipsis, typographyMixin } from '@/styles/mixins';

interface ProductEnrollmentListProps {
  courseDetail: OriginCourse;
  productList: BridgeProduct[];
  doEnrollmentProcess: (event: 'PROPOSAL' | 'CANCELED', productId: number) => void;
  closeEnrollmentModal: () => void;
}

const ProductEnrollmentListBlock = styled.ul`
  li {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 0.1rem solid var(--color-gray-100);

    .product-enrollment-info {
      .name {
        margin-bottom: 1.2rem;
        ${textEllipsis(2)};
      }

      .period {
        display: flex;
        flex-direction: column;
        margin-bottom: 1.2rem;
        color: var(--color-gray-500);
        ${typographyMixin('p2')};

        .enrollment {
          margin-right: 1.2rem;
        }
      }

      ${typographyMixin('p2')};
    }

    .button-group {
      display: flex;
      gap: 1.2rem;

      .enrollment-btn {
        flex: 1 0 0;
      }
    }
  }

  ${homeMedia('small', 'medium')} {
    .enrollment-btn {
      flex: 1 0 0;
    }
  }

  ${homeMedia('large', 'xlarge')} {
    li {
      gap: 1rem;

      .product-enrollment-info {
        flex: 1 0 0;

        .name {
          margin-bottom: 0.8rem;
          ${textEllipsis(1)};
        }

        .period {
          flex-direction: row;
          margin-bottom: 0;
        }
      }
    }
  }
  ${homeMedia('xlarge')} {
    li {
      flex-direction: row;
      align-items: center;

      .button-group {
        justify-content: end;
        min-width: 200px;

        .enrollment-btn {
          flex: unset;
        }
      }
    }
  }
`;

const ProductEnrollmentList = ({
  courseDetail,
  productList,
  doEnrollmentProcess,
  closeEnrollmentModal,
}: ProductEnrollmentListProps) => {
  const params = useParams();
  const courseId = parseInt(params.courseId as string);
  const navigate = useNavigate();
  const { isSmallViewport, isMediumViewport } = useViewport('home');
  const productListWithEnrollmentState = useMemo(() => {
    return productList.map((product) => {
      const { isOngoingCourse, isEnrollableCourse, isEnrollmentApplying, isEnrollmentCancel } =
        getCourseEnrollmentState(courseDetail, product, product.enrollment, product.requiredCourse);
      return { ...product, isOngoingCourse, isEnrollableCourse, isEnrollmentApplying, isEnrollmentCancel };
    });
  }, [productList]);

  return (
    <ProductEnrollmentListBlock>
      <NoticeProductEntrollment className="notice-product" />
      {productListWithEnrollmentState.map((product) => (
        <li key={product.id}>
          <div className="product-enrollment-info">
            <div className="name">{product.extras.publicName}</div>
            <div className="period">
              <div className="enrollment">
                학습 가능 기간 :
                {` ${dateFormat(product.extras.courseStartedAt)} ~ ${dateFormat(product.extras.courseEndedAt)}`}
              </div>
              <div className="course">
                수강 신청 기간 :
                {` ${dateFormat(product.extras.enrollmentStartedAt)} ~ ${dateFormat(product.extras.enrollmentEndedAt)}`}
              </div>
            </div>
          </div>
          <div className="button-group">
            {product.isEnrollmentCancel && (
              <Button
                className="enrollment-btn"
                theme="outline"
                size={isSmallViewport || isMediumViewport ? 'large' : 'medium'}
                onClick={() => doEnrollmentProcess('CANCELED', product.id)}
              >
                수강 취소
              </Button>
            )}
            {product.isEnrollmentApplying && (
              <Button
                className="enrollment-btn"
                theme="primary"
                size={isSmallViewport || isMediumViewport ? 'large' : 'medium'}
                disabled
              >
                수강신청접수
              </Button>
            )}
            {product.isEnrollableCourse && (
              <Button
                className="enrollment-btn"
                theme="primary"
                size={isSmallViewport || isMediumViewport ? 'large' : 'medium'}
                onClick={() => doEnrollmentProcess('PROPOSAL', product.id)}
              >
                수강신청
              </Button>
            )}
            {product.isOngoingCourse && (
              <Button
                className="enrollment-btn"
                theme="primary"
                size={isSmallViewport || isMediumViewport ? 'large' : 'medium'}
                rightIcon={<ArrowRight />}
                onClick={() => {
                  navigate(`/course-detail/${product.id}/${courseId}`);
                  closeEnrollmentModal();
                }}
              >
                학습하기
              </Button>
            )}
          </div>
        </li>
      ))}
    </ProductEnrollmentListBlock>
  );
};

export default ProductEnrollmentList;
