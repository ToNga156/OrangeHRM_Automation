import { test, expect } from '../../src/fixtures/authenticated';
import { DashboardPage } from '../../src/pages/auth/DashboardPage';
import { EmployeeListPage } from '../../src/pages/pim/EmployeeListPage';
import { AddEmployeePage } from '../../src/pages/pim/AddEmployeePage';
import { EmployeeDetailPage } from '../../src/pages/pim/EmployeeDetailPage';
import { RandomUtils } from '../../src/utils/RandomUtils';

test.describe('Search Employee', () => {
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

    test('TC-PIM-04 Search employee by partial name', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const employeeListPage = new EmployeeListPage(page);
        const addEmployeePage = new AddEmployeePage(page);
        const employeeDetailPage = new EmployeeDetailPage(page);
        const employee = RandomUtils.employee();

        await test.step('Step 1: Navigate to PIM module.', async () => {
            await dashboardPage.openPIM();
        });

        await test.step('Step 2: Open Add Employee page.', async () => {
            await employeeListPage.clickAddEmployee();
        });

        await test.step('Step 3: Create a new employee.', async () => {
            await addEmployeePage.addEmployee(employee);
            await employeeDetailPage.verifyPersonalDetailsPage();
        });

        await test.step('Step 4: Navigate back to Employee List.', async () => {
            await dashboardPage.openPIM();
        });

        await test.step('Step 5: Search employee using partial first name.', async () => {
            const partialName = employee.firstName.substring(0, 4);
            await employeeListPage.searchEmployee(partialName);
        });

        await test.step('Step 6: Verify employee appears in search results.', async () => {
            await employeeListPage.verifyEmployeeExists(employee);
        });
    });

    test('TC-PIM-05 Search employee with non-existent name', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const employeeListPage = new EmployeeListPage(page);

        await test.step('Step 1: Navigate to PIM module.', async () => {
            await dashboardPage.openPIM();
        });

        await test.step('Step 2: Search employee using a non-existent name.', async () => {
            await employeeListPage.searchEmployee(
                'AutomationUser999999'
            );
        });

        await test.step('Step 3: Verify No Records Found message is displayed.', async () => {
            await employeeListPage.verifyNoRecordFound();
        });
    });
});