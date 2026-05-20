# Playwright Cucumber TypeScript Automation Framework

This repository contains a scalable and modular Playwright automation test framework built with TypeScript and Cucumber for the `https://ga.way2automation.com` application.

## Structure

- `config/` - environment configuration and runtime config selection
- `locators/` - reusable selector repository for UI elements
- `helpers/` - Excel reader and test data helper utilities
- `utils/` - reusable logging and test utilities
- `pages/` - Page Object Model classes for UI flows
- `features/` - BDD feature files and step definitions
- `fixtures/` - shared page fixture and browser session helpers
- `tests/` - Playwright Test Runner scripts
- `.github/workflows/` - GitHub Actions CI pipeline

## Key Features

- Page Object Model (POM) design
- Playwright Test Runner integration
- Cucumber feature file and step definition flow
- Cross-browser support: Chromium, Firefox, Microsoft Edge
- Environment-based configuration (QA/UAT/PROD)
- Excel-based test data reader
- Headless and headed execution support
- HTML test reporting support with screenshots on failure
- GitHub Actions CI pipeline for automated test runs

## Install

```bash
npm install
npx playwright install --with-deps
```

## Run Tests

### Playwright Test Runner

```bash
npm test
```

### BDD Cucumber Tests

```bash
npm run test:cucumber
```

### Generate Reports

Playwright generates an HTML report automatically during test execution.

```bash
npm test
```

The generated report is written to `reports/extent-report`.
Open it with:

```bash
npm run report:open
```

Or open `reports/extent-report/index.html` directly in your browser.

## Environment Variables

The framework supports overrides via environment variables:

- `ENV` - `qa`, `uat`, `prod`
- `BROWSER` - `chromium`, `firefox`, `edge`
- `HEADLESS` - `true` or `false`
- `BASE_URL` - base application URL
- `REMOTE_ENABLED` - `true` or `false`
- `REMOTE_URL` - remote Playwright endpoint

## Notes

- The BDD feature flow remains in `features/` with step definitions for homepage and login validation.
- The direct Playwright test runner is available under `tests/` for faster execution and built-in reporting.
- The CI workflow in `.github/workflows/playwright-ci.yml` installs dependencies, executes tests, generates reports, and uploads artifacts.

=====

high-Level Test Case Execution Flow

Trigger: run tests via npm test (Playwright) or npm run test:cucumber (Cucumber).
Runner startup: Playwright/Cucumber reads playwright.config.ts and environment config from environment.ts.
Test discovery: Runner finds tests/*.ts (Playwright) or features/*.feature + step defs (Cucumber).
Environment setup: global fixtures and helpers initialize (browser binary, logging, test-data).
Browser/context creation: framework creates a new browser context/page per test or scenario (via browserUtils.ts or Playwright fixtures).
Page Object instantiation: tests/step-defs construct page objects from pages and call actions (navigation, fill, click).
Step execution / Test body: for each step or test() block, actions run sequentially and assertions execute.
Failure handling: on failure the framework captures screenshot/logs; artifacts saved to reports or screenshots/.
Test teardown: close page/context; perform per-test cleanup.
Report generation: runner aggregates results and writes HTML to extent-report (Playwright HTML reporter).
Runner shutdown: global teardown runs (closing browsers, flushing logs).
=====

Flow to add a new test case
1. Create the feature file
Add a new .feature under features, for example:
login.feature
Write the scenario in Gherkin:
Feature: Login
Scenario: Valid user logs in
Given ...
When ...
Then ...
2. Add step definitions
Create or extend a step-definition file under features/step-definitions/
e.g. features/step-definitions/login.steps.ts
Implement the Gherkin steps with Cucumber bindings:
Given('I go to login page', async function () { ... })
When('I enter valid credentials', async function () { ... })
Then('I should see the dashboard', async function () { ... })
Inside each step, call page object methods instead of raw Playwright selectors.
3. Add page objects / locators
Create or update a page class in pages
e.g. pages/LoginPage.ts
Put selector locators and actions there:
loginPage.goto()
loginPage.fillUsername()
loginPage.submit()
Keep locators centralized in that page object, not inside step defs.
4. Connect step defs to page objects
In your step file, import the page object:
import { LoginPage } from '../../pages/LoginPage';
Instantiate it with this.page or the Playwright page fixture:
const login = new LoginPage(this.page);
Call methods:
await login.goto();
await login.login(username, password);
5. Run and validate
Run the Cucumber test:
npm run test:cucumber
If the project also uses Playwright tests, you can run:
npm test
Verify the new scenario passes and the HTML report is generated.
Simple end-to-end flow
Add Gherkin scenario in features
Add step definitions in features/step-definitions/
Add page object and locators in pages
Wire the step defs to page object methods
Run test and verify results
Notes
Feature file = test behavior
Step definition = glue code
Page object = locator + action implementation
=======


BDD_Playwright/
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
├── README.md
├── config/
│   └── environment.ts
├── features/
│   ├── home.feature
│   ├── login.feature
│   ├── registration.feature
│   ├── pageobjects/
│   │   ├── base-page.ts
│   │   └── registration-page.ts
│   └── step_definitions/
│       ├── home-steps.ts
│       ├── login-steps.ts
│       └── registration-steps.ts
├── pages/
│   ├── base-page.ts
│   ├── home-page.ts
│   └── login-page.ts
├── scripts/
│   └── run-cucumber.ts
├── tests/
│   ├── example.spec.ts
│   └── way2automation.spec.ts
├── fixtures/
├── helpers/
├── locators/
├── objectRepository/
├── reports/
├── test-data/
├── utils/
└── node_modules/