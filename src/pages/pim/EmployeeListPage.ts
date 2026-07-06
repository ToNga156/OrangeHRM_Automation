import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class EmployeeListPage extends BasePage {
    readonly btnAddEmployee: Locator;
    readonly txtEmployeeName: Locator;
    readonly btnSearch: Locator;
    readonly tblEmployeeList: Locator;

    constructor(page: Page) {
        super(page);
        this.btnAddEmployee = page.getByRole('link', {
            name: 'Add Employee'
        });
        this.txtEmployeeName = page.getByRole('textbox', {name: 'Type for hints...'}).first();
        this.btnSearch = page.getByRole('button', {name: 'Search'});
        this.tblEmployeeList = page.locator('.oxd-table-body');
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

    employeeRow(fullName: string): Locator {
        return this.page.locator('.oxd-table-card').filter({
            hasText: fullName
        });
    }

}