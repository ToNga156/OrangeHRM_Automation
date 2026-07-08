import {expect, Locator, Page} from '@playwright/test';
import {BasePage} from '../BasePage';
import {Leave} from '../../models/Leave';

export class MyLeavePage extends BasePage {
    readonly menuMyLeave: Locator;
    readonly txtFromDate: Locator;
    readonly txtToDate: Locator;
    readonly btnSearch: Locator;
    readonly leaveRows: Locator;
    readonly btnCancel: Locator;
    readonly btnConfirmCancel: Locator;
    readonly toastSuccess: Locator;

    constructor(page: Page) {
        super(page);

        this.menuMyLeave = page.getByRole('link', {name: 'My Leave'});
        this.txtFromDate = page.getByRole('textbox', {name: 'yyyy-dd-mm'}).first();
        this.txtToDate = page.getByRole('textbox', {name: 'yyyy-dd-mm'}).nth(1);
        this.btnSearch = page.getByRole('button', {name: 'Search'});
        this.leaveRows = page.locator('.oxd-table-card');
        this.btnCancel = page.getByRole('button', {name: 'Cancel'});
        this.btnConfirmCancel = page.getByRole('button', {name: 'Yes, Confirm'});
        this.toastSuccess = page.locator('.oxd-toast');
    }

    async openMyLeave(): Promise<void> {
        await this.click(this.menuMyLeave);
    }

    async enterFromDate(date: string): Promise<void> {
        await this.txtFromDate.clear();
        await this.fill(this.txtFromDate, date);
    }

    async enterToDate(date: string): Promise<void> {
        await this.txtToDate.clear();
        await this.fill(this.txtToDate, date);
    }

    async clickSearch(): Promise<void> {
        await this.click(this.btnSearch);
    }

    async searchLeave(leave: Leave): Promise<void> {
        await this.enterFromDate(leave.fromDate);
        await this.enterToDate(leave.toDate);
        await this.clickSearch();
    }

    async cancelLeave(): Promise<void> {
        await expect(this.leaveRows.first()).toBeVisible();
        await this.click(this.btnCancel);
        await this.click(this.btnConfirmCancel);
    }

    async verifyLeaveCancelled(): Promise<void> {
        await expect(this.toastSuccess).toContainText('Success');
    }
}