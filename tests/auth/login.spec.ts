import { test } from '@playwright/test';
import loginData from '../../src/test-data/auth/login.json';
import { LoginPage } from '../../src/pages/auth/LoginPage';
import { DashboardPage } from '../../src/pages/auth/DashboardPage';
import { ForgotPasswordPage } from '../../src/pages/auth/ForgotPasswordPage';

test.describe('Authentication Module', () => {
    test('TC-AUTH-01 Login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await test.step('Step 1: Open Login page.', async () => {
            await loginPage.open();
        });

        await test.step('Step 2: Login with valid credentials.', async () => {
            await loginPage.login(
                loginData.validUser.username,
                loginData.validUser.password
            );
        });

        await test.step('Step 3: Verify Dashboard page is displayed.', async () => {
            await dashboardPage.verifyDashboardPage();
        });
    });

    test('TC-AUTH-02 Login with invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await test.step('Step 1: Open Login page.', async () => {
            await loginPage.open();
        });

        await test.step('Step 2: Login with invalid password.', async () => {
            await loginPage.login(
                loginData.invalidPassword.username,
                loginData.invalidPassword.password
            );
        });

        await test.step('Step 3: Verify Invalid credentials message is displayed.', async () => {
            await loginPage.verifyInvalidCredentials();
        });
    });

    test('TC-AUTH-03 Login with blank username and password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await test.step('Step 1: Open Login page.', async () => {
            await loginPage.open();
        });

        await test.step('Step 2: Click Login without entering credentials.', async () => {
            await loginPage.clickLogin();
        });

        await test.step('Step 3: Verify Required validation messages are displayed.', async () => {
            await loginPage.verifyRequiredFields(2);
        });
    });

    test('TC-AUTH-04 Login with username only', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await test.step('Step 1: Open Login page.', async () => {
            await loginPage.open();
        });

        await test.step('Step 2: Enter username only.', async () => {
            await loginPage.enterUsername(
                loginData.usernameOnly.username
            );
        });

        await test.step('Step 3: Click Login button.', async () => {
            await loginPage.clickLogin();
        });

        await test.step('Step 4: Verify Required validation message is displayed.', async () => {
            await loginPage.verifyRequiredFields(1);
        });
    });

    test('TC-AUTH-05 Logout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await test.step('Step 1: Open Login page.', async () => {
            await loginPage.open();
        });

        await test.step('Step 2: Login with valid credentials.', async () => {
            await loginPage.login(
                loginData.validUser.username,
                loginData.validUser.password
            );
        });

        await test.step('Step 3: Logout from the application.', async () => {
            await dashboardPage.logout();
        });

        await test.step('Step 4: Verify Login page is displayed.', async () => {
            await loginPage.verifyLoginPage();
        });
    });

    test('TC-AUTH-06 Forgot Password with registered username', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await test.step('Step 1: Open Login page.', async () => {
            await loginPage.open();
        });

        await test.step('Step 2: Open Forgot Password page.', async () => {
            await loginPage.clickForgotPassword();
        });

        await test.step('Step 3: Enter registered username and submit.', async () => {
            await forgotPasswordPage.resetPassword('Admin');
        });

        await test.step('Step 4: Verify reset password success message is displayed.', async () => {
            await forgotPasswordPage.verifyResetPasswordSuccess();
        });
    });

    test('TC-AUTH-07 Forgot Password with unregistered username', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await test.step('Step 1: Open Login page.', async () => {
            await loginPage.open();
        });

        await test.step('Step 2: Open Forgot Password page.', async () => {
            await loginPage.clickForgotPassword();
        });

        await test.step('Step 3: Enter an unregistered username and submit.', async () => {
            await forgotPasswordPage.resetPassword('abcxyz123');
        });

        await test.step('Step 4: Verify reset password success message is displayed.', async () => {
            await forgotPasswordPage.verifyResetPasswordSuccess();
        });
    });
});