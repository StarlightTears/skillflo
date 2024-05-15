import type { Role, RoleParams, RoleList } from '@/types/role.interface';

import { CrudClientInstance } from '@/shared/api/index';

export const getRoleByIds = async (ids: number[]) => {
  const response = await CrudClientInstance.get<Role[]>('/role/ids', { ids: ids.join(',') });

  return response.data;
};

export const getRoleList = async (params: RoleParams) => {
  const e_fields = [];
  const e_values = [];

  if (params.depth) {
    e_fields.push('depth');
    e_values.push(params.depth);
  }

  if (params.parentId) {
    e_fields.push('parentId');
    e_values.push(params.parentId);
  }

  const response = await CrudClientInstance.get<RoleList>('/role/list', {
    type: params.type,
    state: 'NORMAL',
    e_fields: e_fields.length > 0 ? JSON.stringify(e_fields) : undefined,
    e_values: e_values.length > 0 ? JSON.stringify(e_values) : undefined,
    limit: 200,
  });

  return response.data;
};
