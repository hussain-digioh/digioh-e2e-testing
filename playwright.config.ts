import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  reporter: [
    ['html', { open: 'never' }],
    ['list'], // Add a simple console output
    ['json', { outputFile: 'test-results.json' }] // Optional JSON report
  ],
  timeout: 30000,
  workers: 1,
  use: {
    baseURL: 'https://account.digioh.com/',
    trace: 'on-first-retry', // Enables trace recording on first retry
    screenshot: 'only-on-failure', // Useful for debugging
    video: 'retain-on-failure',
    headless: false,

  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    // {
    //   name: 'Firefox',
    //   use: { browserName: 'firefox' },
    // },
    // {
    //   name: 'WebKit',
    //   use: { browserName: 'webkit' },
    // },
  ],
});
