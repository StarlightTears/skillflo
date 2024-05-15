import { GcsFile } from './file.interface';

export interface HomeContentWrapper {
  title: string;
  subtitle: string;
  description: string;
  pageIds: number[];
  pages: HomeContent[];
}

export interface HomeContent {
  keywords: string[];
  logoFile: GcsFile[];
  redirectUrl?: string;
  originPageId?: number;
}
