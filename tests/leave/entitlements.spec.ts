import {test} from '@playwright/test';
import loginData from '../../src/test-data/auth/login.json';
import {LoginPage} from '../../src/pages/auth/LoginPage';
import {DashboardPage} from '../../src/pages/auth/DashboardPage';
import {EntitlementsPage} from '../../src/pages/leave/EntitlementsPage';

test.describe('Leave Entitlements Module', () => {
    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);
        await test.step('Step 1: Login with valid credentials.', async () => {
            await loginPage.open();
            await loginPage.login(
                loginData.validUser.username,
                loginData.validUser.password
            );
        });
    });

    test('TC-LV-07 View leave entitlement summary', async ({page}) => {
        const dashboardPage = new DashboardPage(page);
        const entitlementsPage = new EntitlementsPage(page);
        await test.step('Step 2: Navigate to Leave module.', async () => {
            await dashboardPage.openLeave();
        });

        await test.step('Step 3: Open My Entitlements page.', async () => {
            await entitlementsPage.openMyEntitlements();
        });

        await test.step('Step 4: Verify leave entitlement summary is displayed.', async () => {
            await entitlementsPage.verifyEntitlementSummaryDisplayed();
        });
    });
});