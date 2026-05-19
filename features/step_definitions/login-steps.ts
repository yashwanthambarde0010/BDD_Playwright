import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../hooks/world';

Given('I open the Way2Automation login page', async function (this: CustomWorld) {
  await this.pages.loginPage.open();
});

When('I submit login credentials {string} and {string}', async function (this: CustomWorld, username: string, password: string) {
  await this.pages.loginPage.login(username, password);
  this.loginResult = await this.pages.loginPage.getLoginResult();
});

Then('I should see a login result message containing {string}', async function (this: CustomWorld, expected: string) {
  expect(this.loginResult.toLowerCase()).toContain(expected.toLowerCase());
});
