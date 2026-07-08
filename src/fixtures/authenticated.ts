import { test as base, expect } from '@playwright/test';
import loginData from '../test-data/auth/login.json';
import { LoginPage } from '../pages/auth/LoginPage';

export const test = base.extend({
    page: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );
        await use(page);
    }
});
export { expect };