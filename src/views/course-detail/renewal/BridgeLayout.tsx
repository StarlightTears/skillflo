import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CourseContractEndNotice from './CourseContractEndNotice';

import { ArrowRight, Modal } from '@/components';
import BottomSheet from '@/components/common-renewal/BottomSheet';
import BridgeCover from '@/components/common-renewal/BridgeCover';
import Button from '@/components/common-renewal/Button';
import Curriculum from '@/components/course-detail/Curriculum';
import Description from '@/components/course-detail/Description';
import Introduce from '@/components/course-detail/Introduce';
import MultipleEnrollmentPopup from '@/components/course-detail/MultipleEnrollmentPopup';
import Notice from '@/components/course-detail/Notice';
import ProductEnrollmentList from '@/components/course-detail/ProductEnrollmentList';
import ProductInfo from '@/components/course-detail/ProductInfo';
import withSuspense from '@/shared/hocs/withSuspense';
import { useViewport } from '@/shared/hooks';
import { useCourseCategory } from '@/shared/hooks/category';
import { useCourseBridge, useCourseDetailEnrollment } from '@/shared/hooks/course-detail';
import { getCourseEnrollmentState } from '@/shared/utils/course';
import { homeMedia, typographyMixin } from '@/styles/mixins';

const CourseDetailBridgeLayoutBlock = styled.section`
  .content {
    margin: 0 auto;
    padding-bottom: 9.6rem;

    dl:not(:last-of-type) {
      border-bottom: 0.1rem solid var(--color-gray-100);
    }

    .contract-end {
      margin: 0.4rem 2rem 0;
    }

    ${homeMedia('medium')} {
      width: 64rem;
    }

    ${homeMedia('large', 'xlarge')} {
      width: 96rem;
      padding-top: 1.6rem;

      .mobile-enrollment-btn {
        display: none;
      }

      .contract-end {
        margin-bottom: 0.8rem;
      }

      .curriculum {
        padding-bottom: 0;
      }
    }
  }
`;

const IntroduceModalContent = styled.ul`
  padding: 2rem 0;
  word-break: break-all;

  li {
    .title {
      ${typographyMixin('p1', 'bold')};
    }

    .content {
      color: var(--color-gray-600);
      white-space: pre-wrap;
      ${typographyMixin('p2')};
    }
  }

  li:not(:last-of-type) {
    margin-bottom: 4rem;
  }
`;

