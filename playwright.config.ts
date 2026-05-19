import { defineConfig, devices, FullConfig } from '@playwright/test';
import { getEnvironmentConfig } from './config/environment';

const config = getEnvironmentConfig();

const projectDefinitions = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'edge',
    use: { ...devices['Desktop Edge'], channel: 'msedge' },
  },
];

const browserEnv = process.env.BROWSER?.toLowerCase();
const selectedProjects = browserEnv
  ? projectDefinitions.filter((project) => project.name === browserEnv)
  : projectDefinitions;

const getWorkerCount = () => {
  const value = process.env.WORKERS?.trim();
  if (!value) {
    return process.env.CI ? 2 : undefined;
  }

  if (value.toLowerCase() === 'auto') {
    return undefined;
  }

  if (/^\d+%$/.test(value)) {
    return value;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: getWorkerCount(),
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/playwright-html', open: 'never' }],
  ],
  use: {
    baseURL: config.baseUrl,
    headless: config.headless,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: config.timeout,
    launchOptions: {
      args: ['--start-maximized'],
    },
    connectOptions: config.remote.enabled && config.remote.url ? { wsEndpoint: config.remote.url } : undefined,
  },
  projects: selectedProjects,
  outputDir: 'reports/test-results',
  webServer: undefined,
  metadata: {
    environment: process.env.ENV || 'qa',
    browser: process.env.BROWSER || config.browser,
  },
  globalSetup: undefined,
  globalTeardown: undefined,
});
