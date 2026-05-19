 import { Before, After, BeforeAll,AfterAll,Status} from '@cucumber/cucumber';
 import fs from 'fs';
import path from 'path';

import { CustomWorld } from './world';


Before(async function (this: CustomWorld) {
    await this.init();
});

After(async function (this: CustomWorld) {
     await this.close();
});

After(async function (this: CustomWorld,scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshotPath = path.resolve(`screenshots/${Date.now()}.png`);

    // Ensure folder exists
    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });

    // Capture and save screenshot
    await this.page.screenshot({ path: screenshotPath, fullPage: true });

    // Attach screenshot to report (if supported by reporter)
    const imageBuffer = fs.readFileSync(screenshotPath);
    await this.attach(imageBuffer, 'image/png');
   
  }
 });
 