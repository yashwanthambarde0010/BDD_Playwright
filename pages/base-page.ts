import { Locator, Page } from '@playwright/test';
import browserUtils from '../utils/browserUtils';
import waitUtils from '../utils/waitUtils';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  async navigate(path: string): Promise<void> {
    const url = browserUtils.buildUrl(path);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async click(selector: string): Promise<void> {
    const loc = this.locator(selector);
    await loc.click({ timeout: 20000 });
  }

  async fill(selector: string, value: string): Promise<void> {
    const loc = this.locator(selector);
    await loc.fill(value, { timeout: 20000 });
  }

  async textContent(selector: string): Promise<string> {
    return (await this.locator(selector).textContent())?.trim() || '';
  }

  async count(selector: string): Promise<number> {
    return this.locator(selector).count();
  }
}
