import { test, expect } from '../../src/fixtures/authenticated';
import {DashboardPage} from '../../src/pages/auth/DashboardPage';
import {ApplyLeavePage} from '../../src/pages/leave/ApplyLeavePage';
import {LeaveUtils} from '../../src/utils/LeaveUtils';

test.describe('Leave Module', () => {
    test('TC-LV-01 Apply for leave with valid date range', async ({page}) => {
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

        await test.step('Step 5: Verify leave request submitted successfully.', async () => {
            await applyLeavePage.verifyLeaveAppliedSuccessfully();
        });
    });

    test('TC-LV-02 Apply for leave with end date before start date', async ({page}) => {
        const dashboardPage = new DashboardPage(page);
        const applyLeavePage = new ApplyLeavePage(page);
        const leave = LeaveUtils.invalidDateRange();

        await test.step('Step 2: Navigate to Leave module.', async () => {
            await dashboardPage.openLeave();
        });

        await test.step('Step 3: Open Apply Leave page.', async () => {
            await applyLeavePage.openApplyPage();
        });

        await test.step('Step 4: Enter invalid leave information.', async () => {
            await applyLeavePage.selectLeaveType(leave.leaveType);
            await applyLeavePage.enterFromDate(leave.fromDate);
            await applyLeavePage.enterToDate(leave.toDate);
        });

        await test.step('Step 5: Verify validation message is displayed.', async () => {
            await applyLeavePage.verifyToDateValidation();
        });
    });

    test('TC-LV-03 Apply for leave exceeding available balance', async ({page}) => {
        const dashboardPage = new DashboardPage(page);
        const applyLeavePage = new ApplyLeavePage(page);
        const leave = LeaveUtils.exceedBalanceLeave();

        await test.step('Step 2: Navigate to Leave module.', async () => {
            await dashboardPage.openLeave();
        });

        await test.step('Step 3: Open Apply Leave page.', async () => {
            await applyLeavePage.openApplyPage();
        });

        await test.step('Step 4: Enter leave information exceeding available balance.', async () => {
            await applyLeavePage.applyLeave(leave);
        });

        await test.step('Step 5: Verify warning message is displayed.', async () => {
            await applyLeavePage.verifySubmitFailed();
        });
    });
});