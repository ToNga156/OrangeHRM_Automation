import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class LeaveListPage extends BasePage {
    readonly lnkApply: Locator;

    constructor(page: Page) {
        super(page);

        this.lnkApply = page.getByRole('link', {name: 'Apply'});
    }

    async openApplyLeave(): Promise<void> {
        await this.click(this.lnkApply);
    }
}