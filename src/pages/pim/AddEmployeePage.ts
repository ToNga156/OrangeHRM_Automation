import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { Employee } from '../../models/Employee';
import { expect } from '@playwright/test';

export class AddEmployeePage extends BasePage {
    readonly txtFirstName: Locator;
    readonly txtMiddleName: Locator;
    readonly txtLastName: Locator;
    readonly txtEmployeeId: Locator;
    readonly btnSave: Locator;
    readonly lblRequiredFirstName: Locator;

    constructor(page: Page) {
        super(page);

        this.txtFirstName = page.getByRole('textbox', {name: 'First Name'});
        this.txtMiddleName = page.getByRole('textbox', {name: 'Middle Name'});
        this.txtLastName = page.getByRole('textbox', {name: 'Last Name'});
        this.txtEmployeeId = page.getByRole('textbox').nth(4);
        this.btnSave = page.getByRole('button', {name: 'Save'});
        this.lblRequiredFirstName = page.locator('.oxd-input-field-error-message').first();
    }

    async enterFirstName(firstName: string): Promise<void> {
        await this.fill(this.txtFirstName, firstName);
    }

    async enterMiddleName(middleName: string): Promise<void> {
        await this.fill(this.txtMiddleName, middleName);
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.fill(this.txtLastName, lastName);
    }

    async enterEmployeeId(employeeId: string): Promise<void> {
        await this.fill(this.txtEmployeeId, employeeId);
    }

    async clickSave(): Promise<void> {
        await this.click(this.btnSave);
    }

    async addEmployee(employee: Employee): Promise<void> {
        await this.enterFirstName(employee.firstName);
        await this.enterMiddleName(employee.middleName);
        await this.enterLastName(employee.lastName);
        await this.enterEmployeeId(employee.employeeId);
        await this.clickSave();
    }

    async verifyFirstNameRequired(): Promise<void> {
        await expect(this.lblRequiredFirstName)
            .toHaveText('Required');
    }
}