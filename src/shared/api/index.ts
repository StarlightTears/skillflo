import { HttpClient } from '@day1co/pebbles';
import type { HttpReqConfig } from '@day1co/pebbles';

// import { getLocalStorageItem } from '@day1co/browser-util';
import type { UploadFilePayload } from '@/types/file-upload';

import config from '@/shared/config';

const httpClient = new HttpClient();
const httpClientForGcs = new HttpClient();
const httpClientForExternal = new HttpClient();
const authHttpClient = new HttpClient();
const skill360Client = new HttpClient();

const clientConfig = {
  timeout: 30 * 1000,
  headers: {
    authorization: '',
    'x-bpo-member-token': '',
  },
};
export const getApiUrl = () => {
  return 'https://bluedragon.staging.skillflo.io/api/b2e';
};
export const getExternalApiUrl = () => {
  const urlMap: { [key: string]: string } = {
    local: '/api/external',
    e2e: '/api/external',
    dev: 'https://api.dev.skillflo.io/api/external',
    staging: 'https://api.staging.skillflo.io/api/external',
    qa: 'https://api.qa.skillflo.io/api/external',
    production: 'https://api.skillflo.io/api/external',
  };

  return urlMap[config.ENV];
};

export const getAuthApiUrl = () => {
  const urlMap: { [key: string]: string } = {
    local: '/auth',
    e2e: '/api/auth',
    dev: 'https://auth.dev.skillflo.io/api/auth',
    staging: 'https://auth.staging.skillflo.io/api/auth',
    qa: 'https://auth.qa.skillflo.io/api/auth',
    production: 'https://auth.skillflo.io/api/auth',
  };

  return urlMap[config.ENV];
};

export const getSkill360Url = () => {
  const urlMap: { [key: string]: string } = {
    local: '/api/skill360',
    e2e: '/api/skill360',
    dev: 'https://api.dev.skillflo.io/api/skill360',
    staging: 'https://api.staging.skillflo.io/api/skill360',
    qa: 'https://api.qa.skillflo.io/api/skill360',
    production: 'https://api.skillflo.io/api/skill360',
  };

  return urlMap[config.ENV];
};

httpClient.baseUrl = getApiUrl();
httpClientForExternal.baseUrl = getExternalApiUrl();
authHttpClient.baseUrl = getAuthApiUrl();
skill360Client.baseUrl = getSkill360Url();

export const setAccessTokenInRequestHeaders = (accessToken: string) => {
  clientConfig.headers.authorization = `bearer ${accessToken}`;
};

export const setMemberTokenInRequestHeaders = (memberToken: string) => {
  clientConfig.headers['x-bpo-member-token'] = memberToken;
};

interface ClientConfig extends HttpReqConfig {
  headers: {
    authorization: string;
    'x-bpo-member-token': string;
  };
}

class CrudClient {
  private clientConfig: ClientConfig;

  constructor() {
    this.clientConfig = clientConfig;
  }

  // uploadUrl() {
  //   return `${this.paramRemovedUrl()}/uploads`;
  // }

  get<T>(url: string, params?: unknown) {
    return httpClient.sendGetRequest<T>(url, {
      ...this.clientConfig,
      params,
    });
  }

  getExternal<T>(url: string, params?: unknown) {
    return httpClientForExternal.sendGetRequest<T>(url, {
      ...this.clientConfig,
      params,
    });
  }

  getAuth<T>(url: string, params?: unknown) {
    return authHttpClient.sendGetRequest<T>(url, {
      ...this.clientConfig,
      params,
    });
  }

  getSkill360<T>(url: string, params?: unknown) {
    return skill360Client.sendGetRequest<T>(url, {
      ...this.clientConfig,
      params,
    });
  }

  postSkill360<T>(url: string, params?: unknown, data?: unknown) {
    return skill360Client.sendPostRequest<T>(url, data, {
      ...this.clientConfig,
      params,
    });
  }

  putSkill360<T>(url: string, params?: unknown, data?: unknown) {
    return skill360Client.sendPutRequest<T>(url, data, {
      ...this.clientConfig,
      params,
    });
  }

  // getUploadUrl<T>(data: any) {
  //   return httpClient.sendPostRequest<T>(this.uploadUrl(), data, {
  //     ...this.clientConfig,
  //   });
  // }

  uploadFile<T>({ directPutUrl, file }: UploadFilePayload) {
    return httpClientForGcs.sendPutRequest<T>(directPutUrl, file, {
      headers: { 'content-type': 'application/octet-stream' },
    });
  }

  post<T>(url: string, params?: unknown, data?: unknown) {
    return httpClient.sendPostRequest<T>(url, data, {
      ...this.clientConfig,
      params,
    });
  }

  put<T>(url: string, params?: unknown, data?: unknown) {
    return httpClient.sendPutRequest<T>(url, data, {
      ...this.clientConfig,
      params,
    });
  }

  delete<T>(url: string, params?: unknown) {
    return httpClient.sendDeleteRequest<T>(url, {
      ...this.clientConfig,
      params,
    });
  }

  static create(): CrudClient {
    return new CrudClient();
  }
}

const CrudClientInstance = CrudClient.create();

export { CrudClientInstance };
