import { useQuery } from '@tanstack/react-query';

import { getProduct } from '../api/product';
import { QUERY_KEYS } from '../policy';

export const useProduct = (productId: number) => {
  return useQuery(QUERY_KEYS.PRODUCT(productId), () => getProduct(productId));
};
