import path, { resolve } from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import stylelint from 'vite-plugin-stylelint';
import svgr from 'vite-plugin-svgr';

const e2e = process.env.D1_ENV === 'e2e';
const apiPort = 8084;
const now = new Date();

const devServerConfig: { host: string; port: number; proxy?: Record<string, { target: string }> } = {
  host: 'localhost',
  port: 8082,
  proxy: {
    '/api': {
      target: `http://localhost:${apiPort}`,
    },
  },
};

if (e2e) delete devServerConfig.proxy;

export default defineConfig({
  define: {
    D1_ENV: JSON.stringify(process.env.D1_ENV),
    SKILLFLO_ACCESS_TOKEN: JSON.stringify('access_token'),
    SKILLFLO_MEMBER_TOKEN: JSON.stringify('member_token'),
    SKILLFLO_KOLLUS_URL: JSON.stringify('https://v.kr.kollus.com'),
    SKILLFLO_KOLLUS_CUSTOM_KEY: JSON.stringify('0b50155632326ca34e42550f10d6fca2c42c7b62a47eee4841aabd0cd1a913ea'),
    SKILLFLO_GTM_ID: JSON.stringify('GTM-5SVLS86'),
    SKILLFLO_CHANNEL_TALK_KEY: JSON.stringify('790f1790-a987-4b1a-9367-133b1f7e8477'),
    SKILLFLO_DATADOG_CLIENT_TOKEN: JSON.stringify('pub4f6aeca7e19886abb8460f825f799ea7'),
    SKILLFLO_DATADOG_APPLICATION_ID: JSON.stringify('8234b0fb-47a6-4490-921d-fcda93af88cc'),
    SKILLFLO_BUILD_VERSION: JSON.stringify(now.toISOString()),
    SKILLFLO_ZOOM_CLIENT_ID: JSON.stringify('uva5YnIRuCqNWQ_pq2Nhw'),
    SKILLFLO_ZOOM_CLIENT_SECRET: JSON.stringify('8InfkVs1VuGpP48kzbQZ0L8zkdm1gIpn'),
  },
  plugins: [
    checker({
      typescript: true,
    }),
    svgr({
      svgrOptions: {
        svgoConfig: [
          {
            removeUselessStrokeAndFill: false,
          },
          {
            removeUnknownsAndDefaults: false,
          },
        ],
      },
    }),
    react({
      jsxImportSource: '@emotion/react',
      plugins: [
        [
          '@swc/plugin-emotion',
          {
            autoLabel: process.env.D1_ENV === 'local' ? 'always' : 'never',
          },
        ],
      ],
    }),
    stylelint({
      include: ['./src/**/*.{ts,tsx}'],
    }),
    viteStaticCopy({
      targets: [
        {
          src: './maintenance.html',
          dest: './',
        },
      ],
    }),
  ],
  build: {
    sourcemap: process.env.D1_ENV === 'local',
    outDir: 'build',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        'zoom-client': resolve(__dirname, 'zoom-client.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
    extensions: ['.js', '.ts', '.tsx', '.css'],
  },
  server: devServerConfig,
});
