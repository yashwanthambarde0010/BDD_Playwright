import { expect, Locator, Page } from '@playwright/test';

export class AssertionUtils {

  /**
   * Verify text contains expected value
   */
  static async expectTextContains(
    locatorOrText: Locator | string,
    expected: string
  ): Promise<void> {
    if (typeof locatorOrText === 'string') {
      expect(locatorOrText.toLowerCase()).toContain(expected.toLowerCase());
    } else {
      const text = await locatorOrText.textContent();
      expect((text || '').toLowerCase()).toContain(expected.toLowerCase());
    }
  }

  /**
   * Verify exact text match
   */
  static async expectTextEquals(
    locatorOrText: Locator | string,
    expected: string
  ): Promise<void> {
    if (typeof locatorOrText === 'string') {
      expect(locatorOrText.trim()).toBe(expected.trim());
    } else {
      const text = await locatorOrText.textContent();
      expect((text || '').trim()).toBe(expected.trim());
    }
  }

  /**
   * Verify element is visible
   */
  static async expectElementVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  /**
   * Verify element is hidden
   */
  static async expectElementHidden(locator: Locator): Promise<void> {
    await expect(locator).toBeHidden();
  }

  /**
   * Verify element is enabled
   */
  static async expectElementEnabled(locator: Locator): Promise<void> {
    await expect(locator).toBeEnabled();
  }

  /**
   * Verify element is disabled
   */
  static async expectElementDisabled(locator: Locator): Promise<void> {
    await expect(locator).toBeDisabled();
  }

  /**
   * Verify checkbox/radio is checked
   */
  static async expectElementChecked(locator: Locator): Promise<void> {
    await expect(locator).toBeChecked();
  }

  /**
   * Verify checkbox/radio is unchecked
   */
  static async expectElementUnchecked(locator: Locator): Promise<void> {
    await expect(locator).not.toBeChecked();
  }

  /**
   * Verify attribute value
   */
  static async expectAttributeValue(
    locator: Locator,
    attribute: string,
    expectedValue: string
  ): Promise<void> {
    await expect(locator).toHaveAttribute(attribute, expectedValue);
  }

  /**
   * Verify input field value
   */
  static async expectInputValue(
    locator: Locator,
    expectedValue: string
  ): Promise<void> {
    await expect(locator).toHaveValue(expectedValue);
  }

  /**
   * Verify page title
   */
  static async expectPageTitle(
    page: Page,
    expectedTitle: string
  ): Promise<void> {
    await expect(page).toHaveTitle(expectedTitle);
  }

  /**
   * Verify current URL
   */
  static async expectPageURL(
    page: Page,
    expectedURL: string
  ): Promise<void> {
    await expect(page).toHaveURL(expectedURL);
  }

  /**
   * Verify partial URL
   */
  static async expectURLContains(
    page: Page,
    partialURL: string
  ): Promise<void> {
    const currentURL = page.url();
    expect(currentURL).toContain(partialURL);
  }

  /**
   * Verify element count equals expected count
   */
  static async expectElementCount(
    locator: Locator,
    expectedCount: number
  ): Promise<void> {
    const actualCount = await locator.count();
    expect(actualCount).toBe(expectedCount);
  }

  /**
   * Verify element count greater than expected count
   */
  static async expectElementCountGreaterThan(
    locator: Locator,
    count: number
  ): Promise<void> {
    const actualCount = await locator.count();
    expect(actualCount).toBeGreaterThan(count);
  }

  /**
   * Verify element count less than expected count
   */
  static async expectElementCountLessThan(
    locator: Locator,
    count: number
  ): Promise<void> {
    const actualCount = await locator.count();
    expect(actualCount).toBeLessThan(count);
  }

  /**
   * Verify list contains expected text
   */
  static async expectListContainsText(
    locator: Locator,
    expectedText: string
  ): Promise<void> {
    const texts = await locator.allTextContents();

    const matched = texts.some(text =>
      text.toLowerCase().includes(expectedText.toLowerCase())
    );

    expect(matched).toBeTruthy();
  }

  /**
   * Verify API/status code or generic number comparison
   */
  static expectStatusCode(
    actualStatus: number,
    expectedStatus: number
  ): void {
    expect(actualStatus).toBe(expectedStatus);
  }

  /**
   * Verify boolean condition true
   */
  static expectTrue(condition: boolean): void {
    expect(condition).toBeTruthy();
  }

  /**
   * Verify boolean condition false
   */
  static expectFalse(condition: boolean): void {
    expect(condition).toBeFalsy();
  }

  /**
   * Verify object equality
   */
  static expectObjectsEqual(
    actualObject: any,
    expectedObject: any
  ): void {
    expect(actualObject).toEqual(expectedObject);
  }

  /**
   * Verify array contains value
   */
  static expectArrayContains(
    actualArray: any[],
    expectedValue: any
  ): void {
    expect(actualArray).toContain(expectedValue);
  }

  /**
   * Verify value is null
   */
  static expectNull(value: any): void {
    expect(value).toBeNull();
  }

  /**
   * Verify value is not null
   */
  static expectNotNull(value: any): void {
    expect(value).not.toBeNull();
  }

  /**
   * Verify value is undefined
   */
  static expectUndefined(value: any): void {
    expect(value).toBeUndefined();
  }

  /**
   * Verify value is defined
   */
  static expectDefined(value: any): void {
    expect(value).toBeDefined();
  }

  /**
   * Soft assertion for text contains
   */
  static async softExpectTextContains(
    locator: Locator,
    expectedText: string
  ): Promise<void> {
    const actualText = await locator.textContent();

    expect.soft((actualText || '').toLowerCase())
      .toContain(expectedText.toLowerCase());
  }

  /**
   * Soft assertion for visibility
   */
  static async softExpectVisible(locator: Locator): Promise<void> {
    await expect.soft(locator).toBeVisible();
  }
}

export default AssertionUtils;