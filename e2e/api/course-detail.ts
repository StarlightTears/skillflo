import { Page } from '@playwright/test';

import courseBridge from '../fixtures/course-detail/course-bridge.json';
import courseDetail from '../fixtures/course-detail/course-detail.json';

const getCourseDetail = () => {
  return [
    async (page: Page) =>
      await page.route('/api/b2e/curation/course-detail/10002?productId=10130&noticeLimit=10', async (route) => {
        const body = JSON.stringify(courseDetail);
        await route.fulfill({ body });
      }),
    async (page: Page) =>
      await page.route('/api/b2e/curation/course-detail/10361?productId=10130&noticeLimit=10', async (route) => {
        const body = JSON.stringify(courseDetail);
        await route.fulfill({ body });
      }),
    async (page: Page) =>
      await page.route('/api/b2e/curation/course-detail/10005?productId=10734&noticeLimit=10', async (route) => {
        const body = JSON.stringify(courseDetail);
        await route.fulfill({ body });
      }),
  ];
};
const getCourseBridge = () => {
  return [
    async (page: Page) =>
      await page.route('/api/b2e/curation/course-bridge/10002?noticeLimit=10', async (route) => {
        const body = JSON.stringify(courseBridge);
        await route.fulfill({ body });
      }),
    async (page: Page) =>
      await page.route('/api/b2e/curation/course-bridge/10361?noticeLimit=10', async (route) => {
        const body = JSON.stringify(courseBridge);
        await route.fulfill({ body });
      }),
    async (page: Page) =>
      await page.route('/api/b2e/curation/course-bridge/10005?noticeLimit=10', async (route) => {
        const body = JSON.stringify(courseBridge);
        await route.fulfill({ body });
      }),
  ];
};

export const courseDetailApis = [...getCourseDetail(), ...getCourseBridge()];
