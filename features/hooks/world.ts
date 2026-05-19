import { setWorldConstructor, IWorldOptions, World } from '@cucumber/cucumber';
import { Browser, chromium, firefox, webkit, Page } from 'playwright';
import { PageFixture } from '../../fixtures/page-fixtures';
import { getEnvironmentConfig } from '../../config/environment';

export class CustomWorld extends World {
    public page!: Page;
    public browser!: Browser;
    public pages!: PageFixture;
    public brokenLinks: string[] = [];
    public loginResult = '';

    constructor(options: IWorldOptions) {
        super(options);
    }

    async init() {
        const config = getEnvironmentConfig();
        const browserName = config.browser.toLowerCase();
        const launchOptions = {
            headless: config.headless,
            args: ['--start-maximized'],
            timeout: config.timeout,
        };

        const browserType = browserName === 'firefox'
            ? firefox
            : browserName === 'webkit'
                ? webkit
                : chromium;

        if (config.remote.enabled && config.remote.url) {
            this.browser = await browserType.connect({ wsEndpoint: config.remote.url });
        } else {
            this.browser = await browserType.launch(launchOptions);
        }

        const context = await this.browser.newContext();
        this.page = await context.newPage();
        await this.page.setViewportSize({ width: 1280, height: 800 });
        this.pages = new PageFixture(this.page);
    }

    async close() {
        if (this.page) {
            await this.page.close();
        }
        if (this.browser) {
            await this.browser.close();
        }
    }
}

setWorldConstructor(CustomWorld);


