import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DateUtil } from '@day1co/pebbles';

import { useCloseClickOutside } from '../useCloseClickOutside';

import { checkCourseQna } from '@/shared/api/course';
import { getCourseDetail, getCourseBridge } from '@/shared/api/course-detail';
import { proposalEnrollment } from '@/shared/api/enrollment';
import { useCurrentMember, useModal, useToast } from '@/shared/hooks';
import { Enrollment, QUERY_KEYS } from '@/shared/policy';
import { isHttpClientError } from '@/shared/utils/api';
import { HttpClientError } from '@/types/api.interface';

const useCourseQueryErrorCallback = () => {
  const { openModal, closeModal } = useModal();

  return () => {
    openModal({
      content: '사용이 불가능한 페이지입니다.',
      onConfirm() {
        closeModal();
        location.replace('/');
      },
      hideHeader: true,
      hideFooter: true,
      hideCancelButton: true,
    });
  };
};

export const useCourseDetailParams = () => {
  const params = useParams();

  return {
    courseId: Number(params.courseId),
    productId: Number(params.productId),
  };
};

export const useCourseQnaSummary = (courseId: number) => {
  return useQuery(QUERY_KEYS.CHECK_COURSE_QNA(courseId), () => checkCourseQna(courseId));
};

export const useCourseDetail = () => {
  const { courseId, productId } = useCourseDetailParams();
  const courseQueryErrorCallback = useCourseQueryErrorCallback();

  return useQuery(
    QUERY_KEYS.COURSE_DETAIL(courseId, productId),
    () => getCourseDetail(courseId, productId).then(({ data }) => data),
    {
      onError: courseQueryErrorCallback,
      suspense: true,
      useErrorBoundary: false,
    }
  );
};

export const useCourseBridge = (courseId: number) => {
  const courseQueryErrorCallback = useCourseQueryErrorCallback();

  return useQuery(QUERY_KEYS.COURSE_BRIDGE(courseId), () => getCourseBridge(courseId), {
    onError: courseQueryErrorCallback,
    suspense: true,
    useErrorBoundary: false,
  });
};

export const useCourseDetailEnrollment = () => {
  const params = useParams();
  const courseId = parseInt(params.courseId as string);
  const queryClient = useQueryClient();
  const { member } = useCurrentMember();
  const { openToast } = useToast();

  const [multipleModalRef, isOpenMultipleEnrollmentModal, setIsOpenMultipleEnrollmentModal] =
    useCloseClickOutside<HTMLDivElement>();
  const [enrollmentCancelProductId, setEnrollmentCancelProductId] = useState<number | null>(null);

  const doEnrollmentProcess = async (event: 'PROPOSAL' | 'CANCELED', productId: number) => {
    if (event === 'PROPOSAL') {
      try {
        await proposalEnrollment({
          memberId: member?.id,
          productId,
          courseId,
          event,
        });
        openToast({ content: '수강신청 접수 되었습니다.' });
        queryClient.invalidateQueries(QUERY_KEYS.COURSE_BRIDGE(courseId));
        queryClient.invalidateQueries(QUERY_KEYS.COURSE_DETAIL(courseId, productId));
      } catch (error) {
        const httpError = error as Error | HttpClientError;
        if (isHttpClientError(httpError)) {
          if (httpError.response?.data.message === 'ENROLLMENT LIMIT EXCEED') {
            alert('신청 가능한 강의 갯수를 초과하였습니다.\n일부 강의에 대한 수강 신청을 취소한 후 새로 신청해주세요.');
            return;
          }
          alert('수강신청 요청이 실패하였습니다. 잠시 후 다시 시도해주세요.');
        }
      }
    } else {
      setEnrollmentCancelProductId(productId);
    }
  };

  const cancelEnrollment = async (productId: number | null) => {
    if (!productId) return;

    try {
      await proposalEnrollment({
        memberId: member?.id,
        productId,
        courseId,
        event: 'CANCELED',
      });
      openToast({ content: '수강취소 되었습니다.' });
      setEnrollmentCancelProductId(null);
      queryClient.invalidateQueries(QUERY_KEYS.COURSE_BRIDGE(courseId));
      queryClient.invalidateQueries(QUERY_KEYS.COURSE_DETAIL(courseId, productId));
    } catch (error) {
      alert('수강신청 취소 요청이 실패하였습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const closeEnrollmentModal = () => {
    setIsOpenMultipleEnrollmentModal(false);
  };

  return {
    doEnrollmentProcess,
    cancelEnrollment,
    enrollmentCancelProductId,
    multipleModalRef,
    setEnrollmentCancelProductId,
    isOpenMultipleEnrollmentModal,
    setIsOpenMultipleEnrollmentModal,
    closeEnrollmentModal,
  };
};

export const useCourseDetailState = () => {
  const { data: courseDetailData } = useCourseDetail();

  const isWeekBeforeCourseEndedAt = useMemo(() => {
    // 학습기간종료전 7일기간을 나타내는 변수
    // 필수강의의 경우 필수강의 종료일자로 계산
    if (!courseDetailData) return false;

    const today = new Date();
    const requiredCourse = courseDetailData?.courseDetail.requiredCourse;
    if (requiredCourse) {
      const requiredCourseEndedAt = new Date(requiredCourse.extras.requiredCourseEndedAt);
      const weekBeforeRequiredCourseEndedAt = new Date(
        DateUtil.calcDatetime(requiredCourseEndedAt, {
          day: -7,
        })
      );
      return today >= weekBeforeRequiredCourseEndedAt && today < requiredCourseEndedAt;
    }
    const courseEndedAt = new Date(courseDetailData.courseDetail.product.extras.courseEndedAt);
    const weekBeforeCourseEndedAt = new Date(
      DateUtil.calcDatetime(courseEndedAt, {
        day: -7,
      })
    );

    return today >= weekBeforeCourseEndedAt && today < courseEndedAt;
  }, [courseDetailData]);

  const isExpiredCourseEndedAt = useMemo(() => {
    if (!courseDetailData) return false;

    return new Date() > new Date(courseDetailData.courseDetail.product.extras.courseEndedAt);
  }, [courseDetailData]);

  const isEnrollmentApplying = useMemo(() => {
    if (!courseDetailData) return false;

    return (
      courseDetailData.courseDetail.enrollment?.extras?.event === Enrollment.event.PROPOSAL &&
      courseDetailData.courseDetail.enrollment?.state === Enrollment.state.APPLYING
    );
  }, [courseDetailData]);

  return { isWeekBeforeCourseEndedAt, isExpiredCourseEndedAt, isEnrollmentApplying };
};
