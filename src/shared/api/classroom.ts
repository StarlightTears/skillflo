import type { ApiData } from '@/types/api.interface';
import type { VideoInfo } from '@/types/classroom.interface';

import { CrudClientInstance } from '@/shared/api/index';

export const getVideoInfo = async (params: unknown) => {
  return CrudClientInstance.get<ApiData<VideoInfo>>('/classroom/video', params);
};

export const startVideoProgress = (data: unknown) => {
  return CrudClientInstance.post('/classroom/progress/start', {}, data);
};

export const updateVideoProgress = (data: unknown) => {
  return CrudClientInstance.put('/classroom/progress/update', {}, data);
};

export const completeVideoProgress = (data: unknown) => {
  return CrudClientInstance.put('/classroom/progress/complete', {}, data);
};

export const getLearningProgressTime = async (productId: number, courseId: number) => {
  const payload = { productId, courseId };
  const [timeData, rateData] = await Promise.all([
    CrudClientInstance.get<ApiData<number>>('/classroom/progress/learning-time', payload),
    CrudClientInstance.get<ApiData<number>>('/classroom/progress/learning-rate', payload),
  ]);

  return { time: timeData.data.data, rate: rateData.data.data };
};
