import { After, Before, Status } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';
import screenshotUtils from '../../utils/screenshotUtils';
import { CustomWorld } from './world';
import { Logger } from '../../utils/logger';

Before(async function (this: CustomWorld) {
    Logger.info('Initializing browser session for scenario');
    await this.init();
});

After(async function (this: CustomWorld, scenario) {
    if (scenario.result?.status === Status.FAILED && this.page) {
        const screenshotPath = await screenshotUtils.takeScreenshot(this.page, 'cuke-failed');
        const buffer = fs.readFileSync(screenshotPath);
        await this.attach(buffer, 'image/png');
        Logger.error(`Captured screenshot for failed scenario: ${screenshotPath}`);
    }

    await this.close();
    Logger.info('Closed browser session for scenario');
});

 