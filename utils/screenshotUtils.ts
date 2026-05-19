import { Page } from '@playwright/test';
import { promises as fs } from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.join(process.cwd(), 'reports', 'screenshots');

export async function ensureScreenshotDir(): Promise<void> {
  await fs.mkdir(SCREENSHOT_DIR, { recursive: true });
}

export async function takeScreenshot(page: Page, name = 'screenshot'): Promise<string> {
  await ensureScreenshotDir();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${name}-${timestamp}.png`;
  const filepath = path.join(SCREENSHOT_DIR, filename);
  await page.screenshot({ path: filepath, fullPage: true });
  return filepath;
}

export default { takeScreenshot, ensureScreenshotDir };
