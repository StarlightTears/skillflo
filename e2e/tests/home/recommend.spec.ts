import { expect, test } from '@playwright/test';

import { login } from '../../units/auth';
import { interceptApi } from '../../units/intercept-api';

test.describe('추천강의 컴포넌트 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await interceptApi(page);
    await login(page);
  });

  test('카드 클릭 기능 테스트', async ({ page }) => {
    await page.locator('[data-e2e="recommend"]').nth(0).click();
    await expect(page).toHaveURL('course/10002');
  });
});
