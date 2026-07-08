import { test, expect } from '../../src/fixtures/authenticated';
import {DashboardPage} from '../../src/pages/auth/DashboardPage';
import {LeaveListPage} from '../../src/pages/leave/LeaveListPage';

test.describe('Leave Approval Module', () => {
    test('TC-LV-04 Admin approves a pending leave request', async ({page}) => {
        const dashboardPage = new DashboardPage(page);
        const leaveListPage = new LeaveListPage(page);

        await test.step('Step 2: Navigate to Leave module.', async () => {
            await dashboardPage.openLeave();
        });

        await test.step('Step 3: Open Leave List page.', async () => {
            await leaveListPage.openLeaveList();
        });

        await test.step('Step 4: Search pending leave request.', async () => {
            await leaveListPage.searchLeave('Paul Collings');
        });

        await test.step('Step 5: Approve leave request.', async () => {
            await leaveListPage.approveLeave();
        });

        await test.step('Step 6: Verify leave request is approved successfully.', async () => {
            await leaveListPage.verifyLeaveApproved();
        });
    });

    test('TC-LV-05 Admin rejects a pending leave request', async ({page}) => {
        const dashboardPage = new DashboardPage(page);
        const leaveListPage = new LeaveListPage(page);

        await test.step('Step 2: Navigate to Leave module.', async () => {
            await dashboardPage.openLeave();
        });

        await test.step('Step 3: Open Leave List page.', async () => {
            await leaveListPage.openLeaveList();
        });

        await test.step('Step 4: Search pending leave request.', async () => {
            await leaveListPage.searchLeave('Paul Collings');
        });

        await test.step('Step 5: Reject leave request.', async () => {
            await leaveListPage.rejectLeave();
        });

        await test.step('Step 6: Verify leave request is rejected successfully.', async () => {
            await leaveListPage.verifyLeaveRejected();
        });
    });
});