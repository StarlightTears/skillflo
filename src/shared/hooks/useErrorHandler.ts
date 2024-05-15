import { useNavigate } from 'react-router-dom';

import slices from '../store/slices';
import { isHttpClientError } from '../utils/api';

import { useAppDispatch } from './useAppDispatch';

import type { CustomErrorHandlerContext, HttpClientError } from '@/types/api.interface';

import { errorObject } from '@/shared/policy';

export const useErrorHandler = <QueryError extends Error = Error | HttpClientError>(
  customHandler?: (error: QueryError, context: CustomErrorHandlerContext) => void
) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const context: CustomErrorHandlerContext = { navigate, dispatch, actions: slices.actions };

  return (error: QueryError) => {
    if (!(error instanceof Error)) throw error;

    try {
      if (!isHttpClientError(error)) {
        customHandler?.(error, context);
        return;
      }

      const errorName = error?.response?.data?.error;
      if (errorName && errorObject[errorName]) {
        errorObject[errorName](context, error);
      }
      customHandler?.(error, context);
    } finally {
      void 0; // * 린트 에러 방지를 하기 위해 넣는 코드...
    }
  };
};
