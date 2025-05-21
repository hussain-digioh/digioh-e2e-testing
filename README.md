# digioh-mcp

A Playwright-based testing framework for Digioh.
## Overview

This project contains automated end-to-end tests for the Digioh using Playwright. It provides a robust testing framework to ensure the reliability and functionality of the Digioh platform.

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd digioh-mcp
```

2. Install dependencies:
```bash
npm install
```

## Configuration

The project uses environment variables for configuration. Create a `.env` file in the root directory with the necessary environment variables.
* LOGIN_EMAIL
* LOGIN_PASSWORD
* LOGIN_URL

## Running Tests

### Run all tests
```bash
npm test
```
Currently I recommend run test seperately
```bash
npx playwright test tests/[FILE_NAME]
```

### View test report
```bash
npm run report
```

## Test Configuration

The tests are configured to run in Chromium browser by default. The configuration can be found in `playwright.config.ts`. Key features include:

- HTML and JSON test reports
- Screenshot capture on test failures
- Video recording on test failures
- Trace recording on first retry
- 30-second timeout for tests
- Base URL: https://account.digioh.com/

## Project Structure

- `tests/` - Contains all test files
- `test-results/` - Directory for test results
- `playwright-report/` - HTML test reports
- `test-results.json` - JSON format test results

## Dependencies

- @playwright/test: ^1.52.0
- dotenv: ^16.5.0

## License

ISC

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests to ensure everything works
4. Submit a pull request

## Support

For any issues or questions, please create an issue in the repository.