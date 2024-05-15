import type { ApiData } from '@/types/api.interface';
import type { HomeContentWrapper } from '@/types/homeContent';

import { CrudClientInstance } from '@/shared/api/index';

export const getWholeHomeContents = async () => {
  const response = await CrudClientInstance.get<
    ApiData<{
      studyGuide?: HomeContentWrapper;
      exhibition?: HomeContentWrapper;
    }>
  >('/page');

  return response.data.data;
};

export const getHomeContentPage = async (pageId: number) => {
  const response = await CrudClientInstance.get<ApiData<string>>(`/page/${pageId}`);

  return response.data.data;
};
