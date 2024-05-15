import { CrudClientInstance } from '@/shared/api/index';

export const getSsoChanelToken = (params: { productId: number; courseId: number; associationCode: string }) => {
  return CrudClientInstance.getExternal('/sso/chanel', params);
};
