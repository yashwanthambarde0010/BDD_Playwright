import winston, { Logform } from 'winston';
import path from 'path';
import fs from 'fs';

export class LoggerUtils {

  private static logDirectory = 'reports/logs';

  /**
   * Create logs directory if not exists
   */
  private static createLogDirectory(): void {

    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory, {
        recursive: true
      });
    }
  }

  /**
   * Winston logger instance
   */
  private static logger = (() => {

    LoggerUtils.createLogDirectory();

    return winston.createLogger({

      level: 'info',

      format: winston.format.combine(

        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),

        winston.format.printf(
          (info: Logform.TransformableInfo) => {
            const { level, message, timestamp } = info;
            return `[${String(level).toUpperCase()}] ${timestamp} - ${message}`;
          }
        )
      ),

      transports: [

        /**
         * Console Logs
         */
        new winston.transports.Console(),

        /**
         * Combined Logs
         */
        new winston.transports.File({
          filename: path.join(
            LoggerUtils.logDirectory,
            'combined.log'
          )
        }),

        /**
         * Error Logs
         */
        new winston.transports.File({
          filename: path.join(
            LoggerUtils.logDirectory,
            'error.log'
          ),
          level: 'error'
        }),

        /**
         * Warn Logs
         */
        new winston.transports.File({
          filename: path.join(
            LoggerUtils.logDirectory,
            'warn.log'
          ),
          level: 'warn'
        })
      ]
    });

  })();

  /**
   * INFO Logs
   */
  static info(message: string): void {

    this.logger.info(message);
  }

  /**
   * WARN Logs
   */
  static warn(message: string): void {

    this.logger.warn(message);
  }

  /**
   * ERROR Logs
   */
  static error(
    message: string,
    error?: unknown
  ): void {

    if (error instanceof Error) {

      this.logger.error(
        `${message} | ${error.stack}`
      );

    } else {

      this.logger.error(message);
    }
  }

  /**
   * DEBUG Logs
   */
  static debug(message: string): void {

    this.logger.debug(message);
  }

  /**
   * SUCCESS Logs
   */
  static success(message: string): void {

    this.logger.info(`SUCCESS: ${message}`);
  }

  /**
   * STEP Logs
   */
  static step(message: string): void {

    this.logger.info(`STEP: ${message}`);
  }

  /**
   * TEST START Logs
   */
  static testStart(testName: string): void {

    this.logger.info(
      `========== TEST STARTED: ${testName} ==========`
    );
  }

  /**
   * TEST END Logs
   */
  static testEnd(testName: string): void {

    this.logger.info(
      `========== TEST COMPLETED: ${testName} ==========`
    );
  }

  /**
   * API/Request Logs
   */
  static request(message: string): void {

    this.logger.info(`REQUEST: ${message}`);
  }

  /**
   * Response Logs
   */
  static response(message: string): void {

    this.logger.info(`RESPONSE: ${message}`);
  }

  /**
   * Browser Action Logs
   */
  static browserAction(message: string): void {

    this.logger.info(`BROWSER ACTION: ${message}`);
  }

  /**
   * Screenshot Logs
   */
  static screenshot(path: string): void {

    this.logger.info(
      `SCREENSHOT CAPTURED: ${path}`
    );
  }

  /**
   * Exception Logs
   */
  static exception(
    exception: unknown
  ): void {

    if (exception instanceof Error) {

      this.logger.error(
        `EXCEPTION: ${exception.message}\n${exception.stack}`
      );

    } else {

      this.logger.error(
        `UNKNOWN EXCEPTION: ${String(exception)}`
      );
    }
  }

  /**
   * JSON/Object Logs
   */
  static logObject(
    title: string,
    data: unknown
  ): void {

    this.logger.info(
      `${title}: ${JSON.stringify(data, null, 2)}`
    );
  }

  /**
   * Custom Log Level
   */
  static custom(
    level: string,
    message: string
  ): void {

    this.logger.log(level, message);
  }
}

export const Logger = LoggerUtils;

export default LoggerUtils;