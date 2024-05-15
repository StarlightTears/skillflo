import { expect, Page } from '@playwright/test';

export const login = async (page: Page) => {
  await page.goto('http://localhost:8082/auth/signin');
  await page.locator('[data-e2e="email"]').click();
  await page.locator('[data-e2e="email"]').type('skillflo@skillflo.io');
  await page.locator('[data-e2e="password"]').click();
  await page.locator('[data-e2e="password"]').type('12345678');
  await page.locator('[data-e2e="login-btn"]').click();
  await expect(page.getByText('Skillflo_MemberGroup1').first()).toBeVisible({ timeout: 10000 });
};
