import type { OriginCourse } from '@/types/course.interface';

import { CrudClientInstance } from '@/shared/api';

export const getSearchResult = async (keyword: string) => {
  const queries = new URLSearchParams({ keyword, type: 'INTEGRATION' });
  const response = await CrudClientInstance.get<OriginCourse[]>(`/curation/v2/fts?${queries.toString()}`);
  return response.data;
};
