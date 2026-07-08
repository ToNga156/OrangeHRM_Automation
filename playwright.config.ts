import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  // Test folder
  testDir: './tests',

  // Execute tests in parallel
  fullyParallel: false,

  // Prevent test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Limit workers on CI
  workers: process.env.CI ? 1 : undefined,

  // Global timeout
  timeout: Number(process.env.TIMEOUT) || 30000,

  // Expect timeout
  expect: {
    timeout: 5000,
  },

  // Reporters
  reporter: [
    ['html'],
    ['allure-playwright'],
  ],

  use: {
    // Base URL
    baseURL: process.env.BASE_URL,

    // Browser mode
    headless: process.env.HEADLESS === 'true',

    // Capture artifacts
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',

    // Ignore HTTPS errors if needed
    ignoreHTTPSErrors: true,

    // Default action timeout
    actionTimeout: 10000,

    // Default navigation timeout
    navigationTimeout: 30000,
  },

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // Uncomment when needed

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     ...devices['Desktop Edge'],
    //     channel: 'msedge',
    //   },
    // },
  ],
});