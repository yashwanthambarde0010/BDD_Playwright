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
