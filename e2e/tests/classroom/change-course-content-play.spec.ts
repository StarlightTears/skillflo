import { test, expect } from '@playwright/test';

import { defaultClassroomApis, getVideoInfo, getVideoInfo2 } from '../../api/classroom';
import { login } from '../../units/auth';
import { interceptApi } from '../../units/intercept-api';

test.describe('Classroom Test', () => {
  if (process.env.CI) return;

  test.beforeEach(async ({ page }) => {
    await interceptApi(page, [...defaultClassroomApis, getVideoInfo, getVideoInfo2]);
  });

  test('시청중 다른 코스컨텐츠 이동시, 직전 시청기록 Update', async ({ page }) => {
    await login(page);

    await page.route('/api/b2e/classroom/progress/update', async (route, request) => {
      const { start, end, interval } = request.postDataJSON().extras.timeRange[0];

      expect(start >= 0 && end <= 12 && interval === end - start).toBeTruthy();

      const body = JSON.stringify({});
      await route.fulfill({ body });
    });

    await page.goto('/classroom/product/10085/course/10000/courseContent/10000');
    await page.waitForSelector('.fc-player iframe');
    await expect(page.frameLocator('.fc-player iframe').locator('#kollus_player').isVisible()).toBeTruthy();

    await page.waitForTimeout(10000);

    // 다음 코스컨텐츠로 이동
    await page.locator('[data-e2e="index-link"]').nth(1).click();

    await page.waitForTimeout(5000);
  });
});
