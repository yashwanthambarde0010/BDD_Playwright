import { test, expect } from '@playwright/test';
import { getEnvironmentConfig } from '../config/environment';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
import { Logger } from '../utils/logger';
import { TestDataHelper } from '../helpers/testDataHelper';

test.describe('Way2Automation smoke tests', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  const config = getEnvironmentConfig();

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    Logger.info(`Starting test against ${config.baseUrl}`);
    await homePage.open();
  });

  test('Verify homepage loads successfully', async ({ page }) => {
    const title = await page.title();
    Logger.info(`Page title: ${title}`);
    expect(title.length).toBeGreaterThan(0);
  });

  test('Validate visible image count is greater than zero', async ({ page }) => {
    const visibleCount = await homePage.getVisibleImageCount();
    Logger.info(`Visible image count: ${visibleCount}`);
    expect(visibleCount).toBeGreaterThan(0);
  });

  test('Validate links are detectable on homepage', async ({ page }) => {
    const hrefs = await homePage.getAllLinkHrefs();
    Logger.info(`Links found on homepage: ${hrefs.length}`);
    expect(hrefs.length).toBeGreaterThan(0);
  });

  test('Load test data from JSON and Excel files', async () => {
    const jsonData = await TestDataHelper.loadJson<{ login: { username: string; password: string; expectedUrlContains: string } }>('test-data/testData.json');
    expect(jsonData.login.username).toBe('testuser@example.com');
    expect(jsonData.login.password).toBe('Password123');
    expect(jsonData.login.expectedUrlContains).toContain('way2automation.com');

    const excelRows = await TestDataHelper.loadExcelSheet('test-data/testdata.xlsx', 'LoginData');
    expect(excelRows.length).toBeGreaterThan(0);
    expect(excelRows[0].username).toBe('testuser@example.com');
    expect(excelRows[0].expectedUrlContains).toBe('way2automation.com');
  });

  test('Login page should open successfully', async ({ page }) => {
    await loginPage.open();
    const pageUrl = page.url();
    Logger.info(`Login page URL: ${pageUrl}`);
    expect(pageUrl.length).toBeGreaterThan(0);
  });
});
