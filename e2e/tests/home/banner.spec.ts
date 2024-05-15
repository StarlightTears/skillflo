import { expect, test } from '@playwright/test';

import { login } from '../../units/auth';
import { interceptApi } from '../../units/intercept-api';

test.describe('배너 컴포넌트 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await interceptApi(page);
    await login(page);
  });

  test('배너 컴포넌트 렌더링 테스트', async ({ page }) => {
    await expect(page.locator('[data-e2e="banner"]')).toBeVisible();
  });
});
