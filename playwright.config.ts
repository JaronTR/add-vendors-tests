import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './util/test-options';

export default defineConfig<TestOptions>({
  timeout: 60000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL:'https://alpha-app.meliopayments.com',
  },


  projects: [
    // {
    //   name: 'setup',
    //   testMatch: /auth\.setup\.ts/,
    //   use: { ...devices['Desktop Chrome'] },
    // },
    {
      name: 'chromium',
      // testMatch: /vendor-creation-tests\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] 
        // ,storageState: '.auth/user-state.json'
        },
      // dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      // dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      // dependencies: ['setup'],
    },
  ],
});
