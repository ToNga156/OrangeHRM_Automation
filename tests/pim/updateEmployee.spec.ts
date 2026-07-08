import { test } from '@playwright/test';
import loginData from '../../src/test-data/auth/login.json';
import { LoginPage } from '../../src/pages/auth/LoginPage';
import { DashboardPage } from '../../src/pages/auth/DashboardPage';
import { EmployeeListPage } from '../../src/pages/pim/EmployeeListPage';
import { AddEmployeePage } from '../../src/pages/pim/AddEmployeePage';
import { EmployeeDetailPage } from '../../src/pages/pim/EmployeeDetailPage';
import { JobPage } from '../../src/pages/pim/JobPage';
import { RandomUtils } from '../../src/utils/RandomUtils';

test.describe('Update Employee', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();

        await loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );
    });

    test('TC-PIM-06 Edit employee job title and save', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const employeeListPage = new EmployeeListPage(page);
        const addEmployeePage = new AddEmployeePage(page);
        const employeeDetailPage = new EmployeeDetailPage(page);
        const jobPage = new JobPage(page);
        const employee = RandomUtils.employee();

        await test.step('Step 1: Open Add Employee page.', async () => {
            await dashboardPage.openPIM();
            await employeeListPage.clickAddEmployee();
        });

        await test.step('Step 2: Create employee.', async () => {
            await addEmployeePage.addEmployee(employee);
            await employeeDetailPage.verifyPersonalDetailsPage();
        });

        await test.step('Step 3: Open Job tab.', async () => {
            await employeeDetailPage.openJobTab();
        });

        await test.step('Step 4: Update Job Title.', async () => {
            await jobPage.updateJobTitle('QA Engineer');
        });

        await test.step('Step 5: Verify update successfully.', async () => {
            await jobPage.verifyJobUpdated();
        });
    });
});