import type { Interpolation, Theme } from '@emotion/react';
import type { ReactNode } from 'react';

export type PropsWithStyle<Props = unknown> = { className?: string; css?: Interpolation<Theme> } & Props;

export type SlotProps<Properties extends string> = {
  [Property in Properties]?: ReactNode;
};
