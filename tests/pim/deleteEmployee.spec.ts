import { test, expect } from '../../src/fixtures/authenticated';
import { DashboardPage } from '../../src/pages/auth/DashboardPage';
import { EmployeeListPage } from '../../src/pages/pim/EmployeeListPage';
import { AddEmployeePage } from '../../src/pages/pim/AddEmployeePage';
import { EmployeeDetailPage } from '../../src/pages/pim/EmployeeDetailPage';
import { RandomUtils } from '../../src/utils/RandomUtils';

test.describe('Delete Employee', () => {
    test('TC-PIM-07 Delete employee', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const employeeListPage = new EmployeeListPage(page);
        const addEmployeePage = new AddEmployeePage(page);
        const employeeDetailPage = new EmployeeDetailPage(page);
        const employee = RandomUtils.employee();

        await test.step('Step 1: Create employee.', async () => {
            await dashboardPage.openPIM();
            await employeeListPage.clickAddEmployee();
            await addEmployeePage.addEmployee(employee);
            await employeeDetailPage.verifyPersonalDetailsPage();
        });

        await test.step('Step 2: Return Employee List.', async () => {
            await dashboardPage.openPIM();
        });

        await test.step('Step 3: Search employee.', async () => {
            await employeeListPage.searchEmployee(
                employee.firstName
            );
            await employeeListPage.verifyEmployeeExists(employee);
        });

        await test.step('Step 4: Delete employee.', async () => {
            await employeeListPage.deleteEmployee(employee);
        });

        await test.step('Step 5: Verify employee deleted.', async () => {
            await employeeListPage.verifyEmployeeDeleted(employee);
        });
    });
});