# OrangeHRM Automation Testing

Automation testing framework for the OrangeHRM Demo application using Playwright and TypeScript.

---

# Project Information

| Item | Value |
|------|------|
| Framework | Playwright |
| Language | TypeScript |
| Test Runner | Playwright Test |
| Architecture | Page Object Model (POM) |
| Report | Playwright HTML Report |
| CI/CD | Jenkins (Planned) |
| Browsers | Chromium, Firefox, Microsoft Edge |

---

# Project Structure

```
final_course_project
│
├── src
│   ├── pages
│   │   ├── BasePage.ts
│   │   └── RegisterPage.ts
│   │
│   ├── test-data
│   │   └── avta.jpg
│   │
│   └── utils
│       └── constant.ts
│
├── tests
│   └── auth
│       └── auth-01.ts
│
├── playwright-report
├── test-results
│
├── .env
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

---

# Prerequisites

Install the following software before running the project.

- Node.js
- npm
- Git
- Visual Studio Code

Verify installation

```bash
node -v
npm -v
git --version
```

---

# Setup

## Clone the repository

```bash
git clone <repository-url>

cd final_course_project
```

## Install dependencies

```bash
npm install
```

## Install Playwright browsers

```bash
npx playwright install
```

## Configure environment

Create a `.env` file.

Example

```text
BASE_URL=https://opensource-demo.orangehrmlive.com

USERNAME=Admin

PASSWORD=admin123
```

---

# Run Tests

Run all tests

```bash
npx playwright test
```

Run Authentication module

```bash
npx playwright test tests/auth
```

Run a specific test

```bash
npx playwright test tests/auth/auth-01.ts
```

Run on Chromium

```bash
npx playwright test --project=chromium
```

Run on Firefox

```bash
npx playwright test --project=firefox
```

Run on Microsoft Edge

```bash
npx playwright test --project="Microsoft Edge"
```

Run in headed mode

```bash
npx playwright test --headed
```

Run in debug mode

```bash
npx playwright test --debug
```

---

# Playwright Report

After executing the tests

```bash
npx playwright show-report
```

---

# Allure Report

> **Planned for future implementation.**

Install Allure

```bash
npm install -D allure-playwright
```

Generate report

```bash
allure generate allure-results --clean
```

Open report

```bash
allure open allure-report
```

---

# Jenkins

> **Planned for future implementation.**

Typical Jenkins pipeline

1. Checkout source code
2. Install dependencies

```bash
npm ci
```

3. Install Playwright browsers

```bash
npx playwright install
```

4. Execute tests

```bash
npx playwright test
```

5. Generate Allure report

```bash
allure generate allure-results --clean
```

---

# Current Features

- Page Object Model
- Playwright Test
- TypeScript
- Environment Configuration
- HTML Report

---

# Future Improvements

- Authentication Module
- PIM Module
- Leave Module
- Attendance Module
- Recruitment Module
- Admin Module
- End-to-End Test
- Allure Report
- Jenkins CI/CD
- Data-driven Testing
- Cross-browser Execution

---

# Author

Automation Final Course Project