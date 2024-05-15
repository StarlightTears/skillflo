import {
  MutationFunction,
  QueryFunction,
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { useEffect } from 'react';

import type { HttpClientError } from '@/types/api.interface';

import { useErrorHandler, useToken } from '@/shared/hooks';

interface CustomQueryHookOption<CustomError> {
  disabledDefaultErrorHandler: boolean;
  onError(error: CustomError): void;
  dismissAuth?: boolean;
}

// TODO: 나중에 type 정리가 필요할 것 같다....
export const useBpoQuery = <
  QueryData,
  QueryError extends Error = Error | HttpClientError,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<QueryData, TQueryKey>,
  customOptions: Omit<UseQueryOptions<QueryData, QueryError, QueryData, TQueryKey>, 'queryKey' | 'queryFn'> &
    Partial<CustomQueryHookOption<QueryError>> = {}
) => {
  const { disabledDefaultErrorHandler, onError: customErrorHandler, dismissAuth, ...options } = customOptions;
  const { accessToken, memberToken, logout } = useToken();

  const errorHandler = useErrorHandler(customErrorHandler);
  const enabled = Boolean(accessToken || memberToken) && (options.enabled ?? true);

  const onError = (error: QueryError) => {
    if (disabledDefaultErrorHandler) {
      customErrorHandler?.(error);
      return;
    }

    errorHandler?.(error);
  };

  useEffect(() => {
    if (accessToken && memberToken) return;
    if (dismissAuth) return;

    logout();
  }, [accessToken, memberToken]);

  return useQuery(queryKey, queryFn, { ...options, enabled, onError });
};

export const useBpoMutation = <
  MutationData = unknown,
  MutationError extends Error = Error | HttpClientError,
  MutationVariables = void,
  MutationContext = unknown,
>(
  mutationFunction: MutationFunction<MutationData, MutationVariables>,
  customOptions: Omit<
    UseMutationOptions<MutationData, MutationError, MutationVariables, MutationContext>,
    'mutationFn'
  > &
    Partial<CustomQueryHookOption<MutationError>> = {}
) => {
  const { disabledDefaultErrorHandler, onError: customErrorHandler, ...options } = customOptions;

  const errorHandler = useErrorHandler(customErrorHandler);

  const onError = (error: MutationError) => {
    if (disabledDefaultErrorHandler) {
      customErrorHandler?.(error);
      return;
    }

    errorHandler?.(error);
  };

  return useMutation(mutationFunction, { onError, ...options });
};
