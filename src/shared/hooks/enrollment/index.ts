import { useMutation, useQuery } from '@tanstack/react-query';

import {
  getRegistrableCourses,
  putTotalScore as putTotalScoreApi,
  verificationEnrollment,
} from '@/shared/api/enrollment';
import { QUERY_KEYS } from '@/shared/policy';

export const useRegistrableCourses = () => {
  const { data, isLoading } = useQuery(QUERY_KEYS.REGISTRABLE_COURSES(), () =>
    getRegistrableCourses().then(({ data }) => data.data)
  );

  return { data, isLoading };
};

export const useVerificationEnrollment = (productId: number, courseId: number) => {
  const verificationEnrollmentMutation = useMutation(() => verificationEnrollment({ productId, courseId }));

  const verification = async () => {
    await verificationEnrollmentMutation.mutateAsync();
  };

  return { verification };
};

export const useTotalScore = (productId: number, courseId: number) => {
  const totalScoreMutation = useMutation(() => putTotalScoreApi({ productId, courseId }));

  return {
    putTotalScore: totalScoreMutation.mutateAsync,
  };
};
