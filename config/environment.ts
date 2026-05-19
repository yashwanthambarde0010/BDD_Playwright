export interface EnvironmentConfig {
  baseUrl: string;
  browser: string;
  headless: boolean;
  timeout: number;
  slowMo?: number;
  viewportWidth?: number;
  viewportHeight?: number;
  recordVideo?: boolean;
  remote: {
    enabled: boolean;
    url: string;
  };
}

const environments: Record<string, EnvironmentConfig> = {
  qa: {
    baseUrl: 'https://www.way2automation.com',
    browser: 'chromium',
    headless: false,
    timeout: 30000,
    remote: {
      enabled: false,
      url: '',
    },
  },
  uat: {
    baseUrl: 'https://www.way2automation.com',
    browser: 'chromium',
    headless: false,
    timeout: 30000,
    remote: {
      enabled: false,
      url: '',
    },
  },
  prod: {
    baseUrl: 'https://www.way2automation.com',
    browser: 'chromium',
    headless: false,
    timeout: 30000,
    remote: {
      enabled: false,
      url: '',
    },
  },
};

export const getEnvironmentConfig = (): EnvironmentConfig => {
  const env = process.env.ENV?.toLowerCase() || 'qa';
  const config = environments[env] || environments.qa;

  return {
    ...config,
    browser: process.env.BROWSER?.toLowerCase() || config.browser,
    headless: process.env.HEADLESS ? process.env.HEADLESS.toLowerCase() === 'true' : config.headless,
    remote: {
      enabled: process.env.REMOTE_ENABLED?.toLowerCase() === 'true' || config.remote.enabled,
      url: process.env.REMOTE_URL || config.remote.url,
    },
    baseUrl: process.env.BASE_URL || config.baseUrl,
    slowMo: process.env.SLOW_MO ? Number(process.env.SLOW_MO) : config.slowMo,
    viewportWidth: process.env.VIEWPORT_WIDTH ? Number(process.env.VIEWPORT_WIDTH) : config.viewportWidth,
    viewportHeight: process.env.VIEWPORT_HEIGHT ? Number(process.env.VIEWPORT_HEIGHT) : config.viewportHeight,
    recordVideo: process.env.RECORD_VIDEO ? process.env.RECORD_VIDEO.toLowerCase() === 'true' : config.recordVideo,
  };
};
