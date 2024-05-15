import { CrudClientInstance } from '@/shared/api/index';

interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

export const getAccessToken = (data: unknown) => {
  return CrudClientInstance.post<TokenResponse>('/auth/login', {}, data);
};

export const getMemberToken = (data: unknown) => {
  return CrudClientInstance.post<TokenResponse>('/member/token', {}, data);
};

export const revokeAccessToken = () => {
  return CrudClientInstance.post('/auth/logout', {}, {});
};

export const revokeMemberToken = () => {
  return CrudClientInstance.post('/member/revoke', {}, {});
};

export const sendPasswordResetEmail = (params: unknown) => {
  return CrudClientInstance.get('/auth/findPassword', params);
};

export const sendPasswordReset = (data: unknown) => {
  return CrudClientInstance.put('/auth/resetPassword', {}, data);
};

interface DecodedResponse {
  memberToken: string;
  authToken: string;
  productId?: number;
  courseId?: number;
}

export const getSsoToken = (params: unknown) => {
  return CrudClientInstance.get<DecodedResponse>('/auth/code', params);
};

interface KBStarDecodedResponse {
  token_type: string;
  access_token: string;
  refresh_token: string;
}

// TODO: 추후에 endpoint 변경 필요
export const getKbstarSsoToken = (params: { jsonWebToken: string }) => {
  return CrudClientInstance.getAuth<KBStarDecodedResponse>('/kb-star-jwt', params);
};
