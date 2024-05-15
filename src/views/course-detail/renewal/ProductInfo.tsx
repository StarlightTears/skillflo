import styled from '@emotion/styled';
import React from 'react';
import { useParams } from 'react-router-dom';

import CourseContractEndNotice from './CourseContractEndNotice';

import { ArrowRightSmallPrimary, Modal, Time, VerticalLine, Video } from '@/components';
import BottomSheet from '@/components/common-renewal/BottomSheet';
import MultipleEnrollmentPopup from '@/components/course-detail/MultipleEnrollmentPopup';
import ProductEnrollmentList from '@/components/course-detail/ProductEnrollmentList';
import { useViewport } from '@/shared/hooks';
import { useCourseCategory } from '@/shared/hooks/category';
import { useCourseBridge, useCourseDetail, useCourseDetailEnrollment } from '@/shared/hooks/course-detail';
import { writePlayTime } from '@/shared/utils/time';
import { homeMedia, textEllipsis, typographyMixin } from '@/styles/mixins';

const ProductInfoBlock = styled.div`
  padding: 1.2rem 1.6rem 1.6rem;
  background-color: var(--color-gray-50);

  .wrap {
    display: flex;
    width: 100%;

    .left-align {
      display: none;
    }

    .right-align {
      display: flex;
      align-items: center;
      width: 100%;

      .title {
        flex: 1;
        color: var(--color-gray-900);
        ${typographyMixin('p3')};
        ${textEllipsis(1)};
      }

      .another-product-view {
        display: flex;
        flex: 10.2rem 0 0;
        align-items: center;
        color: var(--color-primary-700);
        cursor: pointer;
        ${typographyMixin('p2', 'bold')};
      }
    }
  }

  ${homeMedia('large', 'xlarge')} {
    padding: 1.2rem 0;

    .wrap {
      justify-content: space-between;
      width: 96rem;
      margin: 0 auto;

      .left-align {
        display: flex;
        align-items: center;
        ${typographyMixin('p2')};

        .course-category {
          margin-left: 0.8rem;
          color: var(--color-gray-600);
          ${typographyMixin('p2', 'bold')};
        }

        svg {
          margin-right: 0.4rem;
        }

        span {
          margin-right: 1.2rem;
          color: var(--color-gray-500);
        }
      }

      .right-align {
        flex: 62.7rem 0 0;

        .title {
          width: 50rem;
          text-align: right;
          ${typographyMixin('p2')};
        }
      }
    }
  }
`;

const ProductInfo = () => {
  const params = useParams();
  const courseId = parseInt(params.courseId as string);

  const { data: courseBridgeData } = useCourseBridge(courseId);
  const { data: courseDetailData } = useCourseDetail();
  const courseCategory = useCourseCategory(courseBridgeData?.courseDetail);
  const {
    doEnrollmentProcess,
    cancelEnrollment,
    enrollmentCancelProductId,
    setEnrollmentCancelProductId,
    multipleModalRef,
    isOpenMultipleEnrollmentModal,
    setIsOpenMultipleEnrollmentModal,
    closeEnrollmentModal,
  } = useCourseDetailEnrollment();
  const { isLargeViewport, isXLargeViewport } = useViewport();

  if (!courseBridgeData || !courseDetailData) return null;

  const isMultipleProductList = courseBridgeData.products.length > 1;

  return (
    <ProductInfoBlock>
      <div className="wrap">
        <div className="left-align">
          <div className="course-category">{courseCategory?.name}</div>
          <VerticalLine height={1.6} margin={12} />
          <Video />
          <span>강의 {courseDetailData.courseDetail.extras.totalCourseContentCount}개</span>
          <Time />
          <span>{writePlayTime(courseDetailData.courseDetail.extras.totalPlayTime || 0)}</span>
        </div>
        <div className="right-align">
          <div className="title">{courseDetailData.courseDetail.product.extras.publicName}</div>
          {isMultipleProductList && (
            <>
              <VerticalLine height={1.6} margin={12} />
              <div className="another-product-view" onClick={() => setIsOpenMultipleEnrollmentModal(true)}>
                다른 과정 보기
                <ArrowRightSmallPrimary />
              </div>
            </>
          )}
        </div>
        {isOpenMultipleEnrollmentModal && (isLargeViewport || isXLargeViewport) && (
          <MultipleEnrollmentPopup
            modalRef={multipleModalRef}
            onClosePopup={() => setIsOpenMultipleEnrollmentModal(false)}
          >
            <CourseContractEndNotice
              className="margin-bottom"
              courseDetail={courseBridgeData.courseDetail}
              productList={courseBridgeData.products}
              courseContractEndAt={courseBridgeData.courseDetail.extras.contractEndAt}
            />
            <ProductEnrollmentList
              courseDetail={courseBridgeData.courseDetail}
              productList={courseBridgeData.products}
              doEnrollmentProcess={doEnrollmentProcess}
              closeEnrollmentModal={closeEnrollmentModal}
            />
          </MultipleEnrollmentPopup>
        )}
        {isOpenMultipleEnrollmentModal && !(isLargeViewport || isXLargeViewport) && (
          <BottomSheet
            title="이수 중인 과정의 수강 신청 현황입니다."
            onCloseBottomSheet={() => setIsOpenMultipleEnrollmentModal(false)}
          >
            <CourseContractEndNotice
              className="margin-bottom"
              courseDetail={courseBridgeData.courseDetail}
              productList={courseBridgeData.products}
              courseContractEndAt={courseBridgeData.courseDetail.extras.contractEndAt}
            />
            <ProductEnrollmentList
              courseDetail={courseBridgeData.courseDetail}
              productList={courseBridgeData.products}
              doEnrollmentProcess={doEnrollmentProcess}
              closeEnrollmentModal={closeEnrollmentModal}
            />
          </BottomSheet>
        )}
        {enrollmentCancelProductId && (
          <Modal
            title="수강신청 취소"
            content={
              <>
                신청하신 과정을 정말 취소하시겠습니까?
                <br />
                (취소 후 다시 신청하실 수 있습니다.)
              </>
            }
            onCloseModal={() => setEnrollmentCancelProductId(null)}
            onConfirm={() => cancelEnrollment(enrollmentCancelProductId)}
          />
        )}
      </div>
    </ProductInfoBlock>
  );
};

export default ProductInfo;
