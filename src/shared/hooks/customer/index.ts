import { useQuery } from '@tanstack/react-query';

import { getCustomerById } from '@/shared/api/customer';
import { QUERY_KEYS } from '@/shared/policy';

export const useCustomer = (customerId?: number) => {
  const { data } = useQuery(
    QUERY_KEYS.CUSTOMER(customerId as number),
    () => getCustomerById(customerId as number).then(({ data }) => data),
    {
      enabled: !!customerId,
    }
  );

  return { data };
};
