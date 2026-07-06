import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { Employee } from '../../models/Employee';

export class EmployeeListPage extends BasePage {
    readonly btnAddEmployee: Locator;
    readonly txtEmployeeName: Locator;
    readonly btnSearch: Locator;
    readonly tblEmployeeList: Locator;
    readonly lblNoRecordsFound: Locator;
    readonly employeeRows: Locator;

    constructor(page: Page) {
        super(page);

        this.btnAddEmployee = page.getByRole('link', {
            name: 'Add Employee'
        });

        this.txtEmployeeName = page.getByPlaceholder('Type for hints...').first();

        this.btnSearch = page.getByRole('button', {
            name: 'Search'
        });

        this.tblEmployeeList = page.locator('.oxd-table-body');
        this.employeeRows = page.locator('.oxd-table-card');
        this.lblNoRecordsFound = page.locator('.orangehrm-horizontal-padding').getByText('No Records Found');
    }

    async clickAddEmployee(): Promise<void> {
        await this.click(this.btnAddEmployee);
    }

    async enterEmployeeName(employeeName: string): Promise<void> {
        await this.fill(this.txtEmployeeName, employeeName);
    }

    async clickSearch(): Promise<void> {
        await this.click(this.btnSearch);
    }

    async searchEmployee(employeeName: string): Promise<void> {
        await this.enterEmployeeName(employeeName);
        await this.clickSearch();
    }

    employeeRow(employee: Employee): Locator {
        return this.page
            .locator('.oxd-table-card')
            .filter({hasText: `${employee.firstName} ${employee.middleName}`});
    }

    async verifyEmployeeExists(employee: Employee): Promise<void> {
        await expect(this.employeeRow(employee)).toBeVisible();
        await expect(this.tblEmployeeList).toContainText(employee.lastName);
    }

    async getEmployeeCount(): Promise<number> {
        return await this.employeeRows.count();
    }

    async verifyNoRecordFound(): Promise<void> {
        await expect(this.lblNoRecordsFound).toBeVisible();
    }
}