export class CommonUtils {

  /**
   * Static wait/sleep
   */
  static async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get current timestamp
   */
  static timestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Generate random number
   */
  static getRandomNumber(
    min: number = 1,
    max: number = 1000
  ): number {

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate random string
   */
  static generateRandomString(
    length: number = 8
  ): string {

    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';

    for (let i = 0; i < length; i++) {
      result += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    return result;
  }

  /**
   * Generate random email
   */
  static generateRandomEmail(): string {

    const random = this.generateRandomString(6);

    return `testuser_${random}@gmail.com`;
  }

  /**
   * Generate random mobile number
   */
  static generateRandomMobile(
    length: number = 10
  ): string {

    let mobile = '';

    for (let i = 0; i < length; i++) {
      mobile += Math.floor(Math.random() * 10);
    }

    return mobile;
  }

  /**
   * Format date
   */
  static formatDate(
    date: Date = new Date(),
    locale: string = 'en-IN'
  ): string {

    return date.toLocaleDateString(locale);
  }

  /**
   * Format date and time
   */
  static formatDateTime(
    date: Date = new Date(),
    locale: string = 'en-IN'
  ): string {

    return date.toLocaleString(locale);
  }

  /**
   * Get current date in YYYY-MM-DD format
   */
  static getCurrentDate(): string {

    const date = new Date();

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1)
      .padStart(2, '0');

    const day = String(date.getDate())
      .padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  /**
   * Get current time in HH:mm:ss format
   */
  static getCurrentTime(): string {

    const date = new Date();

    return date.toTimeString().split(' ')[0];
  }

  /**
   * Parse JSON safely
   */
  static parseJSON<T>(
    data: string
  ): T | null {

    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Invalid JSON:', error);
      return null;
    }
  }

  /**
   * Convert object to JSON string
   */
  static toJSONString(
    data: unknown,
    spacing: number = 2
  ): string {

    return JSON.stringify(data, null, spacing);
  }

  /**
   * Check if value is null or undefined
   */
  static isNullOrUndefined(
    value: any
  ): boolean {

    return value === null || value === undefined;
  }

  /**
   * Check if string is empty
   */
  static isEmpty(
    value: string
  ): boolean {

    return !value || value.trim().length === 0;
  }

  /**
   * Capitalize first letter
   */
  static capitalize(
    value: string
  ): string {

    if (!value) return '';

    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  /**
   * Convert string to lowercase
   */
  static toLowerCase(
    value: string
  ): string {

    return value.toLowerCase();
  }

  /**
   * Convert string to uppercase
   */
  static toUpperCase(
    value: string
  ): string {

    return value.toUpperCase();
  }

  /**
   * Remove extra spaces from string
   */
  static trimExtraSpaces(
    value: string
  ): string {

    return value.replace(/\s+/g, ' ').trim();
  }

  /**
   * Retry utility
   */
  static async retry<T>(
    fn: () => Promise<T>,
    retries: number = 3,
    delay: number = 1000
  ): Promise<T> {

    let lastError: any;

    for (let attempt = 1; attempt <= retries; attempt++) {

      try {
        return await fn();

      } catch (error) {

        lastError = error;

        console.warn(
          `Retry Attempt ${attempt} Failed`
        );

        if (attempt < retries) {
          await this.sleep(delay);
        }
      }
    }

    throw lastError;
  }

  /**
   * Generate unique test data
   */
  static generateUniqueValue(
    prefix: string = 'test'
  ): string {

    return `${prefix}_${Date.now()}`;
  }

  /**
   * Convert string to boolean
   */
  static stringToBoolean(
    value: string
  ): boolean {

    return value.toLowerCase() === 'true';
  }

  /**
   * Convert milliseconds to seconds
   */
  static msToSeconds(
    ms: number
  ): number {

    return ms / 1000;
  }

  /**
   * Convert seconds to milliseconds
   */
  static secondsToMs(
    seconds: number
  ): number {

    return seconds * 1000;
  }

  /**
   * Get execution duration
   */
  static getExecutionTime(
    startTime: number
  ): string {

    const endTime = Date.now();

    const duration = endTime - startTime;

    return `${duration} ms`;
  }
}

export default CommonUtils;