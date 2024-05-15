import type { Product } from '@/types/product.interface';

import { CrudClientInstance } from '@/shared/api/index';

export const getProduct = async (productId: number) => {
  const response = await CrudClientInstance.get<Product>(`/product/${productId}`);

  return response.data;
};
