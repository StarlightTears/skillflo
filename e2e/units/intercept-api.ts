import { mockApis } from '../api';

import type { Page } from '@playwright/test';

export const interceptApi = async (page: Page, customApiList: ((page: Page) => Promise<void>)[] = []) => {
  await Promise.all([...mockApis, ...customApiList].flat().map((api) => api(page)));
};
