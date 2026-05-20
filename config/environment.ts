export interface EnvironmentConfig {
  baseUrl: string;
  browser: string;
  headless: boolean;
  timeout: number;
  slowMo?: number;
  viewportWidth?: number;
  viewportHeight?: number;
  featureTags?: string;
  remote: {
    enabled: boolean;
    url: string;
  };
}

const defaultEnvironment: EnvironmentConfig = {
  baseUrl: 'https://www.way2automation.com',
  browser: 'chromium',
  headless: false,
  timeout: 30000,
  featureTags: '',
  remote: {
    enabled: false,
    url: '',
  },
};

export const getEnvironmentConfig = (): EnvironmentConfig => {
  const config = defaultEnvironment;

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
    featureTags: process.env.FEATURE_TAGS || config.featureTags,
  };
};
