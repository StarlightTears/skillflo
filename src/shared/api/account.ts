import type { Account } from '@/types/account.interface';

import { CrudClientInstance } from '@/shared/api/index';

export const getAccountInfo = (param: unknown) => {
  return CrudClientInstance.get<Account>('/account', param);
};

export const setPersonalInfoAgree = (data: unknown) => {
  return CrudClientInstance.post('/account/personal-info', {}, data);
};

export const setInterests = (data: unknown) => {
  return CrudClientInstance.post('/account/interests', {}, data);
};
