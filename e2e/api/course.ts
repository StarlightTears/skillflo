import { Page } from '@playwright/test';

import allCourse from '../fixtures/course/all-course.json';
import composerPage from '../fixtures/course/composer-page.json';
import courseProgress from '../fixtures/course/course-progress.json';
import recentCourse from '../fixtures/course/recent-course.json';

const getAllCourse = async (page: Page) => {
  await page.route('/api/b2e/curation/all-course', async (route) => {
    const body = JSON.stringify(allCourse);
    await route.fulfill({ body });
  });
};

const getCourse = async (page: Page) => {
  await page.route('/api/b2e/course/NaN', async (route) => {
    const body = JSON.stringify({});
    await route.fulfill({ body });
  });
};

const getRecentCourse = async (page: Page) => {
  await page.route('/api/b2e/mypage/recent-course', async (route) => {
    const body = JSON.stringify(recentCourse);
    await route.fulfill({ body });
  });
};

const getCourseProgress = async (page: Page) => {
  await page.route('/api/b2e/mypage/course-progress', async (route) => {
    const body = JSON.stringify(courseProgress);
    await route.fulfill({ body });
  });
};

const getComposerPage = async (page: Page) => {
  await page.route('/api/b2e/page/37379', async (route) => {
    const body = JSON.stringify(composerPage);
    await route.fulfill({ body });
  });
};

export const courseApis = [getAllCourse, getCourse, getRecentCourse, getCourseProgress, getComposerPage];
