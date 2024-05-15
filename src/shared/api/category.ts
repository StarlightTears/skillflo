import type { Category } from '@/types/category.interface';

import { CrudClientInstance } from '@/shared/api/index';

export const getExposedCategories = async () => {
  const response = await CrudClientInstance.get<Category[]>('/category/search', { type: 'EXPOSED', limit: 1000 });

  return response.data;
};
