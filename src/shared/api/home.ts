import type { CurationResponse } from '@/types/home.interface';

import { CrudClientInstance } from '@/shared/api';

export const getCuration = (params: unknown) => {
  return CrudClientInstance.get<CurationResponse>('/curation', params);
};
