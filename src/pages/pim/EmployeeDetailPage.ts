import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { Employee } from '../../models/Employee';

export class EmployeeDetailPage extends BasePage {
    readonly txtPersonalDetails: Locator;
    readonly txtFirstName: Locator;
    readonly txtMiddleName: Locator;
    readonly txtLastName: Locator;
    readonly txtEmployeeId: Locator;
    readonly tabJob: Locator;

    constructor(page: Page) {
        super(page);

        this.txtPersonalDetails = page.getByRole('heading', {
            name: 'Personal Details'
        });

        this.txtFirstName = page.getByRole('textbox', {
            name: 'First Name'
        });

        this.txtMiddleName = page.getByRole('textbox', {
            name: 'Middle Name'
        });

        this.txtLastName = page.getByRole('textbox', {
            name: 'Last Name'
        });

        this.txtEmployeeId = page.getByRole('textbox').nth(4);

        this.tabJob = page.getByRole('link', {
            name: 'Job'
        });
    }

    async openJobTab(): Promise<void> {
        await this.click(this.tabJob);
    }

    async verifyPersonalDetailsPage(): Promise<void> {
        await expect(this.page).toHaveURL(/viewPersonalDetails/);
        await expect(this.txtPersonalDetails).toBeVisible();
    }

    async verifyEmployeeInformation(employee: Employee): Promise<void> {
        await expect(this.txtFirstName).toHaveValue(employee.firstName);
        await expect(this.txtMiddleName).toHaveValue(employee.middleName);
        await expect(this.txtLastName).toHaveValue(employee.lastName);
        await expect(this.txtEmployeeId).toHaveValue(employee.employeeId);
    }
}