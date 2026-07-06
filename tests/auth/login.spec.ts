import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/auth/LoginPage';
import { DashboardPage } from '../../src/pages/auth/DashboardPage';
import { ForgotPasswordPage } from '../../src/pages/auth/ForgotPasswordPage';
import loginData from '../../src/test-data/auth/login.json';

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
            await expect(dashboardPage.txtDashboard).toHaveText('Dashboard');
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
            await expect(loginPage.lblInvalidCredentials)
                .toHaveText('Invalid credentials');
        });
    });

    test('TC-AUTH-03 Login with blank username and password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await test.step('Step 1: Open Login page.', async () => {
            await loginPage.open();
        });

        await test.step('Step 2: Click Login without entering username and password.', async () => {
            await loginPage.clickLogin();
        });

        await test.step('Step 3: Verify Required validation messages are displayed.', async () => {
            await expect(loginPage.lblRequired).toHaveCount(2);
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
            await expect(loginPage.lblRequired)
                .toHaveText('Required');
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
            await expect(loginPage.txtUsername).toBeVisible();
        });
    });

    test('TC-AUTH-06 Forgot Password with registered username', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const forgotPage = new ForgotPasswordPage(page);

        await test.step('Step 1: Open Login page.', async () => {
            await loginPage.open();
        });

        await test.step('Step 2: Open Forgot Password page.', async () => {
            await loginPage.clickForgotPassword();
        });

        await test.step('Step 3: Enter registered username.', async () => {
            await forgotPage.resetPassword('Admin');
        });

        await test.step('Step 4: Verify reset password success message is displayed.', async () => {
            await expect(forgotPage.lblResetSuccess)
                .toHaveText('Reset Password link sent successfully');
        });
    });

    test('TC-AUTH-07 Forgot Password with unregistered username', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const forgotPage = new ForgotPasswordPage(page);

        await test.step('Step 1: Open Login page.', async () => {
            await loginPage.open();
        });

        await test.step('Step 2: Open Forgot Password page.', async () => {
            await loginPage.clickForgotPassword();
        });

        await test.step('Step 3: Enter an unregistered username.', async () => {
            await forgotPage.resetPassword('abcxyz123');
        });

        await test.step('Step 4: Verify reset password success message is displayed.', async () => {
            await expect(forgotPage.lblResetSuccess)
                .toHaveText('Reset Password link sent successfully');
        });
    });
});