import { useQuery } from '@tanstack/react-query';

import { getRoleList, getRoleByIds } from '../api/role';
import { QUERY_KEYS } from '../policy';

import type { Role, RoleBaseParams } from '@/types/role.interface';

import { ROLE_TYPE } from '@/shared/policy';

const getOptionByRoleList = (roleList: Role[]) => {
  return roleList.map((role) => ({ label: role.name, value: role.id }));
};

const getRoleNameMapByList = (roleList: Role[]) => {
  return roleList.reduce((map, role) => {
    map.set(role.id, role.name);
    return map;
  }, new Map());
};

export const useNcsMainJob = () => {
  const { data } = useQuery(QUERY_KEYS.ROLE_MAIN_JOB_LIST(ROLE_TYPE.NCS_JOB, 1), () =>
    getRoleList({ type: ROLE_TYPE.NCS_JOB, depth: 1 })
  );

  return {
    data: data?.data || [],
    options: getOptionByRoleList(data?.data || []),
    roleNameMap: getRoleNameMapByList(data?.data || []),
  };
};

export const useNcsSubJob = (parentId: number) => {
  const { data } = useQuery(
    QUERY_KEYS.ROLE_SUB_JOB_LIST(ROLE_TYPE.NCS_JOB, 2, parentId),
    () => getRoleList({ type: ROLE_TYPE.NCS_JOB, depth: 2, parentId }),
    {
      enabled: Boolean(parentId),
    }
  );

  return {
    data: data?.data || [],
    options: getOptionByRoleList(data?.data || []),
    roleNameMap: getRoleNameMapByList(data?.data || []),
  };
};

export const useRoleListByIds = (roleIds: number[]) => {
  return useQuery(QUERY_KEYS.ROLE_LIST_BY_IDS(roleIds), () => getRoleByIds(roleIds), { enabled: !!roleIds.length });
};

export const useMemberRole = (ids: number[]) => {
  const { data, ...queryResult } = useRoleListByIds(ids);

  return {
    ...queryResult,
    data,
    options: getOptionByRoleList(data || []),
    roleNameMap: getRoleNameMapByList(data || []),
  };
};

export const useRole = (params: RoleBaseParams) => {
  const { data } = useQuery(QUERY_KEYS.ROLE_LIST(params.type), () => getRoleList(params));

  return {
    data: data?.data || [],
    options: getOptionByRoleList(data?.data || []),
    roleNameMap: getRoleNameMapByList(data?.data || []),
  };
};