const CourseDetailBridgeLayout = withSuspense(() => {
  const params = useParams();
  const courseId = parseInt(params.courseId as string);

  const navigate = useNavigate();
  const { data: courseBridgeData } = useCourseBridge(courseId);
  const courseCategory = useCourseCategory(courseBridgeData?.courseDetail);
  const { isXLargeViewport, isLargeViewport } = useViewport('home');
  const [isOpenIntroduceModal, setIsOpenIntroduceModal] = useState(false);
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

  if (!courseBridgeData) return null;

  const courseDetail = courseBridgeData.courseDetail;
  const productList = courseBridgeData.products;
  const noticeList = courseBridgeData.notices;
  const coursePartList = courseBridgeData.courseDetail.extras.contents;

  const isMultipleProductList = productList.length > 1;
  const isSingleProduct = productList.length === 1;
  const singleProduct = productList[0];
  const { isOngoingCourse, isEnrollmentCancel, isEnrollableCourse, isEnrollmentApplying } = getCourseEnrollmentState(
    courseDetail,
    singleProduct,
    singleProduct?.enrollment,
    singleProduct?.requiredCourse
  );

  return (
    <CourseDetailBridgeLayoutBlock>
      <BridgeCover
        title={courseDetail.publicName}
        thumbnailUrl={courseDetail.extras.thumbnail?.url}
        categoryName={courseCategory?.name}
        course={courseDetail}
      >
        {isMultipleProductList && (
          <Button theme="primary" size="medium" onClick={() => setIsOpenMultipleEnrollmentModal(true)}>
            수강하기
          </Button>
        )}
        {isSingleProduct && isEnrollmentApplying && (
          <Button theme="primary" size="medium" disabled>
            수강신청접수
          </Button>
        )}
        {isSingleProduct && isOngoingCourse && (
          <Button
            theme="primary"
            size="medium"
            rightIcon={<ArrowRight />}
            onClick={() => navigate(`/course-detail/${singleProduct.id}/${courseDetail.id}`)}
          >
            학습하기
          </Button>
        )}
        {isOpenMultipleEnrollmentModal && (isLargeViewport || isXLargeViewport) && (
          <MultipleEnrollmentPopup
            modalRef={multipleModalRef}
            onClosePopup={() => setIsOpenMultipleEnrollmentModal(false)}
          >
            <CourseContractEndNotice
              className="margin-bottom"
              courseDetail={courseDetail}
              productList={productList}
              courseContractEndAt={courseDetail.extras.contractEndAt}
            />
            <ProductEnrollmentList
              courseDetail={courseDetail}
              productList={productList}
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
              courseDetail={courseDetail}
              productList={productList}
              courseContractEndAt={courseDetail.extras.contractEndAt}
            />
            <ProductEnrollmentList
              courseDetail={courseDetail}
              productList={productList}
              doEnrollmentProcess={doEnrollmentProcess}
              closeEnrollmentModal={closeEnrollmentModal}
            />
          </BottomSheet>
        )}
      </BridgeCover>
      <div className="content">
        {!isMultipleProductList && (
          <>
            {isSingleProduct && (
              <CourseContractEndNotice
                className="contract-end"
                courseDetail={courseDetail}
                productList={productList}
                courseContractEndAt={courseDetail.extras.contractEndAt}
              />
            )}
            <Description
              term={
                <>
                  수강 과정
                  {isSingleProduct && (
                    <>
                      {isEnrollableCourse && (
                        <Button
                          theme="primary"
                          size="small"
                          className="mobile-enrollment-btn"
                          onClick={() => doEnrollmentProcess('PROPOSAL', singleProduct.id)}
                        >
                          수강신청
                        </Button>
                      )}
                      {isEnrollmentCancel && (
                        <Button
                          theme="outline"
                          size="small"
                          className="mobile-enrollment-btn"
                          onClick={() => doEnrollmentProcess('CANCELED', singleProduct.id)}
                        >
                          수강 취소
                        </Button>
                      )}
                    </>
                  )}
                </>
              }
              description={
                <ProductInfo
                  product={singleProduct}
                  isEnrollmentCancel={isEnrollmentCancel}
                  isEnrollableCourse={isEnrollableCourse}
                  doEnrollmentProcess={doEnrollmentProcess}
                />
              }
              isFirstDescription
            />
          </>
        )}
        <Notice noticeList={noticeList} className="hover" />
        <Description
          term="강의 소개"
          description={<Introduce descriptionInfo={courseDetail.extras.descriptionInfo} />}
          onClick={() => setIsOpenIntroduceModal(!isOpenIntroduceModal)}
          className="hover"
        />
        <Description
          className="curriculum"
          term="강의 목록"
          description={<Curriculum coursePartList={coursePartList} />}
        />
      </div>
      {isOpenIntroduceModal && (
        <Modal
          size="fit"
          title="강의 소개"
          content={
            <IntroduceModalContent>
              {courseDetail?.extras?.descriptionInfo && (
                <li>
                  <div className="title">강의 소개</div>
                  <div className="content">{courseDetail.extras.descriptionInfo}</div>
                </li>
              )}
              {courseDetail?.extras?.lectureInfo && (
                <li>
                  <div className="title">강의 정보</div>
                  <div className="content">{courseDetail.extras.lectureInfo}</div>
                </li>
              )}
              {courseDetail?.extras?.teacherInfo && (
                <li>
                  <div className="title">강사 소개</div>
                  <div className="content">{courseDetail.extras.teacherInfo}</div>
                </li>
              )}
            </IntroduceModalContent>
          }
          onCloseModal={() => setIsOpenIntroduceModal(false)}
          hasContentHr
          hasCloseButton
          hideFooter
          fullScreen
        ></Modal>
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
    </CourseDetailBridgeLayoutBlock>
  );
});

export default CourseDetailBridgeLayout;
