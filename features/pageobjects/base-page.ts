//superclass

import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async click(locator: string) {
    await this.page.locator(locator).click();
  }

  async type(locator: string, value: string) {
    await this.page.locator(locator).fill(value);
  }

  async getText(locator: string): Promise<string> {
    return await this.page.locator(locator).innerText();
  }

  async hover(locator: string) {
    await this.page.locator(locator).hover();
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async waitForTimeout(timeout: number) {
    await this.page.waitForTimeout(timeout);
  }

  async select(locator: string, value: string) {
    await this.page.locator(locator).selectOption(value);
  }
}