import { test } from '@playwright/test';
import loginData from '../../src/test-data/auth/login.json';
import { LoginPage } from '../../src/pages/auth/LoginPage';
import { DashboardPage } from '../../src/pages/auth/DashboardPage';
import { ApplyLeavePage } from '../../src/pages/leave/ApplyLeavePage';
import { MyLeavePage } from '../../src/pages/leave/MyLeavePage';
import { LeaveUtils } from '../../src/utils/LeaveUtils';
import { DateUtils } from '../../src/utils/DateUtils';

test.describe('My Leave Module', () => {

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

    test('TC-LV-03 View applied leave in My Leave', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        const applyLeavePage = new ApplyLeavePage(page);
        const myLeavePage = new MyLeavePage(page);

        const leave = LeaveUtils.leave();

        await test.step('Step 2: Navigate to Leave module.', async () => {
            await dashboardPage.openLeave();
        });

        await test.step('Step 3: Create a leave request.', async () => {
            await applyLeavePage.createLeaveRequest(leave);
        });

        await test.step('Step 4: Open My Leave page.', async () => {
            await myLeavePage.openMyLeave();
        });

        await test.step('Step 5: Search leave request.', async () => {
            await myLeavePage.searchLeave(leave);
        });

        await test.step('Step 6: Verify leave request is displayed.', async () => {
            await myLeavePage.verifySearchResultDisplayed();
        });

    });

    test('TC-LV-04 Cancel pending leave request', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        const applyLeavePage = new ApplyLeavePage(page);
        const myLeavePage = new MyLeavePage(page);

        const leave = LeaveUtils.leave();

        leave.fromDate = DateUtils.futureDate(6);
        leave.toDate = DateUtils.futureDate(7);

        await test.step('Step 2: Navigate to Leave module.', async () => {
            await dashboardPage.openLeave();
        });

        await test.step('Step 3: Create a leave request.', async () => {
            await applyLeavePage.createLeaveRequest(leave);
        });

        await test.step('Step 4: Open My Leave page.', async () => {
            await myLeavePage.openMyLeave();
        });

        await test.step('Step 5: Search leave request.', async () => {
            await myLeavePage.searchLeave(leave);
        });

        await test.step('Step 6: Cancel leave request.', async () => {
            await myLeavePage.cancelLeave();
        });

        await test.step('Step 7: Verify leave cancelled successfully.', async () => {
            await myLeavePage.verifyLeaveCancelled();
        });

    });

    test('TC-LV-05 Search leave with no matching record', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        const myLeavePage = new MyLeavePage(page);

        const leave = LeaveUtils.leave();

        leave.fromDate = '2035-01-01';
        leave.toDate = '2035-01-02';

        await test.step('Step 2: Navigate to Leave module.', async () => {
            await dashboardPage.openLeave();
        });

        await test.step('Step 3: Open My Leave page.', async () => {
            await myLeavePage.openMyLeave();
        });

        await test.step('Step 4: Search leave request.', async () => {
            await myLeavePage.searchLeave(leave);
        });

        await test.step('Step 5: Verify no matching record found.', async () => {
            await myLeavePage.verifyNoRecordFound();
        });

    });

});