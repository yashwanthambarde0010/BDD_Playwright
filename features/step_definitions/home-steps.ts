import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../hooks/world';

Given('I open the Way2Automation homepage', async function (this: CustomWorld) {
  await this.pages.homePage.open();
});

When('I collect all homepage links', async function (this: CustomWorld) {
  this.brokenLinks = await this.pages.homePage.findBrokenLinks();
});

Then('all homepage links should return a valid status', async function (this: CustomWorld) {
  expect(this.brokenLinks.length).toBe(0);
});

Then('I should see more than one visible image on the homepage', async function (this: CustomWorld) {
  const count = await this.pages.homePage.getVisibleImageCount();
  expect(count).toBeGreaterThan(1);
});
