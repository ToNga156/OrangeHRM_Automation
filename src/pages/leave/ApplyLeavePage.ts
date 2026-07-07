import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class ApplyLeavePage extends BasePage {
    readonly drpLeaveType: Locator;
    readonly txtFromDate: Locator;
    readonly txtToDate: Locator;
    readonly txtComment: Locator;
    readonly btnApply: Locator;
    readonly toastSuccess: Locator;
    readonly lblSubmitFailed: Locator;

    constructor(page: Page) {
        super(page);

        this.drpLeaveType = page.locator('.oxd-select-text').first();
        this.txtFromDate = page.getByRole('textbox', {name: 'yyyy-dd-mm'}).first();
        this.txtToDate = page.getByRole('textbox', {name: 'yyyy-dd-mm'}).nth(1);
        this.txtComment = page.locator('textarea');
        this.btnApply = page.getByRole('button', {name: 'Apply'});
        this.toastSuccess = page.locator('.oxd-toast');
        this.lblSubmitFailed = page.getByText('Warning to Submit Fail');
    }

    async selectLeaveType(type: string): Promise<void> {
        await this.drpLeaveType.click();
        await this.page
            .locator('.oxd-select-option')
            .filter({hasText: type})
            .click();
    }

    async enterFromDate(date: string): Promise<void> {
        await this.fill(this.txtFromDate, date);
    }

    async enterToDate(date: string): Promise<void> {
        await this.fill(this.txtToDate, date);
    }

    async enterComment(comment: string): Promise<void> {
        await this.fill(this.txtComment, comment);
    }

    async clickApply(): Promise<void> {
        await this.click(this.btnApply);
    }

    async applyLeave(
        leaveType: string,
        fromDate: string,
        toDate: string,
        comment: string
    ): Promise<void> {
        await this.selectLeaveType(leaveType);
        await this.enterFromDate(fromDate);
        await this.enterToDate(toDate);
        await this.enterComment(comment);
        await this.clickApply();
    }

    async verifyLeaveAppliedSuccessfully(): Promise<void> {
        await expect(this.toastSuccess).toContainText('Success');
    }

    async verifySubmitFailed(): Promise<void> {
        await expect(this.lblSubmitFailed).toBeVisible();
    }
}