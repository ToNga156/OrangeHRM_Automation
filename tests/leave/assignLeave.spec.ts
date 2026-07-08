import { test } from '@playwright/test';
import loginData from '../../src/test-data/auth/login.json';
import { LoginPage } from '../../src/pages/auth/LoginPage';
import { DashboardPage } from '../../src/pages/auth/DashboardPage';
import { AssignLeavePage } from '../../src/pages/leave/AssignLeavePage';
import { LeaveUtils } from '../../src/utils/LeaveUtils';
import { DateUtils } from '../../src/utils/DateUtils';

test.describe('Assign Leave Module', () => {

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

    test('TC-LV-06 Assign leave with valid employee', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        const assignLeavePage = new AssignLeavePage(page);

        const leave = LeaveUtils.assignedLeave();

        await test.step('Step 2: Navigate to Leave module.', async () => {
            await dashboardPage.openLeave();
        });

        await test.step('Step 3: Open Assign Leave page.', async () => {
            await assignLeavePage.openAssignLeave();
        });

        await test.step('Step 4: Enter leave information.', async () => {
            await assignLeavePage.assignLeave(leave);
        });

        await test.step('Step 5: Verify leave assigned successfully.', async () => {
            await assignLeavePage.verifyAssignSuccess();
        });

    });

    test('TC-LV-07 Assign leave with non-existent employee', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        const assignLeavePage = new AssignLeavePage(page);

        const leave = LeaveUtils.assignedLeave();

        leave.employeeName = 'AutomationUser999999';

        await test.step('Step 2: Navigate to Leave module.', async () => {
            await dashboardPage.openLeave();
        });

        await test.step('Step 3: Open Assign Leave page.', async () => {
            await assignLeavePage.openAssignLeave();
        });

        await test.step('Step 4: Enter invalid employee name.', async () => {
            await assignLeavePage.assignLeave(leave);
        });

        await test.step('Step 5: Verify validation message is displayed.', async () => {
            await assignLeavePage.verifySubmitFailed();
        });

    });

    test('TC-LV-08 Assign leave with end date before start date', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        const assignLeavePage = new AssignLeavePage(page);

        const leave = LeaveUtils.assignedLeave();

        leave.fromDate = DateUtils.futureDate(5);
        leave.toDate = DateUtils.futureDate(2);

        await test.step('Step 2: Navigate to Leave module.', async () => {
            await dashboardPage.openLeave();
        });

        await test.step('Step 3: Open Assign Leave page.', async () => {
            await assignLeavePage.openAssignLeave();
        });

        await test.step('Step 4: Enter invalid leave date.', async () => {
            await assignLeavePage.assignLeave(leave);
        });

        await test.step('Step 5: Verify validation message is displayed.', async () => {
            await assignLeavePage.verifySubmitFailed();
        });

    });

    test('TC-LV-09 Assign leave without leave type', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        const assignLeavePage = new AssignLeavePage(page);

        const leave = LeaveUtils.assignedLeave();

        leave.leaveType = '';

        await test.step('Step 2: Navigate to Leave module.', async () => {
            await dashboardPage.openLeave();
        });

        await test.step('Step 3: Open Assign Leave page.', async () => {

            await assignLeavePage.openAssignLeave();

        });

        await test.step('Step 4: Leave Leave Type blank.', async () => {

            await assignLeavePage.enterEmployeeName(
                leave.employeeName!
            );

            await assignLeavePage.enterFromDate(
                leave.fromDate
            );

            await assignLeavePage.enterToDate(
                leave.toDate
            );

            await assignLeavePage.enterComment(
                leave.comment
            );

            await assignLeavePage.clickAssign();

        });

        await test.step('Step 5: Verify Required validation message.', async () => {

            await assignLeavePage.verifyRequiredLeaveType();

        });

    });

    test('TC-LV-10 Assign leave without employee name', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        const assignLeavePage = new AssignLeavePage(page);

        const leave = LeaveUtils.assignedLeave();

        await test.step('Step 2: Navigate to Leave module.', async () => {
            await dashboardPage.openLeave();
        });

        await test.step('Step 3: Open Assign Leave page.', async () => {
            await assignLeavePage.openAssignLeave();
        });

        await test.step('Step 4: Leave Employee Name blank.', async () => {

            await assignLeavePage.selectLeaveType(
                leave.leaveType
            );

            await assignLeavePage.enterFromDate(
                leave.fromDate
            );

            await assignLeavePage.enterToDate(
                leave.toDate
            );

            await assignLeavePage.enterComment(
                leave.comment
            );

            await assignLeavePage.clickAssign();

        });

        await test.step('Step 5: Verify Required validation message.', async () => {

            await assignLeavePage.verifyRequiredEmployee();

        });

    });

});