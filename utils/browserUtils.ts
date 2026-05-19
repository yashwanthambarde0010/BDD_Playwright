import {
  Browser,
  BrowserContext,
  BrowserType,
  chromium,
  firefox,
  webkit,
  Page
} from '@playwright/test';

import { getEnvironmentConfig } from '../config/environment';

export class BrowserUtils {

  /**
   * Build complete URL using base URL
   */
  static buildUrl(path: string): string {
    const base = getEnvironmentConfig().baseUrl;

    if (!path) return base;

    if (
      path.startsWith('http://') ||
      path.startsWith('https://')
    ) {
      return path;
    }

    try {
      return new URL(path, base).toString();
    } catch (error) {
      return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
    }
  }

  /**
   * Get configured browser name
   */
  static getConfiguredBrowser(): string {
    return getEnvironmentConfig().browser || 'chromium';
  }

  /**
   * Launch browser dynamically
   */
  static async launchBrowser(): Promise<Browser> {

    const config = getEnvironmentConfig();

    const browserName = config.browser || 'chromium';

    const launchOptions = {
      headless: config.headless ?? true,
      slowMo: config.slowMo || 0
    };

    let browserType: BrowserType;

    switch (browserName.toLowerCase()) {

      case 'firefox':
        browserType = firefox;
        break;

      case 'webkit':
      case 'safari':
        browserType = webkit;
        break;

      case 'edge':
        browserType = chromium;
        return await browserType.launch({
          ...launchOptions,
          channel: 'msedge'
        });

      case 'chrome':
        browserType = chromium;
        return await browserType.launch({
          ...launchOptions,
          channel: 'chrome'
        });

      default:
        browserType = chromium;
    }

    return await browserType.launch(launchOptions);
  }

  /**
   * Create browser context
   */
  static async createBrowserContext(
    browser: Browser
  ): Promise<BrowserContext> {

    const config = getEnvironmentConfig();

    return await browser.newContext({
      viewport: {
        width: config.viewportWidth || 1920,
        height: config.viewportHeight || 1080
      },
      ignoreHTTPSErrors: true,
      acceptDownloads: true,
    });
  }

  /**
   * Create new page
   */
  static async createNewPage(
    context: BrowserContext
  ): Promise<Page> {

    const page = await context.newPage();

    page.setDefaultTimeout(30000);
    page.setDefaultNavigationTimeout(60000);

    return page;
  }

  /**
   * Navigate to URL
   */
  static async navigateTo(
    page: Page,
    path: string = ''
  ): Promise<void> {

    const url = this.buildUrl(path);

    await page.goto(url, {
      waitUntil: 'domcontentloaded'
    });
  }

  /**
   * Refresh current page
   */
  static async refreshPage(page: Page): Promise<void> {
    await page.reload({
      waitUntil: 'networkidle'
    });
  }

  /**
   * Navigate back
   */
  static async navigateBack(page: Page): Promise<void> {
    await page.goBack();
  }

  /**
   * Navigate forward
   */
  static async navigateForward(page: Page): Promise<void> {
    await page.goForward();
  }

  /**
   * Maximize window
   */
  static async maximizeWindow(page: Page): Promise<void> {

    await page.setViewportSize({
      width: 1920,
      height: 1080
    });
  }

  /**
   * Get current page title
   */
  static async getPageTitle(page: Page): Promise<string> {
    return await page.title();
  }

  /**
   * Get current URL
   */
  static getCurrentURL(page: Page): string {
    return page.url();
  }

  /**
   * Get page source/content
   */
  static async getPageContent(page: Page): Promise<string> {
    return await page.content();
  }

  /**
   * Take screenshot
   */
  static async takeScreenshot(
    page: Page,
    fileName: string
  ): Promise<void> {

    await page.screenshot({
      path: `reports/screenshots/${fileName}.png`,
      fullPage: true
    });
  }

  /**
   * Open new tab
   */
  static async openNewTab(
    context: BrowserContext
  ): Promise<Page> {

    return await context.newPage();
  }

  /**
   * Switch to tab using index
   */
  static async switchToTab(
    context: BrowserContext,
    index: number
  ): Promise<Page> {

    const pages = context.pages();

    return pages[index];
  }

  /**
   * Close current page
   */
  static async closePage(page: Page): Promise<void> {
    await page.close();
  }

  /**
   * Close browser context
   */
  static async closeContext(
    context: BrowserContext
  ): Promise<void> {

    await context.close();
  }

  /**
   * Close browser
   */
  static async closeBrowser(
    browser: Browser
  ): Promise<void> {

    await browser.close();
  }

  /**
   * Clear cookies
   */
  static async clearCookies(
    context: BrowserContext
  ): Promise<void> {

    await context.clearCookies();
  }

  /**
   * Clear browser permissions
   */
  static async clearPermissions(
    context: BrowserContext
  ): Promise<void> {

    await context.clearPermissions();
  }

  /**
   * Set browser local storage
   */
  static async setLocalStorage(
    page: Page,
    key: string,
    value: string
  ): Promise<void> {

    await page.evaluate(
      ([k, v]) => localStorage.setItem(k, v),
      [key, value]
    );
  }

  /**
   * Get browser local storage value
   */
  static async getLocalStorage(
    page: Page,
    key: string
  ): Promise<string | null> {

    return await page.evaluate(
      (k) => localStorage.getItem(k),
      key
    );
  }

  /**
   * Delete local storage key
   */
  static async removeLocalStorage(
    page: Page,
    key: string
  ): Promise<void> {

    await page.evaluate(
      (k) => localStorage.removeItem(k),
      key
    );
  }

  /**
   * Clear local storage
   */
  static async clearLocalStorage(
    page: Page
  ): Promise<void> {

    await page.evaluate(() => localStorage.clear());
  }

  /**
   * Execute JavaScript
   */
  static async executeScript(
    page: Page,
    script: string
  ): Promise<any> {

    return await page.evaluate(script);
  }

  /**
   * Wait for page fully loaded
   */
  static async waitForPageLoad(
    page: Page
  ): Promise<void> {

    await page.waitForLoadState('load');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');
  }
}

export default BrowserUtils;