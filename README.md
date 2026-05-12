# Playwright Automation Framework

This workspace is ready for Playwright tests against a local practice site.

## Setup

```bash
npm install
npm run install:browsers
```

## Configure the Practice Site

Set the local app URL with `BASE_URL`.

```bash
BASE_URL=http://localhost:4173 npm test
```

If you want Playwright to start the practice site automatically, set `PLAYWRIGHT_WEB_SERVER_COMMAND`.

```bash
PLAYWRIGHT_WEB_SERVER_COMMAND="node ../i-need-you-to-build-a/server.mjs" BASE_URL=http://localhost:4173 npm test
```

## Folder Layout

```text
tests/
  e2e/       # End-to-end specs
  fixtures/  # Shared Playwright fixtures
  pages/     # Page objects
  support/   # Helpers and shared utilities
```

## Useful Scripts

- `npm test`: run the Playwright suite
- `npm run test:headed`: run tests with browsers visible
- `npm run test:debug`: run in Playwright debug mode
- `npm run test:ui`: open Playwright's interactive UI
- `npm run report`: view the last HTML report
- `npm run codegen`: launch Playwright codegen

## Example

```bash
BASE_URL=http://localhost:4173 npm run test:headed -- tests/e2e/login-test.spec.ts --project=chromium
```
