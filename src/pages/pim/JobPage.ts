import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class JobPage extends BasePage {

    readonly drpJobTitle: Locator;
    readonly btnSave: Locator;
    readonly toastSuccess: Locator;

    constructor(page: Page) {
        super(page);

        this.drpJobTitle = page.locator('.oxd-select-text').first();

        this.btnSave = page.getByRole('button', {
            name: 'Save'
        }).last();

        this.toastSuccess = page.locator('.oxd-toast');
    }

    async selectJobTitle(jobTitle: string): Promise<void> {

        await this.click(this.drpJobTitle);

        await this.page
            .getByRole('option', {
                name: jobTitle
            })
            .click();

    }

    async clickSave(): Promise<void> {
        await this.click(this.btnSave);
    }

    async updateJobTitle(jobTitle: string): Promise<void> {
        await this.selectJobTitle(jobTitle);
        await this.clickSave();
    }

    async verifyJobUpdated(): Promise<void> {
        await expect(this.toastSuccess).toContainText('Success');
    }

}