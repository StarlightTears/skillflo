import { NavigateFunction } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';

import slices from '@/shared/store/slices';

export type ApiData<Data = unknown> = { data: Data };

export interface ErrorResponse {
  statusCode: number;
  code: string;
  error: string;
  message: string;
}

export interface HttpClientError extends Error {
  response?: {
    status: number;
    data: ErrorResponse;
  };
}

export interface CustomErrorHandlerContext {
  navigate: NavigateFunction;
  dispatch: Dispatch<AnyAction>;
  actions: typeof slices.actions;
}
