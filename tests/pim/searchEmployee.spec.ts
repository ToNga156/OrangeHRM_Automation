import { test, expect } from '@playwright/test';
import loginData from '../../src/test-data/auth/login.json';
import { RandomUtils } from '../../src/utils/RandomUtils';
import { LoginPage } from '../../src/pages/auth/LoginPage';
import { DashboardPage } from '../../src/pages/auth/DashboardPage';
import { EmployeeListPage } from '../../src/pages/pim/EmployeeListPage';
import { AddEmployeePage } from '../../src/pages/pim/AddEmployeePage';

test.describe('Search Employee', () => {
    test.beforeEach(async ({ page }) => {
        console.log('Step 1: Login with valid credentials.');
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );
    });

    test('TC-PIM-03 Search employee by exact name', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const employeeListPage = new EmployeeListPage(page);
        const addEmployeePage = new AddEmployeePage(page);
        const firstName = RandomUtils.firstName();
        const middleName = RandomUtils.middleName();
        const lastName = RandomUtils.lastName();
        const employeeId = RandomUtils.employeeId();
        const fullName = `${firstName} ${middleName}`;

        console.log('Step 2: Navigate to PIM module.');
        await dashboardPage.openPIM();

        console.log('Step 3: Open Add Employee page.');
        await employeeListPage.clickAddEmployee();

        console.log('Step 4: Create a new employee.');
        await addEmployeePage.addEmployee(firstName, middleName, lastName, employeeId);
         
        console.log('Step 5: Verify employee is created successfully.');
        await expect(page).toHaveURL(/viewPersonalDetails/);

        console.log('Step 6: Navigate back to Employee List.');
        await dashboardPage.openPIM();

        console.log('Step 7: Search employee by first name.');
        await employeeListPage.searchEmployee(firstName);

        console.log('Step 8: Verify employee is displayed in search result.');
        await expect(employeeListPage.employeeRow(fullName)).toBeVisible();

        console.log('Step 9: Verify employee last name is correct.');
        await expect(employeeListPage.tblEmployeeList).toContainText(lastName);
    });

});