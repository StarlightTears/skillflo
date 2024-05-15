import type { Supplement } from '@/types/supplement';

import { CrudClientInstance } from '@/shared/api/index';

export const getSupplementList = async (supplementIds: number[]) => {
  const response = await CrudClientInstance.get<Supplement[]>('/supplement/ids', {
    ids: supplementIds.join(','),
  });

  return response.data;
};
