import { test, expect } from '@playwright/test';

import { defaultClassroomApis, getVideoInfo } from '../../api/classroom';
import { login } from '../../units/auth';
import { interceptApi } from '../../units/intercept-api';

test.describe('Classroom Test', () => {
  if (process.env.CI) return;

  test.beforeEach(async ({ page }) => {
    await interceptApi(page, [...defaultClassroomApis, getVideoInfo]);
  });

  test('구간이동시 시청기록 Update', async ({ page }) => {
    await login(page);
    const timeSectionScenarioList = [
      { start: 0, end: 6 }, // 5초 시청 후 구간이동 전, pause event까지의 구간기록
      { start: 47, end: 57 }, // 구간이동 후, pause event까지의 구간기록
    ];

    await page.route('/api/b2e/classroom/progress/update', async (route, request) => {
      const { start, end, interval } = request.postDataJSON().extras.timeRange[0];
      const currentTimeSectionScenario = timeSectionScenarioList.shift();

      expect(
        start >= (currentTimeSectionScenario as { start: number; end: number }).start &&
          end <= (currentTimeSectionScenario as { start: number; end: number }).end &&
          interval === end - start
      ).toBeTruthy();

      const body = JSON.stringify({});
      await route.fulfill({ body });
    });
    await page.goto('/classroom/product/10085/course/10000/courseContent/10000');
    await page.waitForSelector('.fc-player iframe');
    await expect(page.frameLocator('.fc-player iframe').locator('#kollus_player').isVisible()).toBeTruthy();

    await page.waitForTimeout(5000);
    await page.frameLocator('iframe').first().locator('.vjs-progress-holder').hover();
    await page
      .frameLocator('.fc-player iframe')
      .locator('.vjs-progress-holder') // kollus player의 재생바 class.. e2e 선택자가 없고, aria-label가 있긴하지만 locator로 선택되지 않아서, class로 지정하였다. 클래스가 변동된다면, 테스트 실패의 여지가 있다.
      .click({ position: { x: 100, y: 2 } });
    await page.waitForTimeout(5000);
    await page.frameLocator('.fc-player iframe').locator('#kollus_player').click();
  });
});
