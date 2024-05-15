import { GcsFile } from './file.interface';

interface CustomerExtras {
  businessNo?: string;
  postCode?: string;
  address?: string;
  addressExtra?: string;
  footNote?: string;
  logoFiles?: GcsFile[];
  jobs?: string[];
  ranks?: string[];
}

export interface Customer {
  id: number;
  type: string;
  state: string;
  flags?: number;
  code?: string;
  name?: string;
  description?: string;
  updated_at?: Date;
  created_at?: Date;
  extras: CustomerExtras;
}
