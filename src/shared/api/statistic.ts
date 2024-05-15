import type { ApiData } from '@/types/api.interface';

import { CrudClientInstance } from '@/shared/api';

interface MonthlyPlayTimeResponse {
  data: {
    normal: Record<string, number>;
    increase: Record<string, number>;
  };
}

interface DailyPlayTimeResponse {
  day: string;
  increase: number;
  normal: number;
}

export const getDailyPlayTime = (since: string, until: string, productId?: number, courseId?: number) => {
  return CrudClientInstance.get<ApiData<DailyPlayTimeResponse[]>>(`/statistic/daily-play-time`, {
    since,
    until,
    productId,
    courseId,
  });
};

export const getMonthlyPlayTime = (since: string, until: string, productId?: number, courseIds?: number[]) => {
  return CrudClientInstance.get<MonthlyPlayTimeResponse>(`/statistic/monthly-play-time`, {
    since,
    until,
    productId,
    courseId: courseIds ? courseIds.join(',') : undefined,
  });
};
