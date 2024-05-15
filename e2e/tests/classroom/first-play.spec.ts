import { test, expect } from '@playwright/test';

import { defaultClassroomApis, getVideoInfo } from '../../api/classroom';
import { login } from '../../units/auth';
import { interceptApi } from '../../units/intercept-api';

test.describe('Classroom Test', () => {
  if (process.env.CI) return;

  test.beforeEach(async ({ page }) => {
    await interceptApi(page, [...defaultClassroomApis, getVideoInfo]);
  });

  test('처음부터 보기 - 60초 interval 시청기록 Update', async ({ page }) => {
    test.setTimeout(300000);

    await login(page);

    await page.route('/api/b2e/classroom/progress/update', async (route, request) => {
      const { start, end, interval } = request.postDataJSON().extras.timeRange[0];

      expect(start === 0 && end < 62 && interval === end - start).toBeTruthy();

      const body = JSON.stringify({});
      await route.fulfill({ body });
    });

    await page.goto('http://localhost:8082/classroom/product/10085/course/10000/courseContent/10000');

    await page.waitForSelector('.fc-player iframe');
    await expect(page.frameLocator('.fc-player iframe').locator('#kollus_player').isVisible()).toBeTruthy();

    await page.waitForRequest(
      (request) =>
        request.url() === 'http://localhost:8082/api/b2e/classroom/progress/update' && request.method() === 'PUT'
    );
  });
});
