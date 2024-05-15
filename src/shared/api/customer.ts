import type { Customer } from '@/types/customer.interface';

import { CrudClientInstance } from '@/shared/api/index';

export const getCustomerById = (customerId: number) => {
  return CrudClientInstance.get<Customer>(`/customer/${customerId}`);
};
