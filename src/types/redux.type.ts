import { slices } from '@/shared/store/slices';

export type Action = {
  payload?: {
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export type SliceTypes = keyof typeof slices;
