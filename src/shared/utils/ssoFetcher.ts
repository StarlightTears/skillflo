import { HttpResponse } from '@day1co/pebbles';

import { getKbstarSsoToken, getSsoToken } from '../api/auth';

interface SsoFetcherParams<ApiParams, ResponseData> {
  urlRegExp: RegExp;
  getParams: (queryObject: Record<string, string>) => ApiParams;
  api: (param: ApiParams) => Promise<HttpResponse<ResponseData>>;
  getRedirectApi: (response: HttpResponse<ResponseData>) => string;
  getTokens: (response: HttpResponse<ResponseData>) => { accessToken: string; memberToken?: string };
}

export class SsoFetcher<ApiParams, ResponseData> {
  private params: SsoFetcherParams<ApiParams, ResponseData>;
  private responseData?: HttpResponse<ResponseData>;

  constructor(params: SsoFetcherParams<ApiParams, ResponseData>) {
    this.params = params;
  }

  async authorize(searchParams: URLSearchParams | Record<string, string>) {
    const queryObject =
      searchParams instanceof URLSearchParams ? Object.fromEntries(searchParams.entries()) : searchParams;
    const apiParams = this.params.getParams(queryObject);
    this.responseData = await this.params.api(apiParams);
  }

  getTokens() {
    if (!this.responseData) {
      throw new Error('authorize를 먼저 호출해야 합니다.');
    }

    return this.params.getTokens(this.responseData);
  }

  getRedirectURL() {
    if (!this.responseData) {
      throw new Error('authorize를 먼저 호출해야 합니다.');
    }

    return this.params.getRedirectApi?.(this.responseData) ?? '/';
  }

  matchUrl(url: string) {
    return this.params.urlRegExp.test(url);
  }

  // ! ssoFetcher는 반드시 defaultssoFetcher보다 위로 올라와야 함
  static ssoFetcher: SsoFetcher<unknown, unknown>[] = [];
  static defaultssoFetcher = SsoFetcher.create({
    urlRegExp: /skillflo/,
    getParams: (queryObject) => ({ code: queryObject.code }),
    api: getSsoToken,
    getTokens: ({ data: { authToken, memberToken } }) => ({ accessToken: authToken, memberToken }),
    getRedirectApi: ({ data: { productId, courseId } }) =>
      productId && courseId ? `/classroom/${productId}/${courseId}` : '/',
  });

  static create<InstanceApiParams, InstanceResponseData>(
    params: SsoFetcherParams<InstanceApiParams, InstanceResponseData>
  ) {
    const ssoFetcherInstance = new SsoFetcher<InstanceApiParams, InstanceResponseData>(params);
    SsoFetcher.ssoFetcher.push(ssoFetcherInstance as SsoFetcher<unknown, unknown>);

    return ssoFetcherInstance;
  }

  static getSsoInstanceByURL(url: string) {
    for (const ssoFetcherInstance of [...SsoFetcher.ssoFetcher].reverse()) {
      if (ssoFetcherInstance.matchUrl(url)) {
        return ssoFetcherInstance;
      }
    }

    return SsoFetcher.defaultssoFetcher;
  }
}

// * kbstar sso wrapper
SsoFetcher.create({
  urlRegExp: /^https?:\/\/(www\.)?kbstar.((staging|dev|qa)\.)?skillflo.io/,
  getParams: (queryObject) => ({ jsonWebToken: queryObject.code }),
  api: getKbstarSsoToken,
  getTokens: ({ data: { access_token } }) => ({ accessToken: access_token }),
  getRedirectApi: () => '/',
});
