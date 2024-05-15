import type { HttpClientError } from '@/types/api.interface';

export const isHttpClientError = (error: Error | HttpClientError): error is HttpClientError => {
  return 'response' in error;
};
