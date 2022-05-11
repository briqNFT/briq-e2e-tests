import { LaunchOptions } from '@playwright/test';
const browserOptions: LaunchOptions = {
  slowMo: 0,
  headless: true,
  args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true,
  },
};

export const config = {
  browser: process.env.BROWSER || 'chromium',
  browserOptions,
  IMG_THRESHOLD: { threshold: 0.4 },
  BASE_BRIQ_URL: 'http://localhost:3000'
};
