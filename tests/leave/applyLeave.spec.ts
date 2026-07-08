import { test } from '@playwright/test';
import loginData from '../../src/test-data/auth/login.json';
import { LoginPage } from '../../src/pages/auth/LoginPage';
import { DashboardPage } from '../../src/pages/auth/DashboardPage';
import { ApplyLeavePage } from '../../src/pages/leave/ApplyLeavePage';
import { LeaveUtils } from '../../src/utils/LeaveUtils';
import { DateUtils } from '../../src/utils/DateUtils';

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
        const applyLeavePage = new ApplyLeavePage(page);

        const leave = LeaveUtils.leave();

        await test.step('Step 2: Navigate to Leave module.', async () => {
            await dashboardPage.openLeave();
        });

        await test.step('Step 3: Open Apply Leave page.', async () => {
            await applyLeavePage.openApplyPage();
        });

        await test.step('Step 4: Enter leave information.', async () => {
            await applyLeavePage.applyLeave(leave);
        });

        await test.step('Step 5: Verify leave applied successfully.', async () => {
            await applyLeavePage.verifyLeaveAppliedSuccessfully();
        });

    });

    // test('TC-LV-02 Apply leave with end date before start date', async ({ page }) => {

    //     const dashboardPage = new DashboardPage(page);
    //     const applyLeavePage = new ApplyLeavePage(page);

    //     const leave = LeaveUtils.leave();

    //     leave.fromDate = DateUtils.futureDate(5);
    //     leave.toDate = DateUtils.futureDate(2);

    //     await test.step('Step 2: Navigate to Leave module.', async () => {
    //         await dashboardPage.openLeave();
    //     });

    //     await test.step('Step 3: Open Apply Leave page.', async () => {
    //         await applyLeavePage.openApplyPage();
    //     });

    //     await test.step('Step 4: Enter invalid leave date range.', async () => {
    //         await applyLeavePage.applyLeave(leave);
    //     });

    //     await test.step('Step 5: Verify validation message is displayed.', async () => {
    //         await applyLeavePage.verifyToDateValidation();
    //     });

    // });

});