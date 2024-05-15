import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { loadScript } from '@day1co/browser-util';

import { getLogger } from './shared/utils/logger';

import type { ExternalScripts } from '@/shared/policy';

import { getApiUrl } from '@/shared/api';
import config from '@/shared/config';
const logger = getLogger('components', 'ExternalScript');

const externalScriptInitializerMap: Record<ExternalScripts, () => void> = {
  gtm: () => {
    if (!window.dataLayer) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      loadScript(`//www.googletagmanager.com/gtm.js?id=${config.GTM_ID}`).catch((err: Error) => {
        if (err.message !== 'REJECTED: Already Installed') {
          logger.info(err.message);
        }
        logger.info('install err!', err);
      });
    }
  },
  datadog: () => {
    if (config.ENV === 'production') {
      const DATADOG_OPTIONS = {
        site: 'datadoghq.eu',
        service: 'skillflo',
        env: config.ENV,
        tracingUrl: getApiUrl(),
        clientToken: config.DATADOG_CLIENT_TOKEN,
        applicationId: config.DATADOG_APPLICATION_ID,
        version: config.BUILD_VERSION,
      };

      datadogLogs.init({
        clientToken: DATADOG_OPTIONS.clientToken,
        site: DATADOG_OPTIONS.site,
        service: DATADOG_OPTIONS.service,
        env: DATADOG_OPTIONS.env,
        forwardErrorsToLogs: true,
        sessionSampleRate: 100,
        version: DATADOG_OPTIONS.version,
      });

      datadogRum.init({
        applicationId: DATADOG_OPTIONS.applicationId,
        clientToken: DATADOG_OPTIONS.clientToken,
        site: DATADOG_OPTIONS.site,
        service: DATADOG_OPTIONS.service,
        env: DATADOG_OPTIONS.env,
        sessionSampleRate: 1,
        sessionReplaySampleRate: 0,
        trackUserInteractions: true,
        trackResources: true,
        trackLongTasks: true,
        defaultPrivacyLevel: 'mask-user-input',
        allowedTracingUrls: [DATADOG_OPTIONS.tracingUrl, (url: string) => url.startsWith(DATADOG_OPTIONS.tracingUrl)],
        version: DATADOG_OPTIONS.version,
      });

      datadogRum.startSessionReplayRecording();
    }
  },
};

const ExternalScripts = () => {
  const { pathname } = useLocation();
  const externalScripts: ExternalScripts[] = ['gtm', 'datadog'];

  useEffect(() => {
    externalScripts.forEach((scriptName) => {
      externalScriptInitializerMap[scriptName]();
    });
  }, []);

  useEffect(() => {
    window.dataLayer.push({
      routeName: pathname,
      pageType: 'PageView',
      pageUrl: window.location.href,
      pageTitle: (typeof document !== 'undefined' && document.title) || '',
      event: 'PageView',
    });
  }, [pathname]);

  return null;
};

export default ExternalScripts;
