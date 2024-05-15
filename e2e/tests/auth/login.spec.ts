import { test } from '@playwright/test';

import { login } from '../../units/auth';
import { interceptApi } from '../../units/intercept-api';

test.describe('Login Test', () => {
  test.beforeEach(async ({ page }) => {
    await interceptApi(page);
  });

  test('Login Test', async ({ page }) => {
    await login(page);
  });
});
