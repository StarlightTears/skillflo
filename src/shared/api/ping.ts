import { CrudClientInstance } from '@/shared/api/index';

export const ping = (params: unknown) => {
  return CrudClientInstance.get('/.ping', params);
};
