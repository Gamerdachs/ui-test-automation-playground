# UI Test Automation Playground - Playwright Solution

This repository contains a test automation solution for the [UI Test Automation Playground](http://uitestingplayground.com) web application, developed using **TypeScript** and **Playwright**.

## Scenarios Automated

- **Overlapped Element**: Handles elements that require scrolling into view before interaction.
- **AJAX Data**: Waits for asynchronous data loading (15s delay).
- **Visibility**: Verifies element visibility states (removed, zero width, overlapped, opacity 0, visibility hidden, display none, offscreen).
- **Dynamic Table**: Scans a dynamic table to find a specific value based on column and row headers.
- **Sample App**: Simulates a login/logout flow with dynamic element IDs.
- **Text Input**: Tests physical keyboard emulation vs. DOM events for updating button labels.
- **Progress Bar**: Monitors a progress bar and interacts with it when it reaches a specific threshold (75%).

## Prerequisites

- [Node.js](https://nodejs.org) (v14 or higher recommended)
- [npm](https://www.npmjs.com/get-npm)

## Installation & Setup

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd ui-test-automation-playground
   ```

2. **Install dependencies**:
   This will install both the application dependencies and the test automation tools (Playwright, TypeScript).
   ```bash
   npm install
   ```

3. **Install Playwright Browsers**:
   ```bash
   npx playwright install chromium
   ```

## Running the Application

Before running the tests, you need to have the application running locally:

```bash
node app.js
```
The application will be available at `http://localhost:3000`.

## Running the Tests

You can run the tests using the following command:

```bash
npx playwright test
```

By default, the tests will run against the local server. The `playwright.config.ts` is configured to automatically start the web server if it's not already running.

### Useful Commands

- **Run tests in headed mode**: `npx playwright test --headed`
- **Show report**: `npx playwright show-report`
- **Run a specific test**: `npx playwright test tests/playground.spec.ts`

## Project Structure

- `tests/`: Contains all automation test cases.
  - `playground.spec.ts`: Single test file containing all 7 requested scenarios.
  - `README.md`: Documentation for the Playwright tests (this file).
- `playwright.config.ts`: Playwright configuration file including baseURL and webServer settings.
- `package.json`: Project dependencies and scripts.
