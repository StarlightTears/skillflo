import { expect, test } from '@playwright/test';

import { login } from '../../units/auth';
import { interceptApi } from '../../units/intercept-api';

test.describe('프로필 컴포넌트 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await interceptApi(page);
    await login(page);
  });

  test('프로필 수정 기능 테스트', async ({ page }) => {
    const visible = await page.getByText('프로필 수정').isVisible();
    visible && (await page.getByText('프로필 수정').click());
    expect(await page.getByRole('heading', { name: '개인정보 확인/수정' }).isVisible()).toBeTruthy();
  });

  test('로그아웃 기능 테스트', async ({ page }) => {
    const visible = await page.getByText('로그아웃').isVisible();
    visible && (await page.getByText('로그아웃').click());
    await page.waitForSelector('[data-e2e="login-btn"]');
    await expect(page.locator('[data-e2e="login-btn"]')).toBeInViewport();
  });
});
