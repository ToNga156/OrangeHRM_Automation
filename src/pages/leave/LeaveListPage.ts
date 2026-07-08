import {expect, Locator, Page} from '@playwright/test';
import {BasePage} from '../BasePage';

export class LeaveListPage extends BasePage {
    readonly menuLeaveList: Locator;
    readonly employeeName: Locator;
    readonly btnSearch: Locator;
    readonly leaveRows: Locator;
    readonly btnApprove: Locator;
    readonly btnReject: Locator;
    readonly btnConfirm: Locator;
    readonly toastSuccess: Locator;

    constructor(page: Page) {
        super(page);

        this.menuLeaveList = page.getByRole('link', {name: 'Leave List'});
        this.employeeName = page.getByPlaceholder('Type for hints...');
        this.btnSearch = page.getByRole('button', {name: 'Search'});
        this.leaveRows = page.locator('.oxd-table-card');
        this.btnApprove = page.getByRole('button', {name: 'Approve'});
        this.btnReject = page.getByRole('button', {name: 'Reject'});
        this.btnConfirm = page.getByRole('button', {name: 'Yes, Confirm'});
        this.toastSuccess = page.locator('.oxd-toast');
    }

    async openLeaveList(): Promise<void> {
        await this.click(this.menuLeaveList);
    }

    async enterEmployeeName(employeeName: string): Promise<void> {
        await this.fill(this.employeeName, employeeName);
    }

    async clickSearch(): Promise<void> {
        await this.click(this.btnSearch);
    }

    async searchLeave(employeeName: string): Promise<void> {
        await this.enterEmployeeName(employeeName);
        await this.clickSearch();
        await expect(this.leaveRows.first()).toBeVisible();
    }

    async approveLeave(): Promise<void> {
        await this.click(this.btnApprove);
        await this.click(this.btnConfirm);
    }

    async rejectLeave(): Promise<void> {
        await this.click(this.btnReject);
        await this.click(this.btnConfirm);
    }

    async verifyLeaveApproved(): Promise<void> {
        await expect(this.toastSuccess).toContainText('Success');
    }

    async verifyLeaveRejected(): Promise<void> {
        await expect(this.toastSuccess).toContainText('Success');
    }
}