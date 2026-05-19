import { EnvironmentConfig, getEnvironmentConfig } from '../config/environment';

export class EnvironmentHelper {
  static getConfig(): EnvironmentConfig {
    return getEnvironmentConfig();
  }

  static getEnvironmentName(): string {
    return process.env.ENV?.toLowerCase() || 'qa';
  }

  static getBaseUrl(): string {
    return this.getConfig().baseUrl;
  }

  static isRemoteEnabled(): boolean {
    return this.getConfig().remote.enabled;
  }

  static getRemoteUrl(): string {
    return this.getConfig().remote.url;
  }

  static getBrowserName(): string {
    return this.getConfig().browser;
  }

  static isHeadless(): boolean {
    return this.getConfig().headless;
  }
}

export default EnvironmentHelper;
