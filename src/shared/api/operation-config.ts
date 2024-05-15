import type { OperationConfig } from '@/types/operationConfig.interface';

import { CrudClientInstance } from '@/shared/api/index';

export const getInterestsInfo = (param: unknown) => {
  return CrudClientInstance.get<OperationConfig>('/operation-config/interests', param);
};
