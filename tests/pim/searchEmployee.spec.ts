import { test } from '@playwright/test';
import loginData from '../../src/test-data/auth/login.json';
import { LoginPage } from '../../src/pages/auth/LoginPage';
import { DashboardPage } from '../../src/pages/auth/DashboardPage';
import { EmployeeListPage } from '../../src/pages/pim/EmployeeListPage';
import { AddEmployeePage } from '../../src/pages/pim/AddEmployeePage';
import { EmployeeDetailPage } from '../../src/pages/pim/EmployeeDetailPage';
import { RandomUtils } from '../../src/utils/RandomUtils';

test.describe('Search Employee', () => {
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

    test('TC-PIM-03 Search employee by exact name', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const employeeListPage = new EmployeeListPage(page);
        const addEmployeePage = new AddEmployeePage(page);
        const employeeDetailPage = new EmployeeDetailPage(page);
        const employee = RandomUtils.employee();

        await test.step('Step 2: Navigate to PIM module.', async () => {
            await dashboardPage.openPIM();
        });

        await test.step('Step 3: Open Add Employee page.', async () => {
            await employeeListPage.clickAddEmployee();
        });

        await test.step('Step 4: Create a new employee.', async () => {
            await addEmployeePage.addEmployee(employee);
            await employeeDetailPage.verifyPersonalDetailsPage();
        });

        await test.step('Step 5: Navigate back to Employee List.', async () => {
            await dashboardPage.openPIM();
        });

        await test.step('Step 6: Search employee by first name.', async () => {
            await employeeListPage.searchEmployee(
                employee.firstName
            );
        });

        await test.step('Step 7: Verify employee is displayed in search result.', async () => {
            await employeeListPage.verifyEmployeeExists(
                employee
            );
        });
    });
});