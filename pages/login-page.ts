import { BasePage } from './base-page';
import { EnvironmentConfig, getEnvironmentConfig } from '../config/environment';
import locators from '../locators/locators.json';

export class LoginPage extends BasePage {
  private readonly loginLocators = locators.LoginPage;
  private readonly config: EnvironmentConfig = getEnvironmentConfig();

  async open(): Promise<void> {
    // Navigate to the site's main page which contains login functionality
    await this.navigate(this.config.baseUrl);
  }

  async login(username: string, password: string): Promise<void> {
    await this.fill(this.loginLocators.username, username);
    await this.fill(this.loginLocators.password, password);
    await this.click(this.loginLocators.loginButton);
  }

  async getLoginResult(): Promise<string> {
    return await this.textContent(this.loginLocators.loginResult);
  }
}
