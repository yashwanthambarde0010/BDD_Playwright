import { EnvironmentConfig, getEnvironmentConfig } from '../config/environment';
import { BasePage } from './base-page';
import locators from '../locators/locators.json';

export class HomePage extends BasePage {
  private readonly homeLocators = locators.HomePage;
  private readonly config: EnvironmentConfig = getEnvironmentConfig();

  async open(): Promise<void> {
    await this.navigate(this.config.baseUrl);
  }

  async getVisibleImageCount(): Promise<number> {
    return await this.count(this.homeLocators.visibleImages);
  }

  async getAllLinkHrefs(): Promise<string[]> {
    // Collect href attributes via evaluateAll to support stable Playwright API
    const raw: (string | null)[] = await this.page
      .locator(this.homeLocators.allLinks)
      .evaluateAll((els) => els.map((e) => (e.getAttribute('href') ? e.getAttribute('href') : null)));
    const hrefs: string[] = raw
      .map((h) => (h ? h : ''))
      .filter((href) => href && !href.startsWith('javascript:') && href !== '#');
    return hrefs;
  }

  async findBrokenLinks(): Promise<string[]> {
    const hrefs = await this.getAllLinkHrefs();
    const broken: string[] = [];
    for (const href of hrefs) {
      try {
        const url = href.startsWith('http') ? href : new URL(href, this.config.baseUrl).toString();
        const response = await this.page.request.fetch(url, { method: 'HEAD', timeout: 10000 });
        if (response.status() >= 400) {
          broken.push(`${url} -> ${response.status()}`);
        }
      } catch (error) {
        broken.push(`${href} -> unreachable`);
      }
    }
    return broken;
  }
}
