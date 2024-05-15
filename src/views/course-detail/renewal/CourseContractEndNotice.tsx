import React from 'react';

import type { PropsWithStyle } from '@/types/component.interface';
import type { OriginCourse } from '@/types/course.interface';
import type { BridgeProduct } from '@/types/product.interface';

import InfoNotice from '@/components/common-renewal/InfoNotice';
import { getCourseEnrollmentState, isCourseContractEndAtIncludeEnrollmentPeriod } from '@/shared/utils/course';
import { dateFormat } from '@/shared/utils/date';

interface CourseContractEndNoticeProps {
  courseDetail: OriginCourse;
  productList: BridgeProduct[];
  courseContractEndAt: string;
}

const CourseContractEndNotice = ({
  courseDetail,
  productList,
  courseContractEndAt,
  className,
}: PropsWithStyle<CourseContractEndNoticeProps>) => {
  const isEveryOngoingCourse = productList.every((product) => {
    return getCourseEnrollmentState(courseDetail, product, product.enrollment, product.requiredCourse).isOngoingCourse;
  });

  return !isEveryOngoingCourse && isCourseContractEndAtIncludeEnrollmentPeriod(productList, courseContractEndAt) ? (
    <InfoNotice className={className}>
      해당 강의는 {dateFormat(courseContractEndAt, 'YYYY.MM.DD')} 전까지 수강 신청을 하셔야 학습하실 수 있습니다.
    </InfoNotice>
  ) : null;
};

export default CourseContractEndNotice;
