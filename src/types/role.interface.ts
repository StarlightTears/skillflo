import { ROLE_TYPE } from '@/shared/policy';

type RoleType = ROLE_TYPE;

export interface Role {
  id: number;
  name: string;
  state: string;
  type: RoleType;
  extras: {
    parentId?: number;
    depth?: number;
  };
}

export interface RoleBaseParams {
  type: RoleType;
}

export interface RoleMainJobParams extends RoleBaseParams {
  depth: number;
}

export interface RoleSubJobParams extends RoleMainJobParams {
  parentId: number;
}

export interface RoleParams extends RoleBaseParams {
  type: RoleType;
  depth?: number;
  parentId?: number;
}

export interface RoleList {
  data: Role[];
  meta: { total: number };
}
