import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL ?? 'https://anthonyaelias.github.io/Playwright-Practice/';
const webServerCommand = process.env.PLAYWRIGHT_WEB_SERVER_COMMAND;
const demoViewport = { width: 1440, height: 1200 };

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: {
    timeout: 5_000
  },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: demoViewport }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], viewport: demoViewport }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], viewport: demoViewport }
    }
  ],
  webServer: webServerCommand
    ? {
        command: webServerCommand,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000
      }
    : undefined
});
