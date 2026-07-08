import { test, expect } from '../../src/fixtures/authenticated';
import {DashboardPage} from '../../src/pages/auth/DashboardPage';
import {MyLeavePage} from '../../src/pages/leave/MyLeavePage';
import {LeaveUtils} from '../../src/utils/LeaveUtils';

test.describe('My Leave Module', () => {
    test('TC-LV-06 Employee cancels an approved leave', async ({page}) => {
        const dashboardPage = new DashboardPage(page);
        const myLeavePage = new MyLeavePage(page);
        const leave = LeaveUtils.leave();
        leave.status = 'Approved';

        await test.step('Step 2: Navigate to Leave module.', async () => {
            await dashboardPage.openLeave();
        });

        await test.step('Step 3: Open My Leave page.', async () => {
            await myLeavePage.openMyLeave();
        });

        await test.step('Step 4: Search approved leave request.', async () => {
            await myLeavePage.searchLeave(leave);
        });

        await test.step('Step 5: Cancel approved leave request.', async () => {
            await myLeavePage.cancelLeave();
        });

        await test.step('Step 6: Verify cancellation request is created.', async () => {
            await myLeavePage.verifyLeaveCancelled();
        });
    });
});