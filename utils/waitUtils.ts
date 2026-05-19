import { Locator, Page } from '@playwright/test';

export async function waitForVisible(locator: Locator, timeout = 10000): Promise<void> {
  await locator.waitFor({ state: 'visible', timeout });
}

export async function waitForHidden(locator: Locator, timeout = 10000): Promise<void> {
  await locator.waitFor({ state: 'hidden', timeout });
}

export async function waitForNavigationComplete(page: Page, timeout = 30000): Promise<void> {
  await page.waitForLoadState('load', { timeout });
}

export default { waitForVisible, waitForHidden, waitForNavigationComplete };
