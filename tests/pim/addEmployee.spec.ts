import { test, expect } from '@playwright/test';
import loginData from '../../src/test-data/auth/login.json';
import { RandomUtils } from '../../src/utils/RandomUtils';
import { LoginPage } from '../../src/pages/auth/LoginPage';
import { DashboardPage } from '../../src/pages/auth/DashboardPage';
import { EmployeeListPage } from '../../src/pages/pim/EmployeeListPage';
import { AddEmployeePage } from '../../src/pages/pim/AddEmployeePage';
import { EmployeeDetailPage } from '../../src/pages/pim/EmployeeDetailPage';

test.describe('PIM Module', () => {
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

    test('TC-PIM-01 Add a new employee with all required fields', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const employeeListPage = new EmployeeListPage(page);
        const addEmployeePage = new AddEmployeePage(page);
        const employeeDetailPage = new EmployeeDetailPage(page);
        const firstName = RandomUtils.firstName();
        const middleName = RandomUtils.middleName();
        const lastName = RandomUtils.lastName();
        const employeeId = RandomUtils.employeeId();

        await test.step('Step 2: Navigate to PIM module.', async () => {
            await dashboardPage.openPIM();
        });

        await test.step('Step 3: Open Add Employee page.', async () => {
            await employeeListPage.clickAddEmployee();
        });

        await test.step('Step 4: Enter all required employee information and save.', async () => {
            await addEmployeePage.addEmployee( firstName, middleName, lastName, employeeId);
        });

        await test.step('Step 5: Verify employee is created successfully.', async () => {
            await expect(employeeDetailPage.txtPersonalDetails).toBeVisible();
        });
    });

    test('TC-PIM-02 Add employee without first name', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const employeeListPage = new EmployeeListPage(page);
        const addEmployeePage = new AddEmployeePage(page);
        const middleName = RandomUtils.middleName();
        const lastName = RandomUtils.lastName();
        const employeeId = RandomUtils.employeeId();

        await test.step('Step 2: Navigate to PIM module.', async () => {
            await dashboardPage.openPIM();
        });

        await test.step('Step 3: Open Add Employee page.', async () => {
            await employeeListPage.clickAddEmployee();
        });

        await test.step('Step 4: Leave First Name blank, enter the remaining required fields and click Save.', async () => {
            await addEmployeePage.addEmployee('', middleName, lastName, employeeId);
        });

        await test.step('Step 5: Verify Required validation message is displayed.', async () => {
            await expect(addEmployeePage.lblRequiredFirstName)
                .toHaveText('Required');
        });
    });
});