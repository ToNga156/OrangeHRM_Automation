import { test } from '@playwright/test';
import loginData from '../../src/test-data/auth/login.json';
import { LoginPage } from '../../src/pages/auth/LoginPage';
import { DashboardPage } from '../../src/pages/auth/DashboardPage';
import { LeaveListPage } from '../../src/pages/leave/LeaveListPage';
import { ApplyLeavePage } from '../../src/pages/leave/ApplyLeavePage';

test.describe('Leave Module', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await test.step('Step 1: Login with valid credentials.', async () => {
            await loginPage.open();
            await loginPage.login(
                loginData.validUser.username,
                loginData.validUser.password
            );
        });
    });

    test('TC-LV-01 Apply leave with valid date range', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const leaveListPage = new LeaveListPage(page);
        const applyLeavePage = new ApplyLeavePage(page);

        await test.step('Step 2: Open Leave module.', async () => {
            await dashboardPage.openLeave();
        });

        await test.step('Step 3: Open Apply Leave page.', async () => {
            await leaveListPage.openApplyLeave();
        });

        await test.step('Step 4: Enter leave information.', async () => {
            await applyLeavePage.applyLeave(
                'CAN - Bereavement',
                '2026-20-07',
                '2026-22-07',
                'Automation Testing'
            );
        });

        await test.step('Step 5: Verify leave request submitted successfully.', async () => {
            await applyLeavePage.verifyLeaveAppliedSuccessfully();
        });
    });

    test('TC-LV-02 Apply leave with end date before start date', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const leaveListPage = new LeaveListPage(page);
        const applyLeavePage = new ApplyLeavePage(page);

        await test.step('Step 2: Open Leave module.', async () => {
            await dashboardPage.openLeave();
        });

        await test.step('Step 3: Open Apply Leave page.', async () => {
            await leaveListPage.openApplyLeave();
        });

        await test.step('Step 4: Enter invalid date range.', async () => {
            await applyLeavePage.applyLeave(
                'CAN - Bereavement',
                '2026-25-07',
                '2026-20-07',
                'Automation Testing'
            );
        });

        await test.step('Step 5: Verify validation message.', async () => {
            await applyLeavePage.verifySubmitFailed();
        });
    });
});