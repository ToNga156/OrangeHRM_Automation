import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { ForgotPasswordPage } from '../../src/pages/ForgotPasswordPage';
const loginData = require('../../src/test-data/login.json');

test.describe('Authentication', () => {
    test('TC-AUTH-01 Login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await loginPage.open();
        
        await loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );

        await expect(dashboardPage.txtDashboard).toHaveText('Dashboard');
    });
});

test('TC-AUTH-02 Login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();

    await loginPage.login(
        loginData.invalidPassword.username,
        loginData.invalidPassword.password
    );

    await expect(loginPage.lblInvalidCredentials).toHaveText('Invalid credentials');
});

test('TC-AUTH-03 Login with blank username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();

    await loginPage.clickLogin();

    await expect(loginPage.lblRequired).toHaveCount(2);
});

test('TC-AUTH-04 Login with username only', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();

    await loginPage.enterUsername(
        loginData.usernameOnly.username
    );

    await loginPage.clickLogin();

    await expect(loginPage.lblRequired).toHaveText('Required');
});

test('TC-AUTH-05 Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.open();

    await loginPage.login(
        loginData.validUser.username,
        loginData.validUser.password
    );

    await dashboardPage.logout();

    await expect(loginPage.txtUsername).toBeVisible();
});

test('TC-AUTH-06 Forgot Password with registered username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const forgotPage = new ForgotPasswordPage(page);

    await loginPage.open();

    await loginPage.clickForgotPassword();

    await forgotPage.resetPassword('Admin');

    await expect(forgotPage.lblResetSuccess).toHaveText('Reset Password link sent successfully');
});

test('TC-AUTH-07 Forgot Password with unregistered username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const forgotPage = new ForgotPasswordPage(page);

    await loginPage.open();

    await loginPage.clickForgotPassword();

    await forgotPage.resetPassword('abcxyz123');

    await expect(forgotPage.lblResetSuccess).toHaveText('Reset Password link sent successfully');
});